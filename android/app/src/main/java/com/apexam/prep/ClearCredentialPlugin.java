package com.apexam.prep;

import android.os.CancellationSignal;
import androidx.annotation.NonNull;
import androidx.credentials.ClearCredentialStateRequest;
import androidx.credentials.CredentialManager;
import androidx.credentials.CredentialManagerCallback;
import androidx.credentials.exceptions.ClearCredentialException;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

/**
 * Clears the Android Credential Manager's and GoogleSignIn client's stored account state.
 *
 * Why this exists:
 * Android's Credential Manager and Google Sign-In remember the last
 * account a user signed in with on this device+app combo. If we only call
 * FirebaseAuthentication.signOut() / Firebase signOut(auth) on logout, that
 * memory is NOT cleared — so the next Google Sign-In attempt silently
 * auto-selects the same account without showing the account picker.
 *
 * Calling clear() on logout tells both CredentialManager and GoogleSignIn
 * to forget the active session, so the account picker shows again next time.
 */
@CapacitorPlugin(name = "ClearCredential")
public class ClearCredentialPlugin extends Plugin {

    @PluginMethod
    public void clear(PluginCall call) {
        try {
            // 1. Clear legacy GoogleSignIn client session
            try {
                GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).build();
                GoogleSignInClient googleSignInClient = GoogleSignIn.getClient(getContext(), gso);
                googleSignInClient.signOut();
            } catch (Exception ignored) {}

            // 2. Clear Credential Manager state
            CredentialManager credentialManager = CredentialManager.create(getContext());
            ClearCredentialStateRequest request = new ClearCredentialStateRequest();
            Executor executor = Executors.newSingleThreadExecutor();

            credentialManager.clearCredentialStateAsync(
                request,
                new CancellationSignal(),
                executor,
                new CredentialManagerCallback<Void, ClearCredentialException>() {
                    @Override
                    public void onResult(Void result) {
                        call.resolve();
                    }

                    @Override
                    public void onError(@NonNull ClearCredentialException e) {
                        // Non-fatal: e.g. no stored credential state to clear, or
                        // provider on this device doesn't support it. Never block logout.
                        JSObject ret = new JSObject();
                        ret.put("warning", e.getMessage() == null ? "unknown" : e.getMessage());
                        call.resolve(ret);
                    }
                }
            );
        } catch (Exception e) {
            // Never let this crash or block the app's logout flow.
            JSObject ret = new JSObject();
            ret.put("warning", e.getMessage() == null ? "unknown" : e.getMessage());
            call.resolve(ret);
        }
    }
}
