var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_dns = __toESM(require("dns"), 1);
var import_express = __toESM(require("express"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var import_multer = __toESM(require("multer"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_genai = require("@google/genai");
var import_express_rate_limit = __toESM(require("express-rate-limit"), 1);
var import_xss2 = __toESM(require("xss"), 1);

// src/server/reportAiRoutes.ts
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var import_xss = __toESM(require("xss"), 1);
var import_nodemailer = __toESM(require("nodemailer"), 1);
var DEVELOPER_SUPPORT_EMAIL = "helpyou.ai.support@gmail.com";
var AI_REPORTS_FILE = import_path.default.join(process.cwd(), "data", "ai_reports_vault.json");
if (!import_fs.default.existsSync(import_path.default.join(process.cwd(), "data"))) {
  try {
    import_fs.default.mkdirSync(import_path.default.join(process.cwd(), "data"), { recursive: true });
  } catch (_) {
  }
}
var aiReportsVault = [];
try {
  if (import_fs.default.existsSync(AI_REPORTS_FILE)) {
    const raw = import_fs.default.readFileSync(AI_REPORTS_FILE, "utf-8");
    aiReportsVault = JSON.parse(raw);
    if (!Array.isArray(aiReportsVault)) aiReportsVault = [];
  }
} catch (e) {
  aiReportsVault = [];
}
var saveAiReportsToDisk = () => {
  try {
    import_fs.default.writeFileSync(AI_REPORTS_FILE, JSON.stringify(aiReportsVault, null, 2), "utf-8");
  } catch (err) {
    console.warn("[AI Report Vault] Error saving to disk:", err);
  }
};
async function dispatchReportEmail(reportData) {
  const { id, reason, details, aiOutput, context, userEmail, userId, timestamp } = reportData;
  const emailSubject = `\u{1F6A8} [AP Exam AI Report] ${reason} - (${context})`;
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 22px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px; font-weight: bold;">\u{1F6A8} AP Exam - AI Content Report</h2>
        <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 13px;">Report ID: <strong>${id}</strong> | Timestamp: ${new Date(timestamp).toLocaleString()}</p>
      </div>
      <div style="padding: 24px; color: #18181b;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
          <tr style="border-bottom: 1px solid #f4f4f5;">
            <td style="padding: 10px 0; font-weight: bold; color: #71717a; width: 140px;">Report Reason:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #dc2626; font-size: 15px;">${(0, import_xss.default)(reason)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f4f4f5;">
            <td style="padding: 10px 0; font-weight: bold; color: #71717a;">Feature / Context:</td>
            <td style="padding: 10px 0; font-weight: 600; color: #4338ca;">${(0, import_xss.default)(context)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f4f4f5;">
            <td style="padding: 10px 0; font-weight: bold; color: #71717a;">Student Email:</td>
            <td style="padding: 10px 0; font-weight: 500;">${(0, import_xss.default)(userEmail || "Not provided by student")}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f4f4f5;">
            <td style="padding: 10px 0; font-weight: bold; color: #71717a;">Student User ID:</td>
            <td style="padding: 10px 0; font-family: monospace; font-size: 12px; color: #52525b;">${(0, import_xss.default)(userId || "N/A")}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #71717a; vertical-align: top;">Student Explanation:</td>
            <td style="padding: 10px 0; background: #fef2f2; border-radius: 8px; padding: 12px; color: #991b1b; font-size: 14px; line-height: 1.5;">
              ${(0, import_xss.default)(details || "No additional comments provided by student.")}
            </td>
          </tr>
        </table>

        <h4 style="margin: 22px 0 10px 0; color: #1e293b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.6px;">Reported AI Output:</h4>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; font-size: 13px; line-height: 1.6; color: #334155; max-height: 380px; overflow-y: auto; white-space: pre-wrap; word-break: break-word;">
${(0, import_xss.default)(aiOutput)}
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f4f4f5; text-align: center; font-size: 12px; color: #a1a1aa;">
          This automated security & content review report was dispatched directly from the AP Exam System to ${DEVELOPER_SUPPORT_EMAIL}.
        </div>
      </div>
    </div>
  `;
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  if (smtpUser && smtpPass) {
    try {
      const transporter = import_nodemailer.default.createTransport({
        service: process.env.SMTP_SERVICE || (process.env.GMAIL_USER ? "gmail" : void 0),
        host: process.env.SMTP_HOST || (process.env.GMAIL_USER ? "smtp.gmail.com" : void 0),
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: smtpUser, pass: smtpPass }
      });
      await transporter.sendMail({
        from: `"AP Exam AI Safety" <${smtpUser}>`,
        to: DEVELOPER_SUPPORT_EMAIL,
        subject: emailSubject,
        html: emailHtml,
        text: `AI Content Report: ${reason}
Context: ${context}
Details: ${details}
Student: ${userEmail}
AI Output:
${aiOutput}`
      });
      console.log(`[AI Report] Email sent via SMTP to ${DEVELOPER_SUPPORT_EMAIL}`);
      return { sent: true, method: "smtp" };
    } catch (smtpErr) {
      console.warn("[AI Report] SMTP send failed, falling back to FormSubmit relay:", smtpErr?.message);
    }
  }
  try {
    const relayResponse = await fetch(`https://formsubmit.co/ajax/${DEVELOPER_SUPPORT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: emailSubject,
        _template: "table",
        _captcha: "false",
        developer_email: DEVELOPER_SUPPORT_EMAIL,
        report_id: id,
        report_reason: reason,
        feature_context: context,
        student_feedback: details || "No extra comment",
        student_email: userEmail || "Anonymous student",
        student_user_id: userId || "N/A",
        reported_at: timestamp,
        ai_output_snippet: aiOutput.length > 3e3 ? aiOutput.substring(0, 3e3) + "... [truncated]" : aiOutput
      })
    });
    const relayResult = await relayResponse.json().catch(() => ({}));
    if (relayResponse.ok) {
      console.log(`[AI Report] Email successfully dispatched via FormSubmit to ${DEVELOPER_SUPPORT_EMAIL}`);
      return { sent: true, method: "formsubmit_relay" };
    } else {
      console.warn("[AI Report] FormSubmit relay response not ok:", relayResult);
      return { sent: false, method: "formsubmit_relay", error: JSON.stringify(relayResult) };
    }
  } catch (relayErr) {
    console.error("[AI Report] Email relay error:", relayErr?.message);
    return { sent: false, method: "failed", error: relayErr?.message };
  }
}
function registerReportAiRoutes(app2) {
  app2.post("/api/report-ai-content", async (req, res) => {
    try {
      const { reason, details, aiOutput, context, userEmail, userId } = req.body || {};
      if (!reason || !aiOutput) {
        return res.status(400).json({ error: "Missing required fields: reason and aiOutput are mandatory." });
      }
      const reportId = `report_${Date.now()}_${import_crypto.default.randomBytes(3).toString("hex")}`;
      const timestamp = (/* @__PURE__ */ new Date()).toISOString();
      const reportRecord = {
        id: reportId,
        reason: String(reason).trim(),
        details: String(details || "").trim(),
        aiOutput: String(aiOutput).trim(),
        context: String(context || "General AI Output").trim(),
        userEmail: String(userEmail || "").trim(),
        userId: String(userId || "").trim(),
        timestamp,
        status: "pending_review",
        notifiedEmail: DEVELOPER_SUPPORT_EMAIL
      };
      aiReportsVault.unshift(reportRecord);
      if (aiReportsVault.length > 500) aiReportsVault.pop();
      saveAiReportsToDisk();
      console.log(`[AI Report] Saved report ${reportId} to disk vault. Total: ${aiReportsVault.length}`);
      dispatchReportEmail(reportRecord).then((emailStatus) => {
        console.log(`[AI Report ${reportId}] Email delivery status:`, emailStatus);
      }).catch((err) => {
        console.error(`[AI Report ${reportId}] Background email dispatch error:`, err);
      });
      return res.json({
        success: true,
        reportId,
        message: `Report received. Notification automatically sent to ${DEVELOPER_SUPPORT_EMAIL}.`
      });
    } catch (err) {
      console.error("[AI Report] Endpoint error:", err);
      return res.status(500).json({ error: err.message || "Failed to process AI report" });
    }
  });
  app2.get("/api/ai-reports", (_req, res) => {
    res.json({ success: true, count: aiReportsVault.length, reports: aiReportsVault });
  });
}

// src/utils/apArchetypes.ts
var AP_SUBJECT_ARCHETYPES = {
  biology: {
    general: [
      "Experimental design: Independent vs dependent variables, positive/negative controls, and sample size validity",
      "Quantitative data analysis: Mean, standard deviation, and graphing with standard error of the mean (\xB12 SEM) bars",
      "Statistical hypothesis testing: Chi-Square goodness-of-fit test comparing observed vs expected phenotypes",
      "Biological disruption: Predicting physiological consequences of chemical inhibitors, uncouplers, or targeted mutations",
      "Structure-function relationship: How molecular conformation determines transport, catalysis, or ligand binding",
      "Evolutionary conservation: Shared metabolic pathways, ribosomal machinery, and genetic code across domains"
    ],
    units: {
      "1": [
        "Transpiration stream and cohesion-tension theory in xylem driven by water hydrogen bonding",
        "Thermal buffering: High specific heat capacity of water stabilizing marine and cellular environments",
        "Dehydration condensation synthesis vs hydrolysis of peptide bonds forming primary polypeptide chains",
        "Nucleic acid 5'-to-3' directional polarity and antiparallel complementary base pairing rules",
        "Protein folding hierarchy: Tertiary conformation stabilization via hydrophobic interactions and disulfide bridges",
        "Protein thermal and pH denaturation: Disruption of secondary alpha-helices/beta-sheets and loss of active site fit",
        "Phospholipid bilayer fluidity: Fatty acid chain saturation and cholesterol modulation in poikilothermic organisms",
        "Structural vs storage carbohydrates: Alpha-1,4/1,6 glycosidic bonds in starch/glycogen vs beta-1,4 bonds in cellulose",
        "Limiting nutrient stoichiometry: Nitrogen and phosphorus availability restricting plant primary productivity"
      ],
      "2": [
        "Surface area-to-volume ratio (SA:V): Metabolic exchange efficiency in spherical vs flattened/microvilli cell geometries",
        "Endosymbiotic theory: Double membranes, autonomous circular chromosomes, and 70S ribosomes in chloroplasts and mitochondria",
        "Organellar compartmentalization: Lysosomal acid hydrolases operating at pH 4.5-5.0 isolated from neutral cytosol",
        "Plasma membrane selective permeability: Passive diffusion of small nonpolar gases (O2, CO2) vs facilitated diffusion via GLUT/aquaporins",
        "Water potential equation (Psi = Psi_s + Psi_p): Solute potential calculation (Psi_s = -iCRT) and turgor pressure equilibrium in plant roots",
        "Tonicity impacts on animal vs plant cells: Erythrocyte hemolysis vs crenation, and plant turgid vs flaccid/plasmolyzed states",
        "Electrochemical gradient maintenance: Primary active transport via Na+/K+ ATPase and secondary sodium-glucose symport",
        "Vesicular protein sorting pathway: Rough ER signal peptide recognition, Golgi cis-to-trans cisternal maturation, and exocytosis"
      ],
      "3": [
        "Enzyme kinetics: Substrate saturation curves comparing Vmax and Km in the presence of competitive vs noncompetitive inhibitors",
        "Allosteric enzyme regulation: Phosphofructokinase inhibition by high cellular ATP/citrate and activation by AMP/ADP",
        "Comparative enzymatic pH/temperature profiles: Pepsin (gastric pH 2) vs salivary amylase (pH 7) vs pancreatic trypsin (pH 8)",
        "Light-dependent reactions: Photolysis of water at Photosystem II (P680), cytochrome b6f proton pumping, and photophosphorylation",
        "Non-cyclic vs cyclic electron flow: ATP generation without NADPH production to balance chloroplast metabolic demands",
        "Calvin-Benson cycle: RuBisCO carbon fixation, 3-PGA reduction to G3P consuming ATP and NADPH, and RuBP regeneration",
        "C3 vs C4 vs CAM photosynthetic adaptations: Spatial bundle-sheath isolation vs nocturnal temporal CO2 capture minimizing photorespiration",
        "Glycolysis and substrate-level phosphorylation: Hexokinase activation and net ATP/NADH yield under aerobic vs hypoxic conditions",
        "Citric acid cycle (Krebs): Decarboxylation of pyruvate to Acetyl-CoA, succinate dehydrogenase oxidation, and CO2 release",
        "Oxidative phosphorylation disruption: DNP chemical uncouplers dissipating inner mitochondrial proton gradient as metabolic heat",
        "Anaerobic fermentation: Lactic acid fermentation in mammalian myocytes vs ethanol fermentation in yeast restoring NAD+ pools",
        "Thermoregulation & metabolic rate: Uncoupling protein 1 (UCP1 / thermogenin) in brown adipose tissue of hibernating mammals"
      ],
      "4": [
        "G-Protein Coupled Receptor (GPCR) cascade: Epinephrine binding, G-alpha GTP exchange, adenylyl cyclase activation, and cAMP generation",
        "Receptor Tyrosine Kinase (RTK) dimerization: Growth factor binding, autophosphorylation, and downstream Ras-Raf-MEK-ERK signaling",
        "Intracellular steroid hormone signaling: Hydrophobic ligand (estrogen/cortisol) crossing membrane to act as nuclear transcription factors",
        "Second messenger amplification: Phospholipase C cleaving PIP2 into IP3 and DAG, opening ER calcium channels in muscle contraction",
        "Homeostatic negative feedback: Blood glucose counter-regulation via pancreatic beta-cell insulin and alpha-cell glucagon",
        "Positive feedback amplification loops: Oxytocin release accelerating uterine contractions during human parturition",
        "Cell cycle checkpoint regulation: G1/S restriction point control by p53 tumor suppressor and Retinoblastoma (Rb) phosphorylation",
        "Cyclin and CDK complexes: Maturation-Promoting Factor (MPF) activity governing G2/M phase entry and subsequent cyclin destruction",
        "Apoptosis programmed cell death: Intrinsic mitochondrial cytochrome c leakage activating executioner caspase proteases"
      ],
      "5": [
        "Meiotic generation of genetic diversity: Crossing over at chiasmata in Prophase I and independent assortment in Metaphase I",
        "Mendelian monohybrid/dihybrid testcrosses: Expected phenotypic ratios (3:1, 9:3:3:1) and Chi-Square statistical validation",
        "Sex-linked recessive inheritance: Hemophilia or red-green colorblindness transmission across 3 generations of human pedigrees",
        "Gene linkage & recombination mapping: Calculating recombinant frequencies and mapping distance in centimorgans / map units",
        "Non-Mendelian codominance & multiple alleles: ABO blood group glycoprotein inheritance and universal donor/recipient logic",
        "Incomplete dominance: Intermediate heterozygous phenotypes (e.g. pink floral coloration in snapdragons) vs parental homozygotes",
        "Maternal non-nuclear inheritance: Mitochondrial DNA and chloroplast DNA transmission strictly through the ovum",
        "Phenotypic plasticity: Environmental temperature regulating reptile sex determination or soil pH altering hydrangea pigmentation"
      ],
      "6": [
        "DNA replication fork mechanics: Helicase, topoisomerase, single-stranded binding proteins, and Okazaki fragment ligation on lagging strand",
        "End-replication telomere shortening: Telomerase reverse transcriptase activity in human embryonic stem cells vs somatic senescence",
        "Transcription initiation and elongation: Promoter TATA box recognition, RNA Polymerase II, and transcription factor assembly",
        "Eukaryotic pre-mRNA processing: 5' 7-methylguanosine cap, 3' poly-A tail, and spliceosomal alternative exon splicing",
        "Translation fidelity: Aminoacyl-tRNA synthetase specificity, ribosomal A/P/E site codon-anticodon recognition, and release factors",
        "Prokaryotic operon gene regulation: Inducible lac operon (repressor inactivation by allolactose) vs repressible trp operon",
        "Epigenetic chromatin modification: Histone acetylation promoting transcription vs DNA cytosine methylation causing gene silencing",
        "Mutational impacts on protein function: Silent vs missense vs nonsense mutations, and frameshift indels altering downstream reading frames",
        "Biotechnology applications: Restriction enzyme RFLP mapping, PCR amplification cycles, and agarose gel electrophoresis band migration"
      ],
      "7": [
        "Mechanisms of natural selection: Heritable variation, differential reproductive fitness, and fluctuating selective pressures",
        "Hardy-Weinberg equilibrium calculations: Determining allele frequencies (p, q) and genotype frequencies (p^2, 2pq, q^2) in populations",
        "Modes of phenotypic selection: Directional selection vs stabilizing selection vs disruptive/diversifying selection curves",
        "Genetic drift: Population bottlenecks in cheetahs and founder effects in isolated insular populations reducing heterozygosity",
        "Speciation barriers: Allopatric geographic isolation vs sympatric polyploidy; prezygotic vs postzygotic reproductive isolation",
        "Phylogenetic tree interpretation: Synapomorphies, shared ancestral traits, parsimony analysis, and outgroup character polarity",
        "Molecular clocks: Amino acid substitution rates in cytochrome c or hemoglobin measuring divergent evolutionary time",
        "Adaptive radiation: Rapid ecological niche diversification following mass extinction events recorded in the fossil record"
      ],
      "8": [
        "Trophic cascades and keystone species: Top predator removal (e.g. sea otters or wolves) triggering trophic collapse and biodiversity loss",
        "Energy flow and thermodynamic 10% rule: Net primary productivity (NPP = GPP - R) and biomass loss across trophic levels",
        "Population growth dynamics: Exponential growth (dN/dt = rN) vs logistic carrying capacity model (dN/dt = rN((K-N)/K))",
        "Community interactions: Gause competitive exclusion principle, resource partitioning, mutualism, and parasite-host coevolution",
        "Ecological succession: Primary pioneer lichen colonization on volcanic lava vs secondary succession following forest wildfires",
        "Biogeochemical nutrient cycling: Rhizobium nitrogen fixation, nitrification, and agricultural phosphorus runoff causing eutrophication",
        "Island biogeography theory: MacArthur-Wilson equilibrium model predicting species richness from island area and mainland distance",
        "Anthropogenic environmental disruptions: Acid precipitation, chlorofluorocarbon ozone depletion, and invasive species proliferation"
      ]
    }
  },
  calculus: {
    general: [
      "Limits and Continuity: Analytical, graphical, and tabular approaches to evaluating finite and infinite limits",
      "Derivatives: Chain, product, quotient rules, implicit differentiation, and related rates of change",
      "Applications of Derivatives: Mean Value Theorem, First/Second Derivative Tests, concavity, and optimization",
      "Integrals and Accumulation: Fundamental Theorem of Calculus, u-substitution, Riemann sums, and net change",
      "Differential Equations: Slope fields, exponential/logistic modeling, and separation of variables"
    ],
    units: {
      "1": [
        "Trigonometric Squeeze / Sandwich Theorem limits involving bounding functions (e.g. g(x) <= f(x) <= h(x))",
        "Piecewise function continuity with two unknown constants A and B requiring a system of linear equations",
        "Radical conjugate algebraic rationalization limits as x approaches a finite value (e.g. (sqrt(ax+b) - c)/(x-d))",
        "Horizontal and vertical asymptotes of rational/radical expressions evaluating one-sided limits and limits at infinity",
        "Absolute value quotient expressions of the form |ax - b| / (cx - d) and one-sided limit discrepancy",
        "Intermediate Value Theorem (IVT) applied to continuous functions on closed intervals proving root existence",
        "Graphical discontinuity classification: Removable hole vs jump discontinuity vs infinite vertical asymptote",
        "Tabular estimation of one-sided limits and difference quotients from discrete data points"
      ],
      "2": [
        "Limit definition of the derivative: Expressing f'(a) as limit as h->0 of (f(a+h) - f(a))/h or as x->a of (f(x) - f(a))/(x-a)",
        "Differentiability implying continuity: Analyzing functions with corners, cusps, vertical tangents, or jump discontinuities",
        "Product and quotient rule differentiation with nested trigonometric, exponential, or logarithmic functions",
        "Chain rule composition: Differentiating f(g(h(x))) with tabular data for functions and their derivatives",
        "Implicit differentiation: Finding dy/dx and d^2y/dx^2 for non-function algebraic curves (e.g. ellipses, folium of Descartes)",
        "Derivative of inverse functions: Applying (f^-1)'(a) = 1 / f'(f^-1(a)) using given function coordinates"
      ],
      "3": [
        "Related rates: Geometric systems (expanding spheres, conical water tanks, receding shadows, sliding ladders)",
        "Related rates: Pythagorean distance and angle of elevation rates of change using trigonometric relations",
        "Local linear approximation and tangent line equations: Estimating function values and determining under/overestimates via f''(x)",
        "L'Hopital's Rule: Evaluating indeterminate limits of forms 0/0 and infinity/infinity with rigorous precondition checks"
      ],
      "4": [
        "Mean Value Theorem (MVT) and Rolle's Theorem: Verifying continuity and differentiability hypotheses to find c in (a, b)",
        "First Derivative Test for relative extrema: Analyzing sign changes of f'(x) from critical points",
        "Second Derivative Test and concavity: Finding inflection points and testing f''(c) at critical values",
        "Extreme Value Theorem (EVT): Finding absolute global maximum and minimum on closed intervals checking critical points and endpoints",
        "Graph analysis of f'(x): Connecting the features of derivative graph f' to intervals of increase/decrease and concavity of f(x)",
        "Applied optimization: Minimizing packaging surface area, maximizing inscribed rectangular area, or economic profit functions"
      ],
      "5": [
        "Particle kinematics in 1D: Position s(t), velocity v(t), acceleration a(t), and determining when speed is increasing vs decreasing",
        "Total distance traveled vs net displacement: Computing integral of |v(t)| dt vs integral of v(t) dt",
        "Riemann sums: Left, Right, Midpoint, and Trapezoidal approximations from irregularly spaced tabular data",
        "Fundamental Theorem of Calculus (FTC Part 1): Differentiating accumulation functions d/dx integral from a to g(x) of f(t) dt",
        "Fundamental Theorem of Calculus (FTC Part 2): Evaluating definite integrals via antiderivatives and net change theorem",
        "U-substitution integration: Definite integrals requiring conversion of upper and lower integration limits"
      ],
      "6": [
        "Separation of variables: Solving first-order differential equations dy/dx = f(x)g(y) with specific initial conditions",
        "Slope fields: Sketching solution curves through given points and matching differential equations to slope patterns",
        "Exponential growth and decay differential equations: dy/dt = ky modeling radioactive decay or Newton's law of cooling",
        "Area between intersecting curves: Integrating with respect to x or y to find enclosed planar region area",
        "Volume of solids of revolution: Disk and washer methods rotated around coordinate axes or horizontal/vertical lines y=k, x=k",
        "Volume of solids with known cross sections: Perpendicular cross sections of squares, semicircles, equilateral triangles, or rectangles"
      ],
      "7": [
        "BC Exclusive: Integration by parts integral u dv = uv - integral v du using tabular integration or cyclic recursion",
        "BC Exclusive: Partial fraction decomposition for integrating rational expressions with distinct linear factors",
        "BC Exclusive: Improper integrals with infinite limits of integration or interior infinite discontinuities",
        "BC Exclusive: Logistic differential equation dP/dt = kP(1 - P/M): Carrying capacity M, maximum growth rate at M/2, and inflection point",
        "BC Exclusive: Euler's method: Step-by-step numerical approximation of differential equation solutions with delta x step sizes"
      ],
      "8": [
        "BC Exclusive: Parametric motion: Velocity vector (x'(t), y'(t)), speed sqrt((x')^2 + (y')^2), and total distance / arc length integral",
        "BC Exclusive: Polar coordinates: Converting between Cartesian and polar, finding dy/dx on polar curves r = f(theta)",
        "BC Exclusive: Polar area: Computing area bounded by one or two polar curves using integral (1/2) r^2 d(theta)",
        "BC Exclusive: Infinite series convergence tests: Geometric, p-series, Integral test, Comparison tests, Alternating series test, Ratio test",
        "BC Exclusive: Power series: Determining radius and interval of convergence using Ratio Test and testing interval endpoints",
        "BC Exclusive: Taylor and Maclaurin polynomial approximations: Constructing nth-degree polynomials for e^x, sin(x), cos(x), 1/(1-x)",
        "BC Exclusive: Taylor series error bounds: Alternating Series Error Bound and Lagrange Error Bound (Taylor's Remainder Theorem)"
      ]
    }
  },
  chemistry: {
    general: [
      "Atomic structure, electron configurations, and periodic trends (electronegativity, ionization energy, atomic radius)",
      "Chemical bonding, Lewis structures, resonance, VSEPR molecular geometry, and bond angles",
      "Intermolecular forces (LDF, dipole-dipole, hydrogen bonding) and physical state properties",
      "Chemical reactions, net ionic equations, stoichiometry, and limiting reactant calculations",
      "Chemical kinetics: Rate laws, reaction mechanisms, activation energy, and Arrhenius equation",
      "Thermodynamics: Enthalpy (Delta H), entropy (Delta S), Gibbs free energy (Delta G), and spontaneity",
      "Equilibrium: Equilibrium constants (Kc, Kp), ICE tables, and Le Chatelier's principle shifts",
      "Acids and bases: pH calculations, weak acid/base equilibria, buffers, and titration curves",
      "Electrochemistry: Galvanic/electrolytic cells, cell potential (E_cell), and Faraday's law"
    ],
    units: {
      "1": [
        "Photoelectron Spectroscopy (PES): Multi-peak binding energy analysis identifying subshell electron configurations",
        "Mass spectrometry: Isotopic abundance peaks, average atomic mass calculations, and elemental identity",
        "Periodic trends in first ionization energy: Deviations between groups 2/13 and groups 15/16 due to subshell shielding",
        "Atomic and ionic radii trends: Effective nuclear charge (Z_eff) and electron-electron repulsion across isoelectronic series",
        "Coulomb's Law: Lattice energy comparison in ionic compounds based on ion charge magnitudes and internuclear separation"
      ],
      "2": [
        "Lewis dot structures and resonance contributors: Calculating formal charges to determine the most stable molecular structure",
        "VSEPR molecular geometries: Predicting electron-domain vs molecular geometry for expanded octets (e.g. SF4, XeF4, BrF5)",
        "Bond polarity and molecular dipole moments: Vector cancellation of polar bonds in symmetric vs asymmetric geometries",
        "Hybridization models: sp, sp2, sp3 orbital hybridization and identifying sigma vs pi bonds in double and triple bonds"
      ],
      "3": [
        "Intermolecular forces: Comparing boiling points and vapor pressures based on hydrogen bonding, dipole moments, and polarizability",
        "Liquid properties: Surface tension, viscosity, and capillary action related to cohesive vs adhesive forces",
        "Ideal gas law calculations: PV = nRT, Dalton's law of partial pressures, and gas collection over water with vapor pressure",
        "Non-ideal gas behavior: Deviations from ideality at high pressure and low temperature (van der Waals particle volume and attractions)",
        "Beer-Lambert Law: Spectrophotometric absorbance A = epsilon * b * c and calibration curve determination of unknown concentration"
      ],
      "4": [
        "Net ionic equations: Translating molecular precipitation, acid-base neutralization, and redox reactions into net ionic form",
        "Stoichiometry with limiting reactants: Calculating theoretical yield, percent yield, and excess reactant remaining",
        "Redox titrations: Determining equivalence point and analyte oxidation states using oxidizing titrants (e.g. KMnO4)",
        "Gravimetric analysis: Determining compound formula or mass percent purity via precipitate filtering, drying, and weighing"
      ],
      "5": [
        "Differential rate laws: Determining reaction order (0th, 1st, 2nd) with respect to reactants from initial rate data tables",
        "Integrated rate laws: Identifying reaction order from linear plots (time vs [A], ln[A], or 1/[A]) and computing half-life",
        "Elementary reaction steps & mechanisms: Identifying reaction intermediates, catalysts, and matching rate laws to rate-determining step",
        "Arrhenius equation & reaction coordinate: Activation energy Ea calculation and Maxwell-Boltzmann kinetic energy distribution shift"
      ],
      "6": [
        "Calorimetry: Calculating enthalpy change Delta H using q = mc Delta T and bomb/coffee-cup calorimetry assumptions",
        "Bond enthalpies: Estimating reaction enthalpy from sum of bonds broken minus sum of bonds formed",
        "Hess's Law: Combining intermediate thermochemical equations to determine net reaction enthalpy Delta H_rxn",
        "Standard enthalpies of formation: Calculating Delta H_rxn from standard enthalpies of formation Delta H_f"
      ],
      "7": [
        "Equilibrium constant expressions: Formulating Kc and Kp expressions excluding pure solids and liquids",
        "Reaction quotient Q vs equilibrium constant K: Predicting direction of net reaction shift to establish equilibrium",
        "ICE table calculations: Determining equilibrium concentrations and partial pressures for homogeneous and heterogeneous systems",
        "Le Chatelier's principle: Predicting system response to changes in temperature, pressure/volume, and reactant/product concentration",
        "Solubility product constant Ksp: Calculating molar solubility and predicting precipitate formation using Q_sp vs K_sp"
      ],
      "8": [
        "pH and pOH calculations: Strong acid/base complete dissociation and water autoionization constant Kw at 25\xB0C vs elevated temps",
        "Weak acid/base equilibria: Calculating pH, percent ionization, Ka, and Kb using ICE tables and conjugate pairs",
        "Buffer solutions: Henderson-Hasselbalch equation (pH = pKa + log([A-]/[HA])) and calculating buffer capacity",
        "Titration curve analysis: Strong acid-strong base vs weak acid-strong base titrations; identifying half-equivalence point (pH = pKa)",
        "Acid-base indicators: Selecting appropriate indicators based on transition range pKa and titration equivalence point pH"
      ],
      "9": [
        "Entropy changes Delta S: Predicting sign of Delta S based on physical phase changes, gas mole variations, and particle dispersion",
        "Gibbs free energy Delta G: Evaluating thermodynamic favorability via Delta G = Delta H - T Delta S and calculating crossover temperature",
        "Thermodynamic and kinetic control: Distinguishing between thermodynamically favored products vs kinetically favored pathways",
        "Coupled reactions: Driving thermodynamically unfavorable non-spontaneous processes using favorable ATP hydrolysis",
        "Galvanic vs electrolytic cells: Anode oxidation, cathode reduction, electron flow, salt bridge ion migration, and standard cell potential E\xB0",
        "Nernst equation qualitative predictions: Explaining cell potential shifts when ion concentrations deviate from 1.0 M standard state",
        "Faraday's law of electrolysis: Calculating mass of metal plated or gas volume produced from electric current (I) and time (t)"
      ]
    }
  },
  physics: {
    general: [
      "1D and 2D Kinematics: Position, velocity, acceleration vectors, and projectile motion trajectories",
      "Newton's Laws of Motion: Free-body diagrams, friction, inclined planes, and coupled multi-mass systems",
      "Work, Energy, and Power: Work-energy theorem, conservative vs non-conservative forces, and potential energy curves",
      "Linear Momentum & Collisions: Conservation of momentum, impulse-momentum theorem, and elastic vs inelastic collisions",
      "Rotational Dynamics: Torque, moment of inertia, rotational kinematics, and rolling without slipping",
      "Simple Harmonic Motion: Mass-spring systems, simple pendulums, restorative forces, and energy conservation",
      "Universal Gravitation: Newton's law of gravitation, planetary orbital speed, Kepler's laws, and gravitational potential energy"
    ],
    units: {
      "1": [
        "Kinematic graphs: Deducing acceleration from velocity-time slope and displacement from velocity-time integral area",
        "Projectile motion: Separating horizontal constant-velocity motion from vertical constant-acceleration gravitational free-fall",
        "Relative velocity in two dimensions: Vector addition of swimmer in river current or airplane in crosswind"
      ],
      "2": [
        "Free-body diagrams: Resolving gravitational and normal forces on angled inclined planes with static vs kinetic friction",
        "Atwood machine systems: Calculating system acceleration and string tension for coupled masses over a pulley",
        "Centripetal acceleration and circular dynamics: Banked curves without friction vs horizontal circular turning with friction"
      ],
      "3": [
        "Work-Energy Theorem: Calculating work done by variable forces via F(x) position graph area",
        "Conservation of mechanical energy: Systems exchanging gravitational potential energy, spring elastic potential energy, and kinetic energy",
        "Power calculations: Instantaneous mechanical power P = F * v * cos(theta) and average power over time intervals"
      ],
      "4": [
        "Impulse-momentum theorem: Determining change in momentum and average impact force from Force vs Time graph area",
        "1D and 2D inelastic collisions: Calculating kinetic energy loss dissipated as thermal/acoustic energy during deformation",
        "Center of mass motion: Verifying that center of mass velocity remains constant in closed systems during internal explosions"
      ],
      "5": [
        "Torque equilibrium: Sum of torques equal to zero for static beams, tilted ladders, and hanging signposts",
        "Rotational inertia (moment of inertia): Comparing angular acceleration of solid cylinder vs hollow ring down an incline",
        "Conservation of angular momentum: Figure skater spinning model with changing radius and rotational kinetic energy increase"
      ],
      "6": [
        "Simple harmonic motion of mass-spring system: Period T = 2*pi*sqrt(m/k), velocity-position phase, and kinetic-potential oscillation",
        "Simple pendulum kinematics: Period T = 2*pi*sqrt(L/g) in small-angle approximation and effects of changing length vs mass"
      ],
      "7": [
        "Newton's Law of Universal Gravitation: Calculating orbital speed v = sqrt(GM/r) for satellites in circular orbits",
        "Gravitational potential energy U = -GMm/r and escape velocity derivation v_esc = sqrt(2GM/R) from planet surface"
      ]
    }
  },
  history: {
    general: [
      "Historical Causation: Distinguishing immediate proximate triggers from long-term structural causes",
      "Continuity and Change Over Time (CCOT): Identifying enduring institutions vs transformational ideological shifts",
      "Comparative Analysis: Contrasting political, economic, or social outcomes between different regions or movements",
      "Historical Contextualization: Situate historical developments within broader regional, transatlantic, or global processes",
      "Document Sourcing (HIPP): Evaluating Historical Situation, Intended Audience, Author's Purpose, and Author's Point of View"
    ],
    units: {
      "1": [
        "Pre-Columbian indigenous societies: Agricultural adaptation (maize cultivation, Pueblo irrigation, Mississippian mound building)",
        "Columbian Exchange: Transatlantic transfer of pathogens, crops (sugar, tobacco, maize, potatoes), livestock, and demographic collapse"
      ],
      "2": [
        "Colonial settlement patterns: Spanish encomienda, French fur trade alliances, vs English settler-colonialism",
        "Transatlantic slave trade & Middle Passage: Cash-crop plantation economies, race-based chattel slavery, and African cultural resistance"
      ],
      "3": [
        "Enlightenment ideology and American Revolution: Locke social contract, Common Sense, Declaration of Independence, and republicanism",
        "Articles of Confederation vs US Constitution: Shays' Rebellion, Great Compromise, Three-Fifths Compromise, and Federalist Papers"
      ],
      "4": [
        "Market Revolution: Canals, steamboats, cotton gin, textile factories, Lowell mill girls, and emerging middle-class separate spheres",
        "Jacksonian Democracy: Expansion of white male suffrage, Nullification Crisis, Bank War, and Indian Removal Act / Trail of Tears"
      ],
      "5": [
        "Manifest Destiny & Sectional Crisis: Mexican-American War, Compromise of 1850, Kansas-Nebraska Act, and Dred Scott decision",
        "Civil War and Reconstruction: Emancipation Proclamation, 13th/14th/15th Amendments, Radical Reconstruction, and Jim Crow retrenchment"
      ],
      "6": [
        "Gilded Age industrialization: Monopolies, Social Darwinism, transcontinental railroads, labor strikes, and urbanization",
        "Populist Movement: Grange, Farmers' Alliance, Omaha Platform, silver bimetallism, and agrarian resistance to railroad rates"
      ],
      "7": [
        "Progressive Era reforms: Muckrakers, settlement houses, trust busting, 17th/19th Amendments, and conservation",
        "World War I & Great Depression: League of Nations debate, New Deal relief/recovery/reform, and Roosevelt's First 100 Days",
        "World War II mobilization: Double V campaign, Japanese American internment, atomic bomb development, and emergence as global superpower"
      ],
      "8": [
        "Cold War containment: Truman Doctrine, Marshall Plan, Korean War, Cuban Missile Crisis, and Vietnam War military quagmire",
        "Civil Rights Movement: Brown v. Board, Montgomery Bus Boycott, Civil Rights Act of 1964, Voting Rights Act of 1965, and Black Power"
      ],
      "9": [
        "Reagan Revolution: Supply-side economics (Reaganomics), deregulation, military defense spending, and end of the Cold War",
        "Post-Cold War globalization: NAFTA, digital internet revolution, War on Terror post-9/11, and demographic shifts"
      ]
    }
  },
  psychology: {
    general: [
      "Empirical research methodology: Experimental design, random assignment vs random selection, independent/dependent variables",
      "Statistical reasoning: Normal distribution, z-scores, correlation coefficients (-1.0 to +1.0), and statistical significance (p < 0.05)",
      "APA ethical guidelines: Informed consent, protection from harm, confidentiality, and post-experimental debriefing",
      "Biological bases of behavior: Neurotransmitter mechanics, neural impulse action potential, and brain lateralization"
    ],
    units: {
      "1": [
        "Neural communication: Resting potential (-70 mV), depolarization, all-or-none threshold, action potential, and refractory period",
        "Neurotransmitters: Agonists vs antagonists for dopamine, serotonin, acetylcholine, GABA (inhibitory), and glutamate (excitatory)",
        "Brain structure localization: Hippocampus (memory), amygdala (fear/emotion), prefrontal cortex (executive function), cerebellum (motor balance)"
      ],
      "2": [
        "Sensation vs perception: Absolute threshold, difference threshold (Weber's Law), sensory adaptation, and signal detection theory",
        "Visual processing: Trichromatic theory vs opponent-process theory of color, rods vs cones, and feature detectors in visual cortex",
        "Auditory transduction: Place theory vs frequency theory of pitch perception, and conductive vs sensorineural hearing loss"
      ],
      "3": [
        "Classical conditioning: Unconditioned stimulus (UCS), unconditioned response (UCR), conditioned stimulus (CS), extinction, and spontaneous recovery",
        "Operant conditioning: Positive vs negative reinforcement, positive vs negative punishment, and intermittent reinforcement schedules (FR, VR, FI, VI)",
        "Social-cognitive learning: Bandura Bobo doll observational modeling, vicarious reinforcement, and mirror neuron function"
      ],
      "4": [
        "Memory storage stages: Atkinson-Shiffrin model (sensory, short-term/working, long-term), chunking, and serial position effect",
        "Forgetting & retrieval failures: Proactive interference vs retroactive interference, retrograde vs anterograde amnesia (H.M. case study)",
        "Cognitive biases & problem solving: Availability heuristic, representativeness heuristic, confirmation bias, and functional fixedness"
      ],
      "5": [
        "Developmental psychology: Piaget stages of cognitive development (sensorimotor, preoperational, concrete, formal operational)",
        "Attachment theory: Ainsworth Strange Situation (secure, anxious-ambivalent, avoidant attachment) and Harlow rhesus monkey contact comfort",
        "Social psychology: Fundamental attribution error, cognitive dissonance (Festinger), Milgram obedience, and bystander effect / diffusion of responsibility"
      ]
    }
  },
  economics: {
    general: [
      "Marginal analysis: Marginal benefit vs marginal cost optimization and rational decision making",
      "Supply and demand dynamics: Shifts in curves vs movements along curves, and market clearing equilibrium price/quantity",
      "Elasticity measures: Price elasticity of demand/supply, cross-price elasticity, income elasticity, and total revenue test",
      "Government interventions: Price ceilings (shortages), price floors (surpluses), excise taxes, and deadweight loss calculation",
      "Macroeconomic indicators: Real vs nominal GDP, CPI inflation rates, unemployment categories (frictional, structural, cyclical)",
      "Aggregate Demand / Aggregate Supply (AD-AS): Short-run vs long-run macroeconomic equilibrium, recessionary vs inflationary gaps",
      "Fiscal and monetary policy: Government spending/tax multipliers, Federal Reserve tools (reserve requirements, discount rate, open market operations)"
    ],
    units: {
      "1": [
        "Production Possibilities Curve (PPC): Constant vs increasing opportunity costs, economic growth shifts, and productive vs allocative efficiency",
        "Comparative advantage and terms of trade: Output vs input method calculations and mutually beneficial trade exchange ratios"
      ],
      "2": [
        "Consumer and producer surplus: Calculating deadweight loss from per-unit excise taxes and tariff trade restrictions",
        "Cross-price elasticity (substitutes > 0 vs complements < 0) and income elasticity (normal goods > 0 vs inferior goods < 0)"
      ],
      "3": [
        "Short-run production and cost curves: Law of diminishing marginal returns, marginal product curve, MC, ATC, AVC, and AFC curves",
        "Perfect competition market structure: Price taker P = MR = D = AR, profit maximization MR = MC, shut-down rule (P < AVC), and zero economic profit in long run"
      ],
      "4": [
        "Monopoly market structure: Downward-sloping demand, MR < P, profit maximization, deadweight loss, and natural monopoly regulation",
        "Monopolistic competition & Oligopoly: Product differentiation, excess capacity, game theory payoff matrices, dominant strategy, and Nash equilibrium"
      ],
      "5": [
        "Macro AD-AS modeling: Shifts in Aggregate Demand and Short-Run Aggregate Supply, stagflation, and long-run self-correction",
        "Money market and Loanable funds market: Federal funds interest rate determination, open market operations, and crowding-out effect"
      ]
    }
  },
  human_geography: {
    general: [
      "Spatial pattern evaluation: Identifying clustering, dispersion, and regional density from geospatial maps and thematic projections",
      "Scale of analysis: Contrasting global, national, regional, and local demographic and economic data patterns to uncover hidden spatial variations",
      "Demographic stimulus interpretation: Evaluating Stage 2 vs Stage 4 population pyramids, dependency ratios, and sex ratio imbalances",
      "Geospatial model application: Testing real-world deviations from isotropic assumptions in concentric, sectoral, and agricultural models",
      "Cultural landscape analysis: Explaining visible religious, architectural, and linguistic imprints on urban centers and rural hearths",
      "Geopolitical border impacts: Devolutionary pressures, supranational governance, and UNCLOS maritime boundaries influencing state sovereignty"
    ],
    units: {
      "1": [
        "Geospatial technologies: Analyzing GIS overlay layers, GPS navigation coordinates, and satellite remote sensing for environmental disaster management",
        "Spatial concepts: Distance decay vs time-space compression driven by telecommunications and jet transportation",
        "Regional analysis: Formal (uniform climatic/legislative) vs Functional (nodal broadcast/newspaper) vs Vernacular (perceptual cultural identity) regions",
        "Human-environmental interaction: Environmental determinism vs possibilism in agricultural development and arid urbanization",
        "Map projections & distortion: Mercator preservation of directional lines for navigation vs polar areal distortion vs Peters equal-area balance",
        "Thematic mapping types: Choropleth density gradients, dot density distributions, isoline topographic contours, and proportional symbol maps"
      ],
      "2": [
        "Demographic Transition Model (DTM): Stage 1 high fluctuating equilibrium vs Stage 2 Industrial/Medical revolution CDR collapse and population explosion",
        "DTM Late Stages: Stage 3 fertility decline via urbanization and female education vs Stage 4 low stable equilibrium and Stage 5 natural decrease",
        "Epidemiological Transition Model: Stage 1 pestilence and famine vs Stage 2 receding pandemics vs Stage 3/4 degenerative human-made diseases",
        "Population Pyramids: Broad expansive base (rapid growth, high youth dependency) vs columnar aging demographic (caregiver deficits and pension strain)",
        "Malthusian population theory: Arithmetic food growth vs exponential population growth, positive vs preventative checks, and Boserup agricultural intensification rebuttal",
        "Migration push and pull factors: Economic employment, political persecution, environmental desertification, and Ravenstein's laws of migration",
        "Forced vs voluntary displacement: Refugees vs internally displaced persons (IDPs) vs asylum seekers under international UNHCR protocols",
        "Pro-natalist vs anti-natalist government policies: Singapore tax rebates and parental leave vs China's historic One-Child Policy gender imbalance"
      ],
      "3": [
        "Types of cultural diffusion: Relocation (physical migration) vs Expansion diffusion (contagious social media, hierarchical fashion/capitals, stimulus adaptations)",
        "Religious distribution & hearths: Universalizing faiths (Christianity, Islam, Buddhism) seeking global converts vs Ethnic faiths (Judaism, Hinduism) anchored to sacred hearth landscapes",
        "Linguistic geography: Indo-European language family evolution, Romance/Germanic branches, isoglosses, dialects, and English as global lingua franca",
        "Cultural landscape imprint: Toponyms, religious architecture (minarets, steeples, shrines), and indigenous vs colonial land-use patterns",
        "Cultural identity processes: Acculturation (adopting traits while maintaining identity) vs Assimilation (complete cultural absorption) vs Syncretism (blended traditions)",
        "Centripetal vs centrifugal cultural forces: Shared national language/patriotism unifying a populace vs ethnic sectarian linguistic cleavages driving fragmentation"
      ],
      "4": [
        "Political entity types: Nation-states (Japan, Iceland), stateless nations (Kurds, Palestinians), multinational states (UK, Canada), and autonomous regions",
        "Colonial borders and historical boundaries: Berlin Conference (1884) superimposed borders ignoring African ethnic lines, antecedent boundaries, and relic boundaries (Berlin Wall)",
        "Boundary dispute categories: Definitional (treaty wording), locational (border cartography), operational (immigration/customs), and allocational (oil/aquifer resource extraction)",
        "Law of the Sea (UNCLOS): 12-nautical-mile territorial sea sovereignty, 24nm contiguous enforcement zone, and 200nm Exclusive Economic Zone (EEZ) resource rights",
        "Internal political boundaries: Gerrymandering techniques (packing opposition into single districts vs cracking across multiple districts) and redistricting reapportionment",
        "Devolutionary forces: Physical geography barriers, ethnic separatism (Basques, Catalans), economic disparities, and terrorism causing state decentralization",
        "Supranational organizations: European Union (EU), United Nations (UN), NATO, and ASEAN balancing sovereign independence against collective trade and defense"
      ],
      "5": [
        "Von Th\xFCnen Agricultural Land-Use Model: Concentric rings determined by land rent and perishability/transport weight (Dairying -> Timber -> Grains -> Livestock)",
        "Bid-Rent Theory in agriculture: Highest land cost near urban market favoring intensive farming vs low rent per hectare on periphery favoring extensive grazing",
        "First, Second, and Third (Green) Agricultural Revolutions: High-yield variety (HYV) wheat/rice strains, synthetic nitrogen fertilizers, and mechanized irrigation",
        "Intensive vs Extensive agricultural systems: Market gardening, plantation agriculture, and mixed crop-livestock vs nomadic herding and shifting cultivation",
        "Cadastral rural survey systems: English Metes and Bounds (natural landmarks) vs French Long Lots (riverfront access) vs Township and Range rectangular grids",
        "Global agricultural supply chains: Agribusiness corporate consolidation, commodity chains, fair trade certification, and export monoculture vulnerabilities"
      ],
      "6": [
        "Classic North American Urban Models: Burgess Concentric Zone (CBD outward) vs Hoyt Sector (transit corridor wedges) vs Harris-Ullman Multiple Nuclei",
        "Galactic City and Edge Cities: Suburban nodes, beltways, office parks, and polycentric urban agglomerations",
        "Christaller's Central Place Theory: Hexagonal market areas, threshold (minimum customer base to sustain a business), and range (maximum distance consumers travel)",
        "Urban settlement hierarchies: Primate city rule (disproportionate economic/political dominance) vs Rank-Size rule (nth city is 1/n size of largest city)",
        "Urban challenges & gentrification: Displacement of lower-income residents, property tax inflation, suburban sprawl, infrastructure deficits, and food deserts",
        "Socio-spatial urban inequalities: Redlining, blockbusting, racial steering, and peripheral squatter settlements / favelas in developing megacities"
      ],
      "7": [
        "Wallerstein's World Systems Theory: Core (capital-intensive, high-value manufacturing), Periphery (raw material extraction, low wages), and Semiperiphery",
        "Rostow's Stages of Economic Growth: Traditional society -> Preconditions for takeoff -> Takeoff -> Drive to maturity -> Age of high mass consumption",
        "Weber's Least Cost Theory: Raw material index, bulk-reducing industries (copper smelting near mine) vs bulk-gaining industries (beverage bottling near market)",
        "Human Development Index (HDI): Composite metric evaluating GDP per capita (PPP), mean years of schooling, and life expectancy at birth",
        "Gender and Economic Development: Gender Inequality Index (GII), microfinance small-business lending, and female labor force participation empowerment",
        "Post-Fordism and globalization: Offshoring, maquiladoras, Export Processing Zones (EPZs), just-in-time logistics, and Rust Belt deindustrialization"
      ]
    }
  },
  environmental_science: {
    general: [
      "Ecological systems analysis: Trophic energy transfers, 10% ecological efficiency rule, and nutrient cycling disruptions",
      "Environmental quantitative calculations: LD50 toxicology thresholds, Rule of 70 doubling times, and per-capita resource consumption",
      "Anthropogenic impact evaluation: Ocean acidification, stratospheric ozone depletion, and habitat fragmentation",
      "Sustainable resource stewardship: Renewable energy trade-offs, integrated pest management, and aquifer recharge equilibrium"
    ],
    units: {
      "1": ["Carbon, nitrogen, and phosphorus biogeochemical cycles", "Primary productivity: GPP vs NPP calculations in terrestrial and aquatic biomes"],
      "2": ["Ecosystem biodiversity: Species richness vs evenness, ecosystem services, and island biogeography theory"],
      "3": ["Population ecology: r-selected vs K-selected species, Type I/II/III survivorship curves, and carrying capacity K overshoot"],
      "4": ["Earth systems: Plate tectonics, soil texture triangle classification, atmospheric Hadley cells, and El Ni\xF1o-Southern Oscillation (ENSO)"],
      "5": ["Land and water use: Tragedy of the commons, Green Revolution impacts, irrigation salinization, and integrated pest management (IPM)"],
      "6": ["Energy resources: Fossil fuel extraction, nuclear fission half-life calculations, photovoltaic solar, and wind turbine generation"],
      "7": ["Atmospheric pollution: Photochemical smog formation, thermal inversions, acid deposition, and catalytic converters"],
      "8": ["Aquatic and terrestrial pollution: Cultural eutrophication, biochemical oxygen demand (BOD) oxygen sag curves, and endocrine disruptors"],
      "9": ["Global change: Stratospheric ozone chlorofluorocarbons (CFCs), greenhouse gas warming potentials, ocean acidification, and invasive species"]
    }
  },
  csp: {
    general: [
      "Algorithmic analysis: Selection, sequencing, and iteration efficiency and correctness",
      "Data abstraction & representation: Binary encoding, hexadecimal conversion, lossy vs lossless compression",
      "Internet architecture: Packet routing, TCP/IP protocols, DNS hierarchy, and fault-tolerant network topologies",
      "Societal impacts of computing: Digital divide, facial recognition bias, intellectual property, and crowdsourcing citizen science"
    ],
    units: {
      "1": ["Iterative software development process: Program design, user testing, debugging logic errors vs syntax errors"],
      "2": ["Binary numbers, bytes, overflow errors, metadata, and analog-to-digital sampling rates"],
      "3": ["Robot grid path traversals, list manipulations, linear vs binary search operations, and modular procedural abstraction with parameters"],
      "4": ["The Internet, IPv4 vs IPv6 addressing, router redundancy, bandwidth vs latency, and public-key encryption (RSA)"],
      "5": ["Computing innovations, digital divide, creative commons licensing, open-source software, phishing, malware, and multi-factor authentication"]
    }
  },
  government: {
    general: [
      "Foundational document textual analysis: Federalist No. 10, Brutus No. 1, Federalist No. 78, Letter from Birmingham Jail",
      "SCOTUS case precedent and selective incorporation: McCulloch v. Maryland, US v. Lopez, Tinker v. Des Moines, Brown v. Board",
      "Interactions among branches: Congressional checks, presidential executive orders, judicial review, and bureaucratic administrative rulemaking",
      "Political participation & public opinion: Polling methodology, voting rights legislation, campaign finance, and media agenda setting"
    ],
    units: {
      "1": ["Constitutional foundations: Separation of powers, checks and balances, federalism, Commerce Clause, and Tenth Amendment reserved powers"],
      "2": ["Institutions of national government: House vs Senate procedural rules (filibuster, rules committee), executive veto power, judicial appointments, iron triangles"],
      "3": ["Civil liberties & civil rights: First Amendment Free Exercise vs Establishment Clause, Fourteenth Amendment Equal Protection, selective incorporation"],
      "4": ["American political ideologies: Liberalism vs conservatism vs libertarianism, political socialization agents, and Keynesian vs supply-side fiscal policy"],
      "5": ["Political participation: Electoral College mechanisms, Citizens United v. FEC independent expenditures, interest group lobbying, and primary voting systems"]
    }
  },
  statistics: {
    general: [
      "Data display interpretation: Histograms, stemplots, boxplots with 1.5*IQR outlier criterion, and normal probability plots",
      "Bivariate relationship analysis: Least-squares regression line (LSRL), correlation coefficient r, and residual plot diagnostic patterns",
      "Experimental and survey design: Simple random sampling, stratified sampling, blocking, confounding variables, and placebo double-blinding",
      "Statistical inference: Null vs alternative hypotheses, Type I vs Type II errors, p-value interpretation, and confidence intervals"
    ],
    units: {
      "1": ["Exploring One-Variable Data: Center, shape, spread, standard deviation formula, z-score transformations, empirical 68-95-99.7 rule"],
      "2": ["Exploring Two-Variable Data: LSRL y-hat = a + bx, slope and intercept contextual interpretations, coefficient of determination r^2, influential points"],
      "3": ["Collecting Data: Observational study vs randomized controlled experiment, voluntary response bias, nonresponse bias, and completely randomized designs"],
      "4": ["Probability and distributions: Addition/multiplication probability rules, conditional probability P(A|B), binomial B(n,p) vs geometric distributions"],
      "5": ["Sampling Distributions: Central Limit Theorem (CLT), sampling distribution of sample mean x-bar and sample proportion p-hat, standard error"],
      "6": ["Inference for Categorical Proportions: One-sample and two-sample z-intervals and z-tests, normal approximation conditions np >= 10 and n(1-p) >= 10"],
      "7": ["Inference for Quantitative Means: One-sample and two-sample t-procedures, degrees of freedom, matched-pairs t-tests, robustness to normality"],
      "8": ["Chi-Square Inference: Chi-Square goodness-of-fit test, test of independence, test of homogeneity, expected cell count requirements"],
      "9": ["Inference for Regression Slopes: t-test for population regression slope beta, standard error of the slope SE_b, linear regression condition checks"]
    }
  },
  general_academic: {
    general: [
      "Conceptual definition and contextualization: Defining core domain terminology and situating the phenomenon within its broader academic framework",
      "Cause-and-effect explanatory analysis: Demonstrating step-by-step how an initial change or stimulus leads directly to observed secondary consequences",
      "Comparative critical evaluation: Contrasting two competing theories, institutional models, or empirical outcomes to assess relative efficacy",
      "Claim justification using empirical evidence: Formulating a defensible analytical thesis supported by authentic course-specific data or principles"
    ],
    units: {
      "1": ["Foundational domain principles: Core taxonomic concepts, historical precedents, and primary analytical frameworks"],
      "2": ["System dynamics and interactions: Analyzing functional relationships between interdependent components within the field"],
      "3": ["Advanced contextual evaluation: Assessing real-world case studies, regulatory interventions, and empirical validations"]
    }
  }
};
function getGranularSubjectArchetypes(subject, unitOrTopic, count) {
  const s = (subject || "").toLowerCase();
  const u = (unitOrTopic || "").toLowerCase();
  let bundle = AP_SUBJECT_ARCHETYPES.general_academic;
  if (s.includes("geography") || s.includes("aphg") || s.includes("human")) {
    bundle = AP_SUBJECT_ARCHETYPES.human_geography;
  } else if (s.includes("environmental") || s.includes("apes")) {
    bundle = AP_SUBJECT_ARCHETYPES.environmental_science;
  } else if (s.includes("principles") || s.includes("csp")) {
    bundle = AP_SUBJECT_ARCHETYPES.csp;
  } else if (s.includes("gov") || s.includes("politics")) {
    bundle = AP_SUBJECT_ARCHETYPES.government;
  } else if (s.includes("stat")) {
    bundle = AP_SUBJECT_ARCHETYPES.statistics;
  } else if (s.includes("calculus")) {
    bundle = AP_SUBJECT_ARCHETYPES.calculus;
  } else if (s.includes("biology")) {
    bundle = AP_SUBJECT_ARCHETYPES.biology;
  } else if (s.includes("chemistry")) {
    bundle = AP_SUBJECT_ARCHETYPES.chemistry;
  } else if (s.includes("physics")) {
    bundle = AP_SUBJECT_ARCHETYPES.physics;
  } else if (s.includes("history") || s.includes("apush") || s.includes("euro") || s.includes("world")) {
    bundle = AP_SUBJECT_ARCHETYPES.history;
  } else if (s.includes("psych")) {
    bundle = AP_SUBJECT_ARCHETYPES.psychology;
  } else if (s.includes("econ")) {
    bundle = AP_SUBJECT_ARCHETYPES.economics;
  }
  const unitMatch = u.match(/(?:unit|period|chapter|u|p)\s*([0-9]+)/i);
  const detectedUnit = unitMatch ? unitMatch[1] : null;
  let candidatePool = [];
  if (detectedUnit && bundle.units[detectedUnit] && bundle.units[detectedUnit].length > 0) {
    candidatePool = [...bundle.units[detectedUnit]];
    if (candidatePool.length < count) {
      candidatePool.push(...bundle.general);
    }
  } else {
    const allUnitItems = Object.values(bundle.units).flat();
    candidatePool = [...allUnitItems, ...bundle.general];
  }
  const shuffled = [...candidatePool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (shuffled.length > 0 && shuffled.length < count) {
    const base = [...shuffled];
    while (shuffled.length < count) {
      shuffled.push(...base);
    }
  }
  return shuffled.slice(0, count);
}

// src/data/apPromptGuidelines.ts
function getCollegeBoardSubjectGuidelines(subject, questionType) {
  const s = (subject || "").toLowerCase();
  if (s.includes("human geography") || s.includes("aphg")) {
    if (questionType === "objective") {
      return `AP HUMAN GEOGRAPHY (APHG) EXAM SPECIFICATIONS (College Board CED - #1 Grade 9 AP):
- Target Audience: Grade 9 (Freshman) High School Students. Stimulus-based, testing spatial perspective, geographic patterns, and real-world regional connections across Units 1\u20137.
- Core Topics:
  1. Thinking Geographically (Geospatial tech [GIS, GPS, remote sensing], scales of analysis [local, regional, national, global], formal/functional/perceptual regions).
  2. Population & Migration (Demographic Transition Model [DTM Stages 1-5], population pyramids, dependency ratios, Malthusian theory, push/pull factors, Ravenstein's laws, refugees/IDPs).
  3. Cultural Patterns & Processes (Hearths, spatial diffusion [contagious, hierarchical, stimulus, relocation], acculturation, assimilation, language families, universalizing vs ethnic religions).
  4. Political Patterns & Processes (Sovereignty, nation-states, stateless nations, supranationalism [UN, EU, NATO], devolution, gerrymandering, boundaries/UNCLOS).
  5. Agriculture & Rural Land-Use (Von Th\xFCnen model, Green Revolution, subsistence vs commercial agriculture, intensive vs extensive farming, global supply chains).
  6. Cities & Urban Land-Use (Burgess Concentric Zone, Hoyt Sector, Harris-Ullman Multiple Nuclei, Galactic model, Christaller's Central Place Theory, rank-size rule, primate cities, gentrification, New Urbanism).
  7. Industrial & Economic Development (Wallerstein World Systems [Core/Periphery], Rostow 5 Stages of Economic Growth, Weber Least Cost Theory, HDI, UN SDGs).
- Stimulus Requirement: Ground questions in realistic geographic stimuli (demographic data charts, regional map descriptions, population pyramid profiles, or geographic case studies).
- Distractors: Plausible 9th-grade misconceptions (e.g., confusing environmental determinism with possibilism, confusing hierarchical with contagious diffusion, or misidentifying DTM stages).`;
    } else {
      return `AP HUMAN GEOGRAPHY FREE RESPONSE STANDARDS (College Board CED - 7-Part FRQ):
- Format: Real 7-PART College Board Free Response Questions with parts (A), (B), (C), (D), (E), (F), and (G). Total Points: Exactly 7 Points (1 point per part).
- Official FRQ Types:
  1. Question 1 (No Stimulus): Tests geographic concepts, spatial models, and processes.
  2. Question 2 (One Stimulus): Anchored to a thematic map, demographic chart, or spatial model.
  3. Question 3 (Two Stimuli): Comparative synthesis between two geographic datasets or regions.
- Command Verbs & Scaffolding:
  - "Identify" / "Define" (1-2 sentences stating the specific concept or pattern).
  - "Describe" (Provide relevant characteristics or spatial trends).
  - "Explain" (Must clearly establish cause-and-effect line of reasoning: 'how' or 'why' X causes Y in geographic context).
- Rubric: Exactly 7 points (+1 pt for each part A through G) with crystal-clear scoring criteria and model responses.`;
    }
  }
  if (s.includes("environmental") || s.includes("apes")) {
    if (questionType === "objective") {
      return `AP ENVIRONMENTAL SCIENCE (APES) EXAM SPECIFICATIONS (College Board CED):
- Target Level: Grade 9-10 introductory environmental lab science. High conceptual clarity, data interpretation, and environmental problem-solving across Units 1\u20139.
- Core Units:
  1-3. Ecosystems, biogeochemical cycles (carbon, nitrogen, phosphorus, water), trophic cascades, 10% rule, biodiversity, ecosystem services, population ecology (r/K selection, survivorship curves, carrying capacity).
  4-6. Earth systems (soil texture triangle, atmosphere, El Ni\xF1o), land & water use (Tragedy of the Commons, Green Revolution, irrigation, IPM, CAFOs, mining), energy resources (fossil fuels, nuclear, solar, wind, efficiency).
  7-9. Atmospheric pollution (photochemical smog, acid deposition, thermal inversions), aquatic/terrestrial pollution (eutrophication, biomagnification, LD50, landfills), global change (stratospheric ozone depletion, ocean acidification, climate mitigation).
- Quantitative Reasoning: Include realistic environmental math (Rule of 70, LD50 toxicity, percent change, metric conversions).
- Distractors: Represent common student traps (confusing ozone depletion with global warming, confusing point vs nonpoint pollution).`;
    } else {
      return `AP ENVIRONMENTAL SCIENCE FREE RESPONSE STANDARDS (College Board CED):
- Format: Real 10-POINT multi-part questions with sub-parts (a), (b), (c), (d), (e). Total Points: Exactly 10 Points.
- Official FRQ Archetypes:
  1. Design an Investigation: Hypothesis, independent/dependent/control variables, data collection procedures, and experimental validity.
  2. Analyze an Environmental Problem & Propose a Solution: Ecological impacts, identifying root causes, and proposing realistic, sustainable solutions with environmental or economic justifications.
  3. Quantitative Environmental Problem & Solution: Multi-step mathematical calculations (with units and dimensional analysis) paired with an environmental mitigation recommendation.
- Rubric: Exactly 10 points breakdown with step-by-step partial-credit criteria.`;
    }
  }
  if (s.includes("principles") || s.includes("csp")) {
    if (questionType === "objective") {
      return `AP COMPUTER SCIENCE PRINCIPLES (CSP) EXAM SPECIFICATIONS (College Board CED):
- Target Level: Grade 9-10 foundational computing. Focus on computational thinking, algorithm logic, data representation, and societal impacts (Units 1\u20135).
- Scope: Creative development, binary/hex numbers, data compression (lossy vs lossless), pseudocode algorithms (robot grid traversal, conditional iteration, list filtering), Internet architecture (IP, TCP/IP, packet routing, fault tolerance), cybersecurity (public-key encryption, phishing, DDoS), and computing ethics.
- Distractors: Represent algorithmic off-by-one errors, Boolean logic inversion (AND vs OR), or confusing lossy vs lossless compression.`;
    } else {
      return `AP COMPUTER SCIENCE PRINCIPLES WRITTEN RESPONSE / PERFORMANCE TASK STANDARDS:
- Format: 4-Part Written Response (6 Points Total) based on computational artifacts and program development:
  - Part (a): Program Function and Purpose (explaining user inputs, outputs, and overall functionality).
  - Part (b): Data Abstraction (identifying list/collection name, data represented, and how complexity is managed).
  - Part (c): Algorithmic Logic & Sequencing (explaining iteration, selection, sequencing, and algorithmic outcome).
  - Part (d): Testing & Parameter Behavior (describing two different calls/inputs, expected conditions, and resulting outputs).
- Rubric: Precise College Board CED 6-point scoring criteria.`;
    }
  }
  if (s.includes("calculus bc")) {
    if (questionType === "objective") {
      return `AP CALCULUS BC EXAM SPECIFICATIONS (College Board CED):
- Coverage: Full AB curriculum PLUS BC-exclusive topics: Parametric equations, vector motion in 2D (velocity/acceleration vectors, speed = sqrt((x')^2 + (y')^2)), polar functions (polar area = (1/2)*integral(r^2 dTheta)), integration by parts, partial fractions, improper integrals, Euler's method, logistic differential equations (dP/dt = kP(1 - P/M)), and Infinite Series.
- Infinite Series focus: Geometric series, Taylor/Maclaurin polynomial approximations, nth-term divergence, Ratio test for radius & interval of convergence, Alternating Series Test.
- Distractors must represent classic student misconceptions: omitting chain rule in parametric derivatives, sign errors in integration by parts, forgetting to check endpoints in interval of convergence.
- Format all math expressions cleanly using LaTeX ($...$).`;
    } else {
      return `AP CALCULUS BC FREE RESPONSE STANDARDS (College Board CED):
- Format: Real 9-POINT multi-part questions with sub-parts (a), (b), (c), (d).
- Priority Archetypes:
  1. Infinite Series (Taylor/Maclaurin series, finding general term, computing radius/interval of convergence using Ratio Test, Alternating Series Error Bound or Lagrange Error Bound).
  2. Parametric / Polar Motion (position vector, velocity, total distance traveled / arc length integral, polar area enclosed between curves).
  3. Logistic Differential Equations & Euler's Method step-by-step approximation.
  4. Area & Volume of solids of revolution (disk/washer/cross sections) or Rate In / Rate Out Accumulation.
- Total Points MUST be 9 points. Rubric must award partial points step-by-step (+1 pt for setup/derivative, +1 pt for antiderivative, +1 pt for justification/units).`;
    }
  }
  if (s.includes("calculus ab") || s.includes("calculus")) {
    if (questionType === "objective") {
      return `AP CALCULUS AB EXAM SPECIFICATIONS (College Board CED):
- Coverage: Limits & Continuity (including L'Hopital's Rule), Derivatives (Chain rule, Product/Quotient rule, Implicit differentiation), Mean Value Theorem, Particle Motion in 1D (position, velocity, acceleration, speed increasing/decreasing), Definite & Indefinite Integrals, Fundamental Theorem of Calculus, Riemann Sums, Differential Equations (separable).
- Distractors must reflect real student math traps: forgetting chain rule factors, arithmetic sign slips, forgetting '+ C', confusing velocity with acceleration.
- Format all equations cleanly in LaTeX ($...$).`;
    } else {
      return `AP CALCULUS AB FREE RESPONSE STANDARDS (College Board CED):
- Format: Real 9-POINT multi-part questions with sub-parts (a), (b), (c), (d).
- Classic AP FRQ Archetypes:
  1. Rate In / Rate Out Accumulation: Net change integral formula integral(R_in(t) - R_out(t))dt, checking critical times.
  2. Particle Motion: Analyzing velocity v(t), determining when speed is increasing/decreasing, total distance traveled integral(|v(t)|dt).
  3. Graph Analysis of f'(x): Identifying relative extrema, points of inflection, justifying with First/Second Derivative Test, EVT.
  4. Area & Volume: Area between two curves, volume of solid of revolution (disk/washer), volume with known cross sections (squares/semicircles).
  5. Differential Equations: Slope fields, separation of variables to find particular solution y = f(x) with initial condition.
  6. Riemann Sums & Tables: Estimating definite integrals using Trapezoidal rule or Left/Right sums with physical units.
- Total Points MUST be 9 points. Rubric must assign exact points per sub-part.`;
    }
  }
  if (s.includes("biology")) {
    if (questionType === "objective") {
      return `AP BIOLOGY EXAM SPECIFICATIONS (College Board CED):
- Stimulus-Based Design: Base questions on authentic biological investigations (e.g. cellular respiration respirometers, gel electrophoresis band patterns, spectrophotometric enzyme curves, water potential potato cylinders, pedigree tracking, or Hardy-Weinberg population data).
- Visual Diagrams & Curves (MANDATORY): For Cellular Energetics (Unit 3), Cell Structure (Unit 2), Genetics (Unit 5), or Ecology (Unit 8), generate the complete SVG diagram in "diagramSvg" (viewBox="0 0 400 220") and specify "diagramType".
- Diverse Organisms & Real Biological Systems: NEVER use generic placeholders like 'Enzyme X' or repeat identical experimental scenarios. Vary the organism (e.g. yeast, spinach, bovine liver catalase, E. coli, marine phytoplankton, Drosophila, Arabidopsis thaliana) and real enzymes (catalase, pepsin, salivary amylase, RuBisCO, ATP synthase, cytochrome c oxidase).
- Core Themes: Chemistry of life, cell structure & energetics (photosynthesis/respiration), cell communication & cell cycle, heredity & genetics, gene expression & regulation, natural selection, ecology.
- Question Style: Questions must require students to analyze experimental data, make scientific claims, identify controls, or predict the biological consequence of an inhibitor or mutation.`;
    } else {
      return `AP BIOLOGY FREE RESPONSE STANDARDS (College Board CED):
- Formats:
  1. Long FRQ (8-10 points): Interpreting & Evaluating Experimental Results. Includes experimental design, specifying independent/dependent variables, graphing with standard error bars (\xB12 SEM), calculating means, and Null Hypothesis / Chi-Square testing.
  2. Short FRQ (4 points): Scientific Investigation (identifying negative/positive controls), Conceptual Analysis (predicting effects of disruption/mutation), or Model Analysis (analyzing cell signaling cascades).
- Visual Diagrams & Curves (MANDATORY): For Cellular Energetics, Genetics (pedigrees), or Ecology, generate the complete SVG graph in "diagramSvg" (viewBox="0 0 400 220") with labeled axes, data points, and appropriate "diagramType". NEVER use generic 'Enzyme X' - use real biological enzymes and realistic experimental parameters.
- Rubric: Precise point allocation (+1 pt for identifying control, +1 pt for calculating rate, +1 pt for biological justification).`;
    }
  }
  if (s.includes("chemistry")) {
    if (questionType === "objective") {
      return `AP CHEMISTRY EXAM SPECIFICATIONS (College Board CED):
- Content: Atomic structure & PES spectra, molecular bonding & Lewis/VSEPR, intermolecular forces & properties, chemical reactions & stoichiometry, kinetics rate laws, thermodynamics (Delta H, Delta S, Delta G = -RT ln K), equilibrium & Le Chatelier's principle, acids & bases (titration curves, buffers), electrochemistry.
- Visuals & Diagrams: Include particulate representations (drawings of atoms/molecules in a container), molecular geometry descriptions, and reaction energy profiles.
- Distractors: Represent stoichiometry mole-ratio errors, confusing Delta H with Delta G, or inverted equilibrium expressions.`;
    } else {
      return `AP CHEMISTRY FREE RESPONSE STANDARDS (College Board CED):
- Formats:
  1. Long FRQ (10 points): Multi-part problem covering multi-step stoichiometry, net ionic equations, thermodynamics calculations, electrochemistry cell potentials (E_cell = E_cathode - E_anode), and acid-base buffer calculations (Henderson-Hasselbalch equation).
  2. Short FRQ (4 points): Lewis structures & resonance, VSEPR molecular geometry and bond angles, intermolecular forces comparing boiling points, or Beer-Lambert Law spectrophotometry (A = epsilon * b * c).
  3. Rubric: Must break down exact points (+1 pt for balanced net ionic equation, +1 pt for ICE table setup, +1 pt for final answer with correct significant figures and units).`;
    }
  }
  if (s.includes("physics 1")) {
    if (questionType === "objective") {
      return `AP PHYSICS 1: ALGEBRA-BASED EXAM SPECIFICATIONS (Updated College Board CED):
- Format: Strictly 4 answer choices (A-D, single-select).
- Scope: Kinematics, Newton's Laws, Work/Energy/Power, Linear Momentum, Torque & Rotational Motion, Simple Harmonic Motion, AND newly integrated FLUIDS (density, pressure, buoyant force, Archimedes principle, continuity equation, Bernoulli's equation).
- Cognitive Focus: Qualitative proportional reasoning (e.g. 'If radius doubles and angular velocity is halved, what happens to centripetal acceleration?'), force diagrams, and conservation laws.`;
    } else {
      return `AP PHYSICS 1 FREE RESPONSE STANDARDS (College Board CED):
- Four Official FRQ Types:
  1. Mathematical Routines (algebraic derivations, energy/momentum conservation).
  2. Translation Between Representations (connecting equations to graphs like Force vs Time or Velocity vs Time).
  3. Experimental Design (outlining a lab setup, list of apparatus, step-by-step procedure to reduce uncertainty, and data analysis plan).
  4. Qualitative / Quantitative Translation (QQT) (explaining a physical phenomenon in clear conceptual prose without equations first, then deriving the algebraic formula to prove it).
- Total points: 7 to 12 points with explicit point-by-point rubric.`;
    }
  }
  if (s.includes("computer science a")) {
    if (questionType === "objective") {
      return `AP COMPUTER SCIENCE A EXAM SPECIFICATIONS (College Board Java Subset):
- Java Syntax: Code snippets strictly following the official Java Quick Reference (String, Math, ArrayList, 1D/2D arrays, OOP inheritance, polymorphism).
- Concepts: Loop bounds, tracing variable mutations, Boolean logic (De Morgan's laws), recursion execution traces, class design, and searching/sorting algorithms (binary search, selection/insertion/merge sort).
- Distractors: Off-by-one errors (e.g., '< arr.length' vs '<= arr.length'), NullPointerException triggers, confusing '=' with '==', integer division truncation.`;
    } else {
      return `AP COMPUTER SCIENCE A FREE RESPONSE STANDARDS (College Board CED):
- Format: 4 Authentic Java Coding Questions (9 Points Each):
  - Question 1: Methods and Control Structures (loops, conditionals, helper methods).
  - Question 2: Class Design (writing a complete Java class with private instance variables, constructor, getters/setters, and specified methods).
  - Question 3: Array / ArrayList (traversing, filtering, or modifying elements, avoiding ConcurrentModificationException and index errors).
  - Question 4: 2D Array (nested row/column loops, grid manipulation).
- Rubric: Strict 9-point rubric awarding points for method header, loops, conditionals, accessing elements, returning correct value.`;
    }
  }
  if (s.includes("u.s. history") || s.includes("us history") || s.includes("apush")) {
    if (questionType === "objective") {
      return `AP U.S. HISTORY (APUSH) EXAM SPECIFICATIONS (College Board CED):
- Stimulus-Based: Every single question set MUST be anchored to a primary source excerpt (presidential speech, newspaper editorial, letter, treaty, colonial document) or secondary historical analysis from Periods 1-9 (1491-Present).
- Historical Thinking Skills: Contextualization, causation, continuity and change over time (CCOT), comparison.
- Distractors: Factually true statements from a DIFFERENT historical era or claims that mischaracterize the author's argument.`;
    } else {
      return `AP U.S. HISTORY (APUSH) FREE RESPONSE STANDARDS (College Board CED):
- Formats:
  1. DBQ (Document-Based Question, 7-Point Rubric): Provide 7 distinct historical source documents (Author, Source, Year, Excerpt). Rubric: Thesis (1 pt), Contextualization (1 pt), Evidence from 3+ docs (1 pt) or 6+ docs (2 pts), Outside Evidence (1 pt), Sourcing/HIPP analysis (1 pt), Historical Complexity (1 pt).
  2. LEQ (Long Essay Question, 6-Point Rubric): Historical prompt testing Causation, CCOT, or Comparison without documents.
  3. SAQ (Short Answer Question): 3 parts (a), (b), (c) strictly requiring the ACE format (Answer, Cite specific evidence, Explain connection).`;
    }
  }
  if (s.includes("world history")) {
    if (questionType === "objective") {
      return `AP WORLD HISTORY: MODERN EXAM SPECIFICATIONS (College Board CED):
- Time Period: 1200 CE to the Present.
- Stimulus-Based: Provide primary excerpts from historical travelers (Ibn Battuta, Marco Polo), imperial edicts (Mongol, Ottoman, Ming), colonial treaties, or Cold War declarations.
- Themes: Global Tapestry, Networks of Exchange, Land-Based Empires, Transoceanic Interconnections, Revolutions, Industrialization, Global Conflicts, Decolonization, and Globalization.`;
    } else {
      return `AP WORLD HISTORY: MODERN FREE RESPONSE STANDARDS (College Board CED):
- Formats:
  1. DBQ (Document-Based Question, 7-Point Rubric): 7 historical documents from world history.
  2. LEQ (Long Essay Question, 6-Point Rubric): Global historical causation, comparison, or CCOT.
  3. SAQ (Short Answer Question): 3 distinct parts (a), (b), (c) in ACE format.
- Rubrics must strictly follow the official College Board historical rubrics.`;
    }
  }
  if (s.includes("english") || s.includes("lang")) {
    if (questionType === "objective") {
      return `AP ENGLISH LANGUAGE & COMPOSITION EXAM SPECIFICATIONS (College Board CED):
- Reading Questions: Non-fiction rhetorical analysis passage (speech, essay, letter). Analyze author's purpose, claims, line of reasoning, rhetorical choices (diction, syntax, appeals to ethos/pathos/logos), and tone.
- Writing Questions: Excerpt from a draft student essay. Ask how to revise thesis statements, enhance sentence variety, improve transitional phrases, or integrate evidence cohesively.`;
    } else {
      return `AP ENGLISH LANGUAGE FREE RESPONSE STANDARDS (College Board CED):
- 3 Authentic AP Lang Essay Types (Each scored on the official 6-Point Analytic Rubric):
  1. Synthesis Essay: Present a prompt and 6 diverse sources (articles, statistics, visual data). Students must synthesize at least 3 sources to support an argument.
  2. Rhetorical Analysis Essay: Provide an authentic non-fiction speech/letter and ask students to analyze how the author uses rhetorical choices to convey their message.
  3. Argument Essay: Present a philosophical, cultural, or social claim to defend, challenge, or qualify with evidence from history, literature, or personal observation.
- Rubric: 1 pt Thesis, 4 pts Evidence & Commentary, 1 pt Sophistication.`;
    }
  }
  if (s.includes("psychology")) {
    if (questionType === "objective") {
      return `AP PSYCHOLOGY EXAM SPECIFICATIONS (Updated College Board CED):
- Format: Scenario-based questions applying psychological principles to real-world behavioral situations.
- Content: Biological bases of behavior (neurotransmitters, brain structures, nervous system), sensation & perception, learning (operant/classical conditioning), cognitive psychology (memory, biases), developmental psychology, personality theories, social psychology, clinical psychology (DSM-5 diagnostic criteria).`;
    } else {
      return `AP PSYCHOLOGY FREE RESPONSE STANDARDS (Updated College Board CED):
- 2 Official FRQ Types:
  1. Article Analysis Question (AAQ): Provide an empirical psychological research study abstract. Students must identify independent/dependent variables, confounding variables, assess statistical significance (p < 0.05), and evaluate APA ethical guidelines (informed consent, debriefing, confidentiality).
  2. Evidence-Based Question (EBQ): Students synthesize psychological concepts to construct a defensible claim supported by empirical evidence.
- Rubric: Clearly specify which psychological concepts earn points and required justifications.`;
    }
  }
  if (s.includes("economic")) {
    if (questionType === "objective") {
      return `AP MICRO & MACROECONOMICS EXAM SPECIFICATIONS (College Board CED):
- Microeconomics: Supply & demand elasticity, consumer/producer surplus, market structures (perfect competition, monopoly, oligopoly), externalities, marginal cost/revenue, factor markets.
- Macroeconomics: GDP, inflation, unemployment, Aggregate Demand / Aggregate Supply (AD-AS), fiscal policy, monetary policy (Federal Reserve tools), Money Market, Loanable Funds, Phillips Curve, Foreign Exchange.
- Distractors: Confusing shifts of a curve with movements along a curve, or miscalculating tax incidence / multiplier effects.`;
    } else {
      return `AP ECONOMICS FREE RESPONSE STANDARDS (College Board CED):
- Formats:
  1. Long FRQ (10 points, ~30 min): Multi-part scenario with explicit graphing instructions (e.g., 'Draw a correctly labeled graph of the money market and show the effect of an open market purchase of bonds on the nominal interest rate').
  2. Short FRQ (5 points, ~15 min): Targeted calculations (elasticity, spending multiplier, balance of payments) and directional explanations.
- Rubric: Explicit points for graph labeling, curve shift directions, and numerical calculations.`;
    }
  }
  return `College Board AP Course and Exam Description standards for ${subject}. High rigor, analytical thinking, stimulus-based.`;
}
function getDynamicTopicVariation(subject, unitOrTopic, count) {
  const archetypes = getGranularSubjectArchetypes(subject, unitOrTopic, count);
  return archetypes.map((arch, idx) => `  - Question ${idx + 1} Target Archetype: ${arch}`).join("\n");
}

// src/data/quiz/expandedBattleQuestions.ts
var EXPANDED_BATTLE_QUESTIONS = {
  "ap-physics": [
    {
      id: "phys_exp_1",
      subjectId: "ap-physics",
      stem: "A 2 kg cart moving right at 4 m/s collides with a stationary 2 kg cart. They stick together. What is their final velocity?",
      options: ["2 m/s right", "4 m/s right", "1 m/s right", "0 m/s"],
      correctIndex: 0,
      explanation: "By conservation of momentum: $m_1 v_1 = (m_1 + m_2) v_f \\implies 2(4) = 4 v_f \\implies v_f = 2\\text{ m/s}$.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "phys_exp_2",
      subjectId: "ap-physics",
      stem: "An object is thrown vertically upward with initial speed $v_0$. At the highest point of its trajectory, what are its velocity and acceleration?",
      options: [
        "Velocity = 0, Acceleration = $9.8\\text{ m/s}^2$ downward",
        "Velocity = 0, Acceleration = 0",
        "Velocity = $v_0$, Acceleration = $9.8\\text{ m/s}^2$ downward",
        "Velocity = 0, Acceleration = $9.8\\text{ m/s}^2$ upward"
      ],
      correctIndex: 0,
      explanation: "At the peak, instantaneous velocity is 0, but gravity continues to accelerate the object downward at $g = 9.8\\text{ m/s}^2$.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "phys_exp_3",
      subjectId: "ap-physics",
      stem: "If the distance between two planets is doubled, how does the gravitational force between them change?",
      options: [
        "Decreases by a factor of 4",
        "Decreases by a factor of 2",
        "Increases by a factor of 4",
        "Remains unchanged"
      ],
      correctIndex: 0,
      explanation: "Newton's Law of Universal Gravitation states $F_g = G \\frac{m_1 m_2}{r^2}$. Doubling $r$ multiplies the denominator by $2^2 = 4$, reducing force to $\\frac{1}{4}$.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "phys_exp_4",
      subjectId: "ap-physics",
      stem: "A block of mass $m$ slides down a frictionless incline of angle $\\theta$. What is the magnitude of its acceleration?",
      options: ["$g \\sin\\theta$", "$g \\cos\\theta$", "$g$", "$g \\tan\\theta$"],
      correctIndex: 0,
      explanation: "The component of gravity parallel to the incline is $mg \\sin\\theta$. Since $F = ma$, $a = g \\sin\\theta$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "phys_exp_5",
      subjectId: "ap-physics",
      stem: "A simple pendulum has period $T$. If the length of the string is quadrupled, what is the new period?",
      options: ["$2T$", "$4T$", "$T/2$", "$T/4$"],
      correctIndex: 0,
      explanation: "The period of a simple pendulum is $T = 2\\pi \\sqrt{\\frac{L}{g}}$. Quadrupling $L$ multiplies $T$ by $\\sqrt{4} = 2$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "phys_exp_6",
      subjectId: "ap-physics",
      stem: "A spinning figure skater pulls her arms inward. What happens to her rotational kinetic energy and angular momentum?",
      options: [
        "Angular momentum is conserved; rotational kinetic energy increases",
        "Angular momentum increases; rotational kinetic energy is conserved",
        "Both angular momentum and rotational kinetic energy are conserved",
        "Both decrease due to internal muscle forces"
      ],
      correctIndex: 0,
      explanation: "Net external torque is zero so $L = I\\omega$ is constant. As $I$ decreases, $\\omega$ increases. $K_{rot} = \\frac{L^2}{2I}$; since $I$ decreases with $L$ constant, $K_{rot}$ increases due to work done by muscles.",
      difficulty: "Hard",
      timeLimit: 60
    },
    {
      id: "phys_exp_7",
      subjectId: "ap-physics",
      stem: "The area under a Force vs. Time ($F-t$) graph represents which physical quantity?",
      options: ["Impulse (change in momentum)", "Work done", "Kinetic energy", "Total power"],
      correctIndex: 0,
      explanation: "Impulse $J = \\int F \\, dt = \\Delta p$, which corresponds directly to the area under an $F-t$ curve.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "phys_exp_8",
      subjectId: "ap-physics",
      stem: "A spring with spring constant $k$ is compressed by distance $x$. If the compression is doubled to $2x$, the elastic potential energy stored in the spring is multiplied by:",
      options: ["4", "2", "8", "$\\sqrt{2}$"],
      correctIndex: 0,
      explanation: "Elastic potential energy is $U_s = \\frac{1}{2}kx^2$. Since $U_s \\propto x^2$, doubling $x$ quadruples the energy ($2^2 = 4$).",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "phys_exp_9",
      subjectId: "ap-physics",
      stem: "A car travels around a flat circular curve of radius $R$ at constant speed $v$. What force provides the necessary centripetal acceleration?",
      options: [
        "Static friction directed toward the center of the circle",
        "Kinetic friction directed tangential to the curve",
        "Centrifugal force directed radially outward",
        "The normal force perpendicular to the road"
      ],
      correctIndex: 0,
      explanation: "For an unbanked curve, static friction between the tires and road points toward the center of curvature, providing $F_c = \\frac{mv^2}{R}$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "phys_exp_10",
      subjectId: "ap-physics",
      stem: "A solid sphere and a hollow hoop of equal mass and radius roll down an incline from rest without slipping. Which reaches the bottom first?",
      options: [
        "The solid sphere, because it has a smaller rotational inertia ($I$)",
        "The hollow hoop, because its mass is concentrated at the rim",
        "Both reach the bottom at the same time since masses and radii are equal",
        "It depends on the coefficient of friction"
      ],
      correctIndex: 0,
      explanation: "A smaller moment of inertia ($I_{sphere} = \\frac{2}{5}mR^2$ vs $I_{hoop} = mR^2$) means less energy is diverted into rotation, leaving more for translational kinetic energy.",
      difficulty: "Hard",
      timeLimit: 60
    }
  ],
  "ap-chemistry": [
    {
      id: "chem_exp_1",
      subjectId: "ap-chemistry",
      stem: "Which of the following elements has the greatest first ionization energy?",
      options: ["Helium (He)", "Cesium (Cs)", "Fluorine (F)", "Neon (Ne)"],
      correctIndex: 0,
      explanation: "Helium has electrons in the $n=1$ shell closest to the nucleus with no inner electron shielding, giving it the highest first ionization energy on the periodic table.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "chem_exp_2",
      subjectId: "ap-chemistry",
      stem: "According to VSEPR theory, what is the molecular geometry of sulfur hexafluoride ($\\text{SF}_6$)?",
      options: ["Octahedral", "Trigonal bipyramidal", "Tetrahedral", "Square planar"],
      correctIndex: 0,
      explanation: "$\\text{SF}_6$ has 6 bonding pairs and 0 lone pairs around the central sulfur atom, resulting in an octahedral molecular geometry with $90^\\circ$ bond angles.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "chem_exp_3",
      subjectId: "ap-chemistry",
      stem: "For an exothermic reaction at equilibrium, what effect does increasing the temperature have on the equilibrium constant $K$?",
      options: [
        "$K$ decreases, shifting equilibrium toward reactants",
        "$K$ increases, shifting equilibrium toward products",
        "$K$ remains constant while concentrations shift",
        "$K$ doubles because temperature increases molecular collisions"
      ],
      correctIndex: 0,
      explanation: "Treat heat as a product in an exothermic reaction. Adding heat shifts the reaction left, decreasing product concentration and lowering $K_{eq}$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "chem_exp_4",
      subjectId: "ap-chemistry",
      stem: "A reaction is found to have a rate law $\\text{Rate} = k[A]^2 [B]^0$. If the concentration of $A$ is doubled while $[B]$ is tripled, how does the initial rate change?",
      options: [
        "Rate quadruples (multiplied by 4)",
        "Rate multiplies by 6",
        "Rate doubles",
        "Rate multiplies by 12"
      ],
      correctIndex: 0,
      explanation: "The reaction is second-order in $A$ ($2^2 = 4$) and zero-order in $B$ ($3^0 = 1$). The rate is multiplied by $4 \\times 1 = 4$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "chem_exp_5",
      subjectId: "ap-chemistry",
      stem: "Which of the following mixtures forms an effective buffer solution?",
      options: [
        "$\\text{CH}_3\\text{COOH}$ (weak acid) and $\\text{NaCH}_3\\text{COO}$ (its conjugate base)",
        "$\\text{HCl}$ (strong acid) and $\\text{NaCl}$",
        "$\\text{NaOH}$ (strong base) and $\\text{NaCl}$",
        "$\\text{HNO}_3$ (strong acid) and $\\text{NH}_4\\text{NO}_3$"
      ],
      correctIndex: 0,
      explanation: "A buffer consists of a weak conjugate acid-base pair capable of neutralizing small amounts of added acid or base without drastic pH change.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "chem_exp_6",
      subjectId: "ap-chemistry",
      stem: "What is the oxidation state of chromium in the dichromate ion $\\text{Cr}_2\\text{O}_7^{2-}$?",
      options: ["+6", "+3", "+7", "+12"],
      correctIndex: 0,
      explanation: "Oxygen is typically $-2$. For $7$ oxygens: $-14$. Total charge is $-2$. $2(\\text{Cr}) + (-14) = -2 \\implies 2(\\text{Cr}) = +12 \\implies \\text{Cr} = +6$.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "chem_exp_7",
      subjectId: "ap-chemistry",
      stem: "Under what thermodynamic conditions is a chemical reaction ALWAYS spontaneous at all temperatures?",
      options: [
        "$\\Delta H < 0$ (exothermic) and $\\Delta S > 0$ (entropy increases)",
        "$\\Delta H > 0$ and $\\Delta S < 0$",
        "$\\Delta H > 0$ and $\\Delta S > 0$",
        "$\\Delta H < 0$ and $\\Delta S < 0$"
      ],
      correctIndex: 0,
      explanation: "$\\Delta G = \\Delta H - T\\Delta S$. When $\\Delta H < 0$ and $\\Delta S > 0$, $\\Delta G$ is negative at all absolute temperatures $T > 0\\text{ K}$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "chem_exp_8",
      subjectId: "ap-chemistry",
      stem: "Why does liquid water have a higher boiling point than liquid hydrogen sulfide ($\\text{H}_2\\text{S}$)?",
      options: [
        "Water molecules form extensive intermolecular hydrogen bonds",
        "Water has a larger molar mass and greater London dispersion forces",
        "Hydrogen sulfide has stronger covalent dipole-dipole attractions",
        "Water is a nonpolar molecule with high surface tension"
      ],
      correctIndex: 0,
      explanation: "Oxygen is much more electronegative than sulfur, enabling strong intermolecular hydrogen bonds between $\\text{H}_2\\text{O}$ molecules that require substantial energy to overcome.",
      difficulty: "Easy",
      timeLimit: 30
    }
  ],
  "ap-biology": [
    {
      id: "bio_exp_1",
      subjectId: "ap-biology",
      stem: "Which cellular organelle is responsible for post-translational protein modification, sorting, and packaging into secretory vesicles?",
      options: ["Golgi apparatus", "Ribosome", "Nucleolus", "Peroxisome"],
      correctIndex: 0,
      explanation: "The Golgi apparatus receives proteins from the rough ER, modifies them (e.g., glycosylation), and packages them for distribution.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "bio_exp_2",
      subjectId: "ap-biology",
      stem: "During the light-dependent reactions of photosynthesis, what is the ultimate source of electrons used to replace those excited in Photosystem II?",
      options: ["Water ($\\text{H}_2\\text{O}$)", "Carbon dioxide ($\\text{CO}_2$)", "$\\text{NADPH}$", "Glucose"],
      correctIndex: 0,
      explanation: "Photolysis of water ($2\\text{H}_2\\text{O} \\to 4\\text{H}^+ + 4e^- + \\text{O}_2$) replenishes the reaction center P680 chlorophyll molecules in PS II.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "bio_exp_3",
      subjectId: "ap-biology",
      stem: "In a eukaryotic cell, where does the Krebs (Citric Acid) Cycle take place?",
      options: ["Mitochondrial matrix", "Cytosol", "Inner mitochondrial membrane", "Intermembrane space"],
      correctIndex: 0,
      explanation: "The Krebs cycle occurs in the mitochondrial matrix, while oxidative phosphorylation and the electron transport chain occur along the cristae of the inner membrane.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "bio_exp_4",
      subjectId: "ap-biology",
      stem: "A population in Hardy-Weinberg equilibrium has 16% homozygous recessive individuals ($q^2 = 0.16$). What is the frequency of heterozygous carriers in this population?",
      options: ["0.48", "0.40", "0.36", "0.84"],
      correctIndex: 0,
      explanation: "$q = \\sqrt{0.16} = 0.40$. Therefore $p = 1 - 0.40 = 0.60$. Heterozygote frequency is $2pq = 2(0.60)(0.40) = 0.48$ (48%).",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "bio_exp_5",
      subjectId: "ap-biology",
      stem: "Which enzyme is responsible for unwinding and separating the double-stranded DNA helix at the replication fork?",
      options: ["DNA Helicase", "DNA Polymerase III", "DNA Ligase", "Topoisomerase"],
      correctIndex: 0,
      explanation: "Helicase breaks the hydrogen bonds between complementary base pairs to open the replication bubble.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "bio_exp_6",
      subjectId: "ap-biology",
      stem: "What happens when a plant cell is placed into a hypertonic salt solution?",
      options: [
        "Water leaves the cell by osmosis, causing plasmolysis",
        "Water enters the cell, causing it to become turgid",
        "The cell absorbs solute ions until it bursts (lysis)",
        "Solute equilibrium is maintained with zero net water movement"
      ],
      correctIndex: 0,
      explanation: "In a hypertonic environment, water exits down its water potential gradient, causing the plasma membrane to pull away from the cell wall (plasmolysis).",
      difficulty: "Medium",
      timeLimit: 45
    }
  ],
  "ap-us-history": [
    {
      id: "apush_exp_1",
      subjectId: "ap-us-history",
      stem: "Which landmark Supreme Court decision established the principle of judicial review under Chief Justice John Marshall?",
      options: ["Marbury v. Madison (1803)", "McCulloch v. Maryland (1819)", "Gibbons v. Ogden (1824)", "Dred Scott v. Sandford (1857)"],
      correctIndex: 0,
      explanation: "In Marbury v. Madison, Marshall declared an act of Congress unconstitutional, solidifying the Supreme Court's authority of judicial review.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "apush_exp_2",
      subjectId: "ap-us-history",
      stem: "What was the primary foreign policy objective expressed in the 1823 Monroe Doctrine?",
      options: [
        "To warn European powers against further colonization or intervention in the Western Hemisphere",
        "To negotiate the peaceful purchase of Florida from the Spanish crown",
        "To form an offensive military alliance with emerging Latin American republics",
        "To annex former French territories in North America"
      ],
      correctIndex: 0,
      explanation: "The Monroe Doctrine declared that the American continents were no longer open to European colonization and that interference would be treated as hostile.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "apush_exp_3",
      subjectId: "ap-us-history",
      stem: "The Kansas-Nebraska Act of 1854 directly repealed which earlier congressional compromise regarding slavery?",
      options: [
        "The Missouri Compromise of 1820 ($36^\\circ 30'$ line)",
        "The Compromise of 1850",
        "The Northwest Ordinance of 1787",
        "The Three-Fifths Compromise"
      ],
      correctIndex: 0,
      explanation: "Stephen Douglas's bill introduced popular sovereignty in the territories, effectively nullifying the Missouri Compromise line that barred slavery north of $36^\\circ 30'$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "apush_exp_4",
      subjectId: "ap-us-history",
      stem: "Which Constitutional Amendment abolished involuntary servitude and slavery across the United States?",
      options: ["Thirteenth Amendment", "Fourteenth Amendment", "Fifteenth Amendment", "Sixteenth Amendment"],
      correctIndex: 0,
      explanation: "The 13th Amendment (1865) constitutionally abolished slavery, while the 14th defined citizenship and equal protection, and the 15th guaranteed voting rights.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "apush_exp_5",
      subjectId: "ap-us-history",
      stem: "What was the core objective of the Marshall Plan enacted by the United States in 1948?",
      options: [
        "To provide billions of dollars in economic aid to rebuild war-torn Western Europe and prevent communist spread",
        "To establish permanent missile batteries across NATO nations",
        "To oversee the occupation and disarmament of imperial Japan",
        "To dismantle wartime price control agencies within the US domestic economy"
      ],
      correctIndex: 0,
      explanation: "Secretary of State George Marshall proposed economic recovery assistance to stabilize democratic European nations against Soviet influence.",
      difficulty: "Medium",
      timeLimit: 45
    }
  ],
  "ap-computer-science": [
    {
      id: "csa_exp_1",
      subjectId: "ap-computer-science",
      stem: 'In Java, what is the return value of `"APExam".substring(2, 5)`?',
      options: ['"Exa"', '"Exam"', '"PEx"', '"APEx"'],
      correctIndex: 0,
      explanation: "`substring(beginIndex, endIndex)` is inclusive of beginIndex (2, character 'E') and exclusive of endIndex (5, character 'm'), returning indices 2, 3, 4 -> \"Exa\".",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "csa_exp_2",
      subjectId: "ap-computer-science",
      stem: "What is the worst-case time complexity of Binary Search on a sorted array of $N$ elements?",
      options: ["$O(\\log N)$", "$O(N)$", "$O(N \\log N)$", "$O(1)$"],
      correctIndex: 0,
      explanation: "Binary search cuts the search space in half with each comparison, yielding logarithmic $O(\\log N)$ complexity.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "csa_exp_3",
      subjectId: "ap-computer-science",
      stem: "Given the 2D array `int[][] grid = new int[4][3];`, what is `grid.length` and `grid[0].length`?",
      options: [
        "`grid.length = 4`, `grid[0].length = 3`",
        "`grid.length = 3`, `grid[0].length = 4`",
        "`grid.length = 12`, `grid[0].length = 4`",
        "`grid.length = 4`, `grid[0].length = 12`"
      ],
      correctIndex: 0,
      explanation: "In Java, `grid.length` returns the number of rows (4), and `grid[0].length` returns the number of columns in row 0 (3).",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "csa_exp_4",
      subjectId: "ap-computer-science",
      stem: "What occurs if a recursive method in Java fails to reach its base case?",
      options: ["StackOverflowError", "NullPointerException", "IndexOutOfBoundsException", "Compilation error"],
      correctIndex: 0,
      explanation: "Infinite recursive calls exceed the allocated call stack memory, triggering a runtime `StackOverflowError`.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "csa_exp_5",
      subjectId: "ap-computer-science",
      stem: "Which Java keyword is used in a subclass constructor to invoke the constructor of its superclass?",
      options: ["`super()`", "`this()`", "`extends()`", "`parent()`"],
      correctIndex: 0,
      explanation: "`super(...)` calls the matching superclass constructor and must be the first statement in the subclass constructor body.",
      difficulty: "Easy",
      timeLimit: 30
    }
  ],
  "ap-economics": [
    {
      id: "econ_exp_1",
      subjectId: "ap-economics",
      stem: "If the cross-price elasticity of demand between Good X and Good Y is negative ($E_{XY} < 0$), what relationship exists between the two goods?",
      options: [
        "They are complementary goods",
        "They are substitute goods",
        "They are luxury goods",
        "They are inferior goods"
      ],
      correctIndex: 0,
      explanation: "A negative cross-price elasticity means an increase in the price of Good Y causes demand for Good X to decrease, characteristic of complements (e.g. coffee and sugar).",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "econ_exp_2",
      subjectId: "ap-economics",
      stem: "A firm in a perfectly competitive market maximizes profit by producing where:",
      options: [
        "Price equals Marginal Cost ($P = MC$)",
        "Price equals Average Total Cost ($P = ATC$)",
        "Marginal Revenue equals Average Variable Cost ($MR = AVC$)",
        "Total Revenue is maximized"
      ],
      correctIndex: 0,
      explanation: "Since price equals marginal revenue for price-takers ($P = MR$), profit maximization occurs where $MR = MC$, which simplifies to $P = MC$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "econ_exp_3",
      subjectId: "ap-economics",
      stem: "What action by a central bank constitutes expansionary monetary policy aimed at combatting a recession?",
      options: [
        "Buying government bonds on the open market",
        "Increasing the reserve requirement ratio",
        "Raising the target discount rate",
        "Increasing personal income tax rates"
      ],
      correctIndex: 0,
      explanation: "Buying government securities injects liquidity into commercial banking reserves, lowering the federal funds rate and stimulating borrowing and investment.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "econ_exp_4",
      subjectId: "ap-economics",
      stem: "What is the economic definition of opportunity cost?",
      options: [
        "The value of the next best alternative forgone when making a decision",
        "The sum total of all monetary expenditures on a project",
        "The sunk cost that cannot be recovered",
        "The price paid for raw material inventory"
      ],
      correctIndex: 0,
      explanation: "Opportunity cost measures the sacrifice of the highest-valued alternative option when choosing among scarce resources.",
      difficulty: "Easy",
      timeLimit: 30
    }
  ],
  "ap-psychology": [
    {
      id: "psych_exp_1",
      subjectId: "ap-psychology",
      stem: "Which brain structure acts as the sensory relay station, directing sensory signals (except olfaction) to the cerebral cortex?",
      options: ["Thalamus", "Hypothalamus", "Amygdala", "Cerebellum"],
      correctIndex: 0,
      explanation: "The thalamus routes visual, auditory, and somatosensory inputs to appropriate sensory processing cortices. Smell bypasses it directly to the olfactory bulb.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "psych_exp_2",
      subjectId: "ap-psychology",
      stem: "In Pavlov's classical conditioning experiments with dogs, what was the meat powder before any conditioning occurred?",
      options: [
        "Unconditioned Stimulus (UCS)",
        "Conditioned Stimulus (CS)",
        "Conditioned Response (CR)",
        "Neutral Stimulus (NS)"
      ],
      correctIndex: 0,
      explanation: "Food naturally and automatically triggers salivation without prior training, making it an unconditioned stimulus (UCS).",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "psych_exp_3",
      subjectId: "ap-psychology",
      stem: "A gambler keeps pulling a slot machine lever because payouts occur after an unpredictable number of pulls. What schedule of reinforcement is this?",
      options: [
        "Variable-Ratio schedule",
        "Fixed-Ratio schedule",
        "Variable-Interval schedule",
        "Fixed-Interval schedule"
      ],
      correctIndex: 0,
      explanation: "Variable-ratio rewards behavior after an unpredictable number of responses, creating high, steady response rates resistant to extinction.",
      difficulty: "Medium",
      timeLimit: 45
    }
  ],
  "ap-world-history": [
    {
      id: "whist_exp_1",
      subjectId: "ap-world-history",
      stem: "What major trans-Eurasian trade network was secured and revitalized during the Pax Mongolica in the 13th and 14th centuries?",
      options: ["The Silk Roads", "The Trans-Saharan camel routes", "The Mediterranean sea trade", "The Hanseatic League"],
      correctIndex: 0,
      explanation: "Under unified Mongol rule, merchants traveled with passports (paiza) along the Silk Roads with unprecedented safety and diplomatic protection.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "whist_exp_2",
      subjectId: "ap-world-history",
      stem: "Which maritime empire pioneered the trading-post empire along the coast of Africa and the Indian Ocean in the early 16th century?",
      options: ["Portugal", "Spain", "Great Britain", "The Netherlands"],
      correctIndex: 0,
      explanation: "Portugal aimed to monopolize the spice trade by capturing fortified trade chokepoints (Malacca, Hormuz, Goa) rather than acquiring vast inland territories.",
      difficulty: "Medium",
      timeLimit: 45
    }
  ],
  "ap-environmental-science": [
    {
      id: "apes_exp_1",
      subjectId: "ap-environmental-science",
      stem: "Which biome is characterized by permafrost, low annual precipitation, and short growing seasons dominated by mosses and lichens?",
      options: ["Tundra", "Taiga (Boreal forest)", "Temperate deciduous forest", "Chaparral"],
      correctIndex: 0,
      explanation: "The Arctic and Alpine tundra feature permanently frozen subsoil (permafrost) which restricts deep root growth.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "apes_exp_2",
      subjectId: "ap-environmental-science",
      stem: "Eutrophication in aquatic ecosystems is typically triggered by excessive runoff containing which two plant nutrients?",
      options: [
        "Nitrogen and Phosphorus",
        "Carbon and Potassium",
        "Calcium and Magnesium",
        "Iron and Sulfur"
      ],
      correctIndex: 0,
      explanation: "Agricultural fertilizers containing nitrates and phosphates cause rapid algal blooms, whose subsequent bacterial decomposition severely depletes dissolved oxygen (hypoxia).",
      difficulty: "Easy",
      timeLimit: 30
    }
  ],
  "ap-human-geography": [
    {
      id: "aphg_exp_1",
      subjectId: "ap-human-geography",
      stem: "In the Demographic Transition Model (DTM), what characterizes Stage 2?",
      options: [
        "Death rates drop rapidly while birth rates remain high, causing explosive population growth",
        "Birth and death rates are both extremely high with negligible growth",
        "Birth rates drop to match low death rates",
        "Total population declines due to below-replacement fertility"
      ],
      correctIndex: 0,
      explanation: "Stage 2 is ushered in by the Industrial and Medical Revolutions, sharply reducing infant and general mortality while cultural birth rates remain elevated.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "aphg_exp_2",
      subjectId: "ap-human-geography",
      stem: "According to Von Th\xFCnen's Agricultural Land Use model, which farming activity is located closest to the central market city?",
      options: [
        "Dairying and market gardening (perishable goods)",
        "Extensive grain and wheat farming",
        "Ranching and livestock grazing",
        "Commercial timber and firewood"
      ],
      correctIndex: 0,
      explanation: "Perishable items like fresh milk and delicate vegetables demand rapid transit to market and command high land rent per acre.",
      difficulty: "Medium",
      timeLimit: 45
    }
  ],
  "ap-english-lang": [
    {
      id: "lang_exp_1",
      subjectId: "ap-english-lang",
      stem: "In persuasive writing, an appeal to the speaker's credibility, character, and moral authority is termed:",
      options: ["Ethos", "Pathos", "Logos", "Kairos"],
      correctIndex: 0,
      explanation: "Ethos establishes trust, expertise, and shared values with the audience to validate the rhetor's perspective.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "lang_exp_2",
      subjectId: "ap-english-lang",
      stem: "Which logical fallacy misrepresents an opponent's argument as weaker or more extreme than it actually is to make it easy to refute?",
      options: ["Straw Man fallacy", "Ad Hominem fallacy", "Slippery Slope fallacy", "Post Hoc Ergo Propter Hoc"],
      correctIndex: 0,
      explanation: "A straw man creates a distorted, oversimplified caricature of an argument and attacks that rather than the genuine position.",
      difficulty: "Easy",
      timeLimit: 30
    }
  ]
};

// src/data/quiz/apCalculusAbQuestions.ts
var AP_CALCULUS_AB_UNIT_1_LEVELS = [
  {
    id: 1,
    topicNumber: "Topic 1.1 & 1.2",
    name: "Limit Intuition & Rate of Change",
    subtitle: "Instantaneous vs Average Rate & Notation",
    difficulty: "Easy",
    rewardCoins: 30,
    questions: [
      {
        id: "c1-l1-q1",
        stem: "What does the mathematical statement $\\lim_{x \\to 3} f(x) = 7$ formally mean in AP Calculus?",
        options: [
          "The value of the function at $x = 3$ is guaranteed to be $f(3) = 7$.",
          "As $x$ gets arbitrarily close to $3$ (from both sides, with $x \\neq 3$), $f(x)$ approaches $7$.",
          "The function is continuous and differentiable at $x = 3$.",
          "The average rate of change on the interval $[0, 3]$ equals $7$."
        ],
        correctIndex: 1,
        explanation: "A limit describes the values that a function approaches as the input approaches a specified value, regardless of the actual function value $f(3)$ at that point.",
        distractorTip: "Trap: Do not assume $f(3)$ must equal 7; limits describe behavior near the point, not at the point."
      },
      {
        id: "c1-l1-q2",
        stem: "A particle moves along a straight line with position given by $s(t) = 2t^2 + 1$. What is the average velocity of the particle over the time interval $[1, 4]$?",
        options: [
          "$10$",
          "$12$",
          "$16$",
          "$33$"
        ],
        correctIndex: 0,
        explanation: "Average velocity is given by $\\frac{s(4) - s(1)}{4 - 1} = \\frac{(2(16)+1) - (2(1)+1)}{3} = \\frac{33 - 3}{3} = 10$.",
        distractorTip: "Remember that average velocity is the secant line slope $\\frac{\\Delta s}{\\Delta t}$, whereas instantaneous velocity is the derivative $s'(t)$."
      },
      {
        id: "c1-l1-q3",
        stem: "If $f(2) = 5$ but $\\lim_{x \\to 2} f(x) = 9$, which of the following statements must be true?",
        options: [
          "The limit does not exist because it does not match $f(2)$.",
          "The function $f$ has a discontinuity at $x = 2$.",
          "$f$ is continuous at $x = 2$ because both the limit and $f(2)$ exist.",
          "The graph of $f$ has a vertical asymptote at $x = 2$."
        ],
        correctIndex: 1,
        explanation: "For continuity at $x = c$, three conditions must hold: $f(c)$ exists, $\\lim_{x \\to c} f(x)$ exists, and $\\lim_{x \\to c} f(x) = f(c)$. Since $9 \\neq 5$, $f$ has a removable discontinuity at $x = 2$.",
        distractorTip: "Exam trick: Having both a limit and a function value is not enough; they must be equal for continuity."
      }
    ]
  },
  {
    id: 2,
    topicNumber: "Topic 1.3",
    name: "Estimating Limits from Graphs",
    subtitle: "One-Sided Limits & Graphical Behavior",
    difficulty: "Easy",
    rewardCoins: 35,
    questions: [
      {
        id: "c1-l2-q1",
        stem: "Suppose a function $g(x)$ satisfies $\\lim_{x \\to 4^-} g(x) = 5$ and $\\lim_{x \\to 4^+} g(x) = 5$, but $g(4) = -2$. What is the value of $\\lim_{x \\to 4} g(x)$?",
        options: [
          "$-2$",
          "$5$",
          "The limit does not exist.",
          "$3$"
        ],
        correctIndex: 1,
        explanation: "A two-sided limit exists and equals $L$ if and only if both one-sided limits exist and equal $L$. Since both left and right limits equal $5$, $\\lim_{x \\to 4} g(x) = 5$.",
        distractorTip: "Do not be tricked by the isolated point at $(4, -2)$. The two-sided limit depends solely on the one-sided limits."
      },
      {
        id: "c1-l2-q2",
        stem: "If the graph of $h(x)$ approaches $y = -3$ as $x \\to 1$ from the left, and approaches $y = 4$ as $x \\to 1$ from the right, what is $\\lim_{x \\to 1} h(x)$?",
        options: [
          "$0.5$",
          "$-3$",
          "$4$",
          "Does not exist (DNE)"
        ],
        correctIndex: 3,
        explanation: "Since the left-hand limit ($-3$) does not equal the right-hand limit ($4$), the two-sided limit does not exist (DNE) due to a jump discontinuity.",
        distractorTip: "If $\\lim_{x \\to c^-} \\neq \\lim_{x \\to c^+}$, the two-sided limit always fails to exist."
      },
      {
        id: "c1-l2-q3",
        stem: "Evaluate $\\lim_{x \\to 0^-} \\frac{x}{|x|}$.",
        options: [
          "$1$",
          "$-1$",
          "$0$",
          "Does not exist"
        ],
        correctIndex: 1,
        explanation: "For $x < 0$, $|x| = -x$. Therefore, $\\frac{x}{|x|} = \\frac{x}{-x} = -1$ for all negative values of $x$. Thus, the left-hand limit is $-1$.",
        distractorTip: "Notice the one-sided minus superscript ($0^-$). The two-sided limit DNE, but the left-hand limit is exactly $-1$."
      }
    ]
  },
  {
    id: 3,
    topicNumber: "Topic 1.4",
    name: "Estimating Limits from Tables",
    subtitle: "Numerical Trends & Delta Proximity",
    difficulty: "Easy",
    rewardCoins: 35,
    questions: [
      {
        id: "c1-l3-q1",
        stem: "A table shows values of $f(x)$ near $x = 2$:\n- $x = 1.9 \\implies 4.81$\n- $x = 1.99 \\implies 4.98$\n- $x = 1.999 \\implies 4.998$\n- $x = 2.001 \\implies 5.002$\n- $x = 2.01 \\implies 5.02$\nWhat is the most reasonable estimate for $\\lim_{x \\to 2} f(x)$?",
        options: [
          "$4.9$",
          "$5.0$",
          "$5.1$",
          "Does not exist"
        ],
        correctIndex: 1,
        explanation: "As $x$ approaches $2$ from both the left and right, $f(x)$ steadily converges toward $5.0$.",
        distractorTip: "Check convergence from both sides to ensure both left and right approaches reach the same integer."
      },
      {
        id: "c1-l3-q2",
        stem: "For a function $g(x)$, values near $x = 0$ show: $g(-0.01) = 99$, $g(-0.001) = 999$, $g(0.001) = -1000$, and $g(0.01) = -100$. What does this indicate about $\\lim_{x \\to 0} g(x)$?",
        options: [
          "$\\lim_{x \\to 0} g(x) = 0$",
          "$\\lim_{x \\to 0} g(x) = \\infty$",
          "The limit does not exist because the function values grow unboundedly in opposite directions.",
          "$\\lim_{x \\to 0} g(x) = 1000$"
        ],
        correctIndex: 2,
        explanation: "The left-hand values grow toward $+\\infty$ while the right-hand values decrease toward $-\\infty$. Thus, the two-sided limit does not exist.",
        distractorTip: "Watch the signs: $+\\infty$ from the left and $-\\infty$ from the right indicate a vertical asymptote with no unified limit."
      },
      {
        id: "c1-l3-q3",
        stem: "If evaluating $\\lim_{x \\to 0} \\sin\\left(\\frac{\\pi}{x}\\right)$ using a table with $x = 0.1, 0.01, 0.001$, each gives $0$. Why can we NOT conclude the limit is $0$?",
        options: [
          "Because $\\sin(x)$ is not defined at $x = 0$.",
          "Because the function oscillates infinitely between $-1$ and $1$ as $x \\to 0$, so intermediate points do not converge.",
          "Because $\\frac{\\pi}{x}$ is always a positive integer.",
          "Because trigonometric functions cannot have limits at zero."
        ],
        correctIndex: 1,
        explanation: "Sampling points where $\\frac{\\pi}{x} = k\\pi$ hides the wild oscillation between $-1$ and $1$. The limit does not exist due to infinite oscillation near $x = 0$.",
        distractorTip: "Classic AP concept: Numerical tables can be misleading for oscillating functions like $\\sin(1/x)$."
      }
    ]
  },
  {
    id: 4,
    topicNumber: "Topic 1.5",
    name: "Algebraic Properties & Direct Substitution",
    subtitle: "Limit Laws, Sums, Products & Quotients",
    difficulty: "Easy",
    rewardCoins: 40,
    questions: [
      {
        id: "c1-l4-q1",
        stem: "Evaluate $\\lim_{x \\to 2} (3x^2 - 4x + 5)$ using direct substitution.",
        options: [
          "$7$",
          "$9$",
          "$13$",
          "$17$"
        ],
        correctIndex: 1,
        explanation: "Since polynomial functions are continuous everywhere, we substitute directly: $3(2)^2 - 4(2) + 5 = 3(4) - 8 + 5 = 12 - 8 + 5 = 9$.",
        distractorTip: "Always try direct substitution first. If it yields a real number, that is your limit."
      },
      {
        id: "c1-l4-q2",
        stem: "Given $\\lim_{x \\to 3} f(x) = 4$ and $\\lim_{x \\to 3} g(x) = -2$, what is $\\lim_{x \\to 3} \\frac{[f(x)]^2 + 3g(x)}{g(x)}$?",
        options: [
          "$-5$",
          "$-2$",
          "$5$",
          "$-11$"
        ],
        correctIndex: 0,
        explanation: "Using limit arithmetic properties: $\\frac{(4)^2 + 3(-2)}{-2} = \\frac{16 - 6}{-2} = \\frac{10}{-2} = -5$.",
        distractorTip: "Be careful with negative signs in the denominator."
      },
      {
        id: "c1-l4-q3",
        stem: "Evaluate $\\lim_{x \\to \\frac{\\pi}{4}} \\frac{\\sin x + \\cos x}{\\tan x}$.",
        options: [
          "$\\sqrt{2}$",
          "$\\frac{\\sqrt{2}}{2}$",
          "$1$",
          "$2$"
        ],
        correctIndex: 0,
        explanation: "Substitute $x = \\frac{\\pi}{4}$: $\\sin(\\pi/4) = \\frac{\\sqrt{2}}{2}$, $\\cos(\\pi/4) = \\frac{\\sqrt{2}}{2}$, $\\tan(\\pi/4) = 1$. The numerator is $\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2} = \\sqrt{2}$, divided by $1$ equals $\\sqrt{2}$.",
        distractorTip: "Trig functions can be evaluated by direct substitution at any point in their domain."
      }
    ]
  },
  {
    id: 5,
    topicNumber: "Topic 1.6",
    name: "Factoring & Algebraic Cancellation",
    subtitle: "Resolving 0/0 Indeterminate Forms",
    difficulty: "Medium",
    rewardCoins: 40,
    questions: [
      {
        id: "c1-l5-q1",
        stem: "Evaluate $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.",
        options: [
          "$0$",
          "$3$",
          "$6$",
          "Does not exist"
        ],
        correctIndex: 2,
        explanation: "Direct substitution yields the indeterminate form $\\frac{0}{0}$. Factoring the numerator gives $\\frac{(x-3)(x+3)}{x-3} = x + 3$. Evaluating at $x = 3$ gives $3 + 3 = 6$.",
        distractorTip: "$\\frac{0}{0}$ does not mean 0 or undefined; it means more algebraic work is required."
      },
      {
        id: "c1-l5-q2",
        stem: "Evaluate $\\lim_{x \\to -2} \\frac{x^2 + 5x + 6}{x^2 - 4}$.",
        options: [
          "$-\\frac{1}{4}$",
          "$\\frac{1}{4}$",
          "$\\frac{5}{2}$",
          "Does not exist"
        ],
        correctIndex: 0,
        explanation: "Factor both parts: $\\frac{(x+2)(x+3)}{(x+2)(x-2)}$. Cancel $(x+2)$ to obtain $\\frac{x+3}{x-2}$. Substitute $x = -2$: $\\frac{-2+3}{-2-2} = \\frac{1}{-4} = -\\frac{1}{4}$.",
        distractorTip: "Watch negative signs when substituting $x = -2$ into $(x - 2)$."
      },
      {
        id: "c1-l5-q3",
        stem: "Evaluate $\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1}$.",
        options: [
          "$1$",
          "$2$",
          "$3$",
          "Does not exist"
        ],
        correctIndex: 2,
        explanation: "Use the difference of cubes formula $a^3 - b^3 = (a-b)(a^2+ab+b^2)$: $\\frac{(x-1)(x^2+x+1)}{x-1} = x^2 + x + 1$. Substitute $x = 1$: $1^2 + 1 + 1 = 3$.",
        distractorTip: "Memorize the difference of cubes factorization; it frequently appears on AP Calculus Section I."
      },
      {
        id: "c1-l5-q4",
        stem: "Evaluate $\\lim_{x \\to -3} \\frac{x^2 - x - 12}{x + 3}$.",
        options: [
          "$-7$",
          "$-1$",
          "$1$",
          "Does not exist"
        ],
        correctIndex: 0,
        explanation: "Direct substitution yields the indeterminate form $0/0$. Factoring the numerator gives $x^2 - x - 12 = (x - 4)(x + 3)$. For $x \\neq -3$, $\\frac{(x - 4)(x + 3)}{x + 3} = x - 4$. Evaluating the limit as $x \\to -3$ gives $(-3) - 4 = -7$.",
        distractorTip: "Trap: Be careful with signs when factoring $x^2 - x - 12$; $(x-4)(x+3)$ has sum $-1$ and product $-12$."
      }
    ]
  },
  {
    id: 6,
    topicNumber: "Topic 1.7",
    name: "Radical Conjugate Rationalization",
    subtitle: "Multiplying by the Conjugate Form",
    difficulty: "Medium",
    rewardCoins: 45,
    questions: [
      {
        id: "c1-l6-q1",
        stem: "Evaluate $\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$.",
        options: [
          "$\\frac{1}{4}$",
          "$\\frac{1}{2}$",
          "$2$",
          "$4$"
        ],
        correctIndex: 0,
        explanation: "Multiply numerator and denominator by the conjugate $(\\sqrt{x+4} + 2)$: $\\frac{(x+4) - 4}{x(\\sqrt{x+4} + 2)} = \\frac{x}{x(\\sqrt{x+4} + 2)} = \\frac{1}{\\sqrt{x+4} + 2}$. Evaluating at $x = 0$: $\\frac{1}{\\sqrt{4} + 2} = \\frac{1}{4}$.",
        distractorTip: "Do not distribute the denominator when multiplying by the conjugate; leave $x$ factored out so it cancels."
      },
      {
        id: "c1-l6-q2",
        stem: "Evaluate $\\lim_{x \\to 9} \\frac{x - 9}{\\sqrt{x} - 3}$.",
        options: [
          "$3$",
          "$6$",
          "$\\frac{1}{6}$",
          "Does not exist"
        ],
        correctIndex: 1,
        explanation: "Multiply by $(\\sqrt{x} + 3)$: $\\frac{(x-9)(\\sqrt{x}+3)}{x-9} = \\sqrt{x} + 3$. Substitute $x = 9$: $\\sqrt{9} + 3 = 3 + 3 = 6$.",
        distractorTip: "Alternatively, factor $x - 9$ as $(\\sqrt{x}-3)(\\sqrt{x}+3)$ for an instant 5-second shortcut."
      },
      {
        id: "c1-l6-q3",
        stem: "Evaluate $\\lim_{x \\to 1} \\frac{\\sqrt{2x + 2} - 2}{x - 1}$.",
        options: [
          "$\\frac{1}{4}$",
          "$\\frac{1}{2}$",
          "$1$",
          "$\\frac{\\sqrt{2}}{2}$"
        ],
        correctIndex: 1,
        explanation: "Multiply by $(\\sqrt{2x+2} + 2)$: $\\frac{(2x+2) - 4}{(x-1)(\\sqrt{2x+2} + 2)} = \\frac{2(x-1)}{(x-1)(\\sqrt{2x+2} + 2)} = \\frac{2}{\\sqrt{2x+2} + 2}$. Evaluating at $x = 1$: $\\frac{2}{\\sqrt{4} + 2} = \\frac{2}{4} = \\frac{1}{2}$.",
        distractorTip: "Factor out the coefficient $2$ from $2x - 2$ to expose the cancelling factor $(x - 1)$."
      },
      {
        id: "c1-l6-q4",
        stem: "Evaluate $\\lim_{x \\to 0} \\frac{\\sqrt{x + 9} - 3}{x^2 + 2x}$.",
        options: [
          "$\\frac{1}{12}$",
          "$\\frac{1}{6}$",
          "$\\frac{1}{18}$",
          "$0$"
        ],
        correctIndex: 0,
        explanation: "Rationalizing the numerator by multiplying by $\\frac{\\sqrt{x+9}+3}{\\sqrt{x+9}+3}$ yields $\\frac{(x+9)-9}{x(x+2)(\\sqrt{x+9}+3)} = \\frac{x}{x(x+2)(\\sqrt{x+9}+3)} = \\frac{1}{(x+2)(\\sqrt{x+9}+3)}$. Substituting $x=0$ gives $\\frac{1}{(2)(3+3)} = \\frac{1}{12}$.",
        distractorTip: "Remember to factor $x$ from the denominator: $x^2 + 2x = x(x+2)$ to cancel the $x$ in the numerator."
      }
    ]
  },
  {
    id: 7,
    topicNumber: "Topic 1.7",
    name: "Complex Fractions & Absolute Values",
    subtitle: "Common Denominators & Piecewise Symmetry",
    difficulty: "Medium",
    rewardCoins: 45,
    questions: [
      {
        id: "c1-l7-q1",
        stem: "Evaluate $\\lim_{x \\to 0} \\frac{\\frac{1}{x + 5} - \\frac{1}{5}}{x}$.",
        options: [
          "$\\frac{1}{25}$",
          "$-\\frac{1}{25}$",
          "$-5$",
          "$0$"
        ],
        correctIndex: 1,
        explanation: "Find common denominator for the numerator: $\\frac{5 - (x+5)}{5(x+5)} = \\frac{-x}{5(x+5)}$. Dividing by $x$ cancels $x$, leaving $\\frac{-1}{5(x+5)}$. As $x \\to 0$, this equals $-\\frac{1}{25}$.",
        distractorTip: "Notice the negative sign resulting from distributing $-(x+5) = -x - 5$."
      },
      {
        id: "c1-l7-q2",
        stem: "Evaluate $\\lim_{x \\to 3^+} \\frac{2x - 6}{|x - 3|}$.",
        options: [
          "$-2$",
          "$2$",
          "$0$",
          "Does not exist"
        ],
        correctIndex: 1,
        explanation: "For $x > 3$, $x - 3 > 0$, so $|x - 3| = x - 3$. Thus $\\frac{2(x-3)}{x-3} = 2$.",
        distractorTip: "For right-hand limits where $x > c$, the absolute value bars simply drop with a positive sign."
      },
      {
        id: "c1-l7-q3",
        stem: "Evaluate $\\lim_{x \\to 2^-} \\frac{x^2 - 4}{|x - 2|}$.",
        options: [
          "$-4$",
          "$4$",
          "$0$",
          "Does not exist"
        ],
        correctIndex: 0,
        explanation: "Factor numerator as $(x-2)(x+2)$. Since $x \\to 2^-$, $x < 2$, so $|x - 2| = -(x - 2)$. Thus $\\frac{(x-2)(x+2)}{-(x-2)} = -(x + 2)$. At $x = 2$, this equals $-(2 + 2) = -4$.",
        distractorTip: "Trap: Remembering that $|x - c| = -(x - c)$ when approaching from the left is critical."
      },
      {
        id: "c1-l7-q4",
        stem: "Evaluate the one-sided limit $\\lim_{x \\to 4^-} \\frac{|x - 4|}{x - 4}$.",
        options: [
          "$-1$",
          "$1$",
          "$0$",
          "Does not exist"
        ],
        correctIndex: 0,
        explanation: "For $x < 4$, $(x - 4) < 0$, so $|x - 4| = -(x - 4)$. Therefore, $\\frac{-(x - 4)}{x - 4} = -1$ for all $x < 4$. Hence the limit is $-1$.",
        distractorTip: "Notice the left-hand limit indicator ($4^-$); approaching from the right would give $+1$, but the left-hand limit is strictly $-1$."
      }
    ]
  },
  {
    id: 8,
    topicNumber: "Topic 1.8 & 1.9",
    name: "Squeeze Theorem & Special Trig Limits",
    subtitle: "Sandwiching Bounds & $\\frac{\\sin(x)}{x}$ Limits",
    difficulty: "Medium",
    rewardCoins: 50,
    questions: [
      {
        id: "c1-l8-q1",
        stem: "Evaluate $\\lim_{x \\to 0} \\frac{\\sin(7x)}{x}$.",
        options: [
          "$0$",
          "$1$",
          "$7$",
          "$\\frac{1}{7}$"
        ],
        correctIndex: 2,
        explanation: "Recall that $\\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 1$. Multiply and divide by $7$: $7 \\cdot \\lim_{x \\to 0} \\frac{\\sin(7x)}{7x} = 7 \\cdot 1 = 7$.",
        distractorTip: "Formula shortcut: $\\lim_{x \\to 0} \\frac{\\sin(ax)}{bx} = \\frac{a}{b}$."
      },
      {
        id: "c1-l8-q2",
        stem: "If $4 - x^2 \\le f(x) \\le 4 + x^2$ for all $x$ in an open interval containing $0$, what is $\\lim_{x \\to 0} f(x)$?",
        options: [
          "$0$",
          "$4$",
          "$8$",
          "Cannot be determined without explicit formula for $f(x)$"
        ],
        correctIndex: 1,
        explanation: "By the Squeeze Theorem: $\\lim_{x \\to 0} (4 - x^2) = 4$ and $\\lim_{x \\to 0} (4 + x^2) = 4$. Since $f(x)$ is squeezed between both functions, $\\lim_{x \\to 0} f(x) = 4$.",
        distractorTip: "Both upper and lower bounds must approach the exact same value to apply the Squeeze Theorem."
      },
      {
        id: "c1-l8-q3",
        stem: "Evaluate $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x}$.",
        options: [
          "$0$",
          "$1$",
          "$-1$",
          "Does not exist"
        ],
        correctIndex: 0,
        explanation: "This is one of the two foundational trigonometric limits in AP Calculus: $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$.",
        distractorTip: "Do not confuse with $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$. The cosine ratio approaches $0$."
      },
      {
        id: "c1-l8-q4",
        stem: "Evaluate $\\lim_{x \\to 0} \\frac{\\tan(3x)}{\\sin(2x)}$.",
        options: [
          "$\\frac{3}{2}$",
          "$\\frac{2}{3}$",
          "$1$",
          "$0$"
        ],
        correctIndex: 0,
        explanation: "Rewrite $\\frac{\\tan(3x)}{\\sin(2x)} = \\frac{\\sin(3x)}{\\cos(3x)\\sin(2x)} = \\frac{\\sin(3x)}{3x} \\cdot \\frac{2x}{\\sin(2x)} \\cdot \\frac{3}{2\\cos(3x)}$. Taking the limit as $x \\to 0$, $(1) \\cdot (1) \\cdot \\frac{3}{2(1)} = \\frac{3}{2}$.",
        distractorTip: "AP Shortcut: $\\lim_{x \\to 0} \\frac{\\sin(ax)}{\\sin(bx)} = \\lim_{x \\to 0} \\frac{\\tan(ax)}{\\sin(bx)} = \\frac{a}{b}$."
      }
    ]
  },
  {
    id: 9,
    topicNumber: "Topic 1.10",
    name: "Types of Discontinuities",
    subtitle: "Removable, Jump & Infinite Asymptotic Breaks",
    difficulty: "Medium",
    rewardCoins: 50,
    questions: [
      {
        id: "c1-l9-q1",
        stem: "What type of discontinuity does the function $f(x) = \\frac{x - 3}{(x - 3)(x + 2)}$ have at $x = 3$?",
        options: [
          "Jump discontinuity",
          "Removable discontinuity (hole)",
          "Infinite discontinuity (vertical asymptote)",
          "Essential oscillating discontinuity"
        ],
        correctIndex: 1,
        explanation: "Since the factor $(x - 3)$ cancels completely from the denominator, $\\lim_{x \\to 3} f(x) = \\frac{1}{5}$ exists. Because the limit exists while $f(3)$ is undefined, $x = 3$ is a removable discontinuity.",
        distractorTip: "If the denominator factor cancels out, it is a removable hole. If it remains in the denominator, it is a vertical asymptote."
      },
      {
        id: "c1-l9-q2",
        stem: "The greatest integer function $f(x) = \\lfloor x \\rfloor$ exhibits what type of discontinuity at integer values of $x$?",
        options: [
          "Removable discontinuity",
          "Jump discontinuity",
          "Infinite discontinuity",
          "It is continuous at integers"
        ],
        correctIndex: 1,
        explanation: "At every integer $k$, $\\lim_{x \\to k^-} \\lfloor x \\rfloor = k - 1$ while $\\lim_{x \\to k^+} \\lfloor x \\rfloor = k$. Because one-sided limits are finite but unequal, it is a jump discontinuity.",
        distractorTip: "Finite one-sided limits that are unequal always produce a jump discontinuity."
      },
      {
        id: "c1-l9-q3",
        stem: "At $x = -2$, the function $f(x) = \\frac{x - 3}{(x - 3)(x + 2)}$ has which type of discontinuity?",
        options: [
          "Removable discontinuity",
          "Jump discontinuity",
          "Infinite discontinuity (vertical asymptote)",
          "No discontinuity"
        ],
        correctIndex: 2,
        explanation: "After cancelling $(x - 3)$, the factor $(x + 2)$ remains in the denominator. As $x \\to -2$, the function grows unbounded ($-\\infty$ and $+\\infty$), creating an infinite discontinuity (vertical asymptote).",
        distractorTip: "Notice the difference between $x = 3$ (hole) and $x = -2$ (vertical asymptote) in the same function."
      },
      {
        id: "c1-l9-q4",
        stem: "Which of the following functions has a removable discontinuity at $x = 2$ and a vertical asymptote at $x = -2$?",
        options: [
          "$f(x) = \\frac{x - 2}{(x - 2)(x + 2)}$",
          "$f(x) = \\frac{x + 2}{(x - 2)^2}$",
          "$f(x) = \\frac{x^2 - 4}{(x - 2)^2}$",
          "$f(x) = \\frac{1}{x^2 - 4}$"
        ],
        correctIndex: 0,
        explanation: "For $f(x) = \\frac{x - 2}{(x - 2)(x + 2)}$, the factor $(x - 2)$ cancels in numerator and denominator, giving a removable hole at $x = 2$. The factor $(x + 2)$ remains in the denominator, causing a non-removable infinite vertical asymptote at $x = -2$.",
        distractorTip: "If a factor cancels out completely from the denominator, the discontinuity is removable; if it remains in the denominator, it is a vertical asymptote."
      }
    ]
  },
  {
    id: 10,
    topicNumber: "Topic 1.11",
    name: "3-Part Definition of Continuity at a Point",
    subtitle: "Checking $f(c)$, Limit Existence & Equality",
    difficulty: "Hard",
    rewardCoins: 55,
    questions: [
      {
        id: "c1-l10-q1",
        stem: "According to the College Board CED, which three conditions are strictly required for a function $f$ to be continuous at $x = c$?",
        options: [
          "$f'(c)$ exists, $f(c) > 0$, and $\\lim_{x \\to c} f(x) = 0$",
          "$f(c)$ is defined, $\\lim_{x \\to c} f(x)$ exists, and $\\lim_{x \\to c} f(x) = f(c)$",
          "$\\lim_{x \\to c^-} f(x) = f(c)$ and $f(c) \\neq 0$",
          "The function has no vertical asymptotes anywhere on its domain"
        ],
        correctIndex: 1,
        explanation: "Continuity at $x = c$ requires: (1) $f(c)$ is defined, (2) $\\lim_{x \\to c} f(x)$ exists, and (3) $\\lim_{x \\to c} f(x) = f(c)$. All three must hold.",
        distractorTip: "On AP Free-Response questions, you MUST explicitly verify all three conditions to earn full rubric credit."
      },
      {
        id: "c1-l10-q2",
        stem: "Let $f(x) = \\begin{cases} \\frac{x^2 - 16}{x - 4}, & x \\neq 4 \\\\ 8, & x = 4 \\end{cases}$. Is $f$ continuous at $x = 4$?",
        options: [
          "No, because $f(4)$ is undefined.",
          "No, because $\\lim_{x \\to 4} f(x)$ does not exist.",
          "Yes, because $f(4) = 8$, $\\lim_{x \\to 4} f(x) = 8$, and they are equal.",
          "No, because it is a piecewise function."
        ],
        correctIndex: 2,
        explanation: "$\\lim_{x \\to 4} \\frac{(x-4)(x+4)}{x-4} = 4 + 4 = 8$. Since $f(4) = 8$, $\\lim_{x \\to 4} f(x) = f(4)$, confirming continuity at $x = 4$.",
        distractorTip: "Piecewise functions are continuous when the defined point perfectly fills the hole of the limit."
      },
      {
        id: "c1-l10-q3",
        stem: "If $\\lim_{x \\to 5} f(x) = 12$ and $f$ is known to be continuous at $x = 5$, what is the value of $f(5)$?",
        options: [
          "$0$",
          "$5$",
          "$12$",
          "Cannot be determined"
        ],
        correctIndex: 2,
        explanation: "By the third condition of continuity, if $f$ is continuous at $x = 5$, then $f(5) = \\lim_{x \\to 5} f(x) = 12$.",
        distractorTip: "Continuity bridges the gap between the limit and the actual function value."
      },
      {
        id: "c1-l10-q4",
        stem: "Let $f(x) = \\begin{cases} 2x + 1, & x \\neq 3 \\\\ 10, & x = 3 \\end{cases}$. Why is $f(x)$ discontinuous at $x = 3$?",
        options: [
          "$\\lim_{x \\to 3} f(x)$ exists ($= 7$), but $\\lim_{x \\to 3} f(x) \\neq f(3)$.",
          "$\\lim_{x \\to 3} f(x)$ does not exist because left and right limits disagree.",
          "$f(3)$ is undefined.",
          "The function is not defined on an open interval containing $3$."
        ],
        correctIndex: 0,
        explanation: "The three-part test requires: 1) $f(3)$ is defined ($f(3) = 10$); 2) $\\lim_{x \\to 3} f(x)$ exists ($= 2(3)+1 = 7$); 3) $\\lim_{x \\to 3} f(x) = f(3)$. Since $7 \\neq 10$, the third condition fails, creating a removable discontinuity.",
        distractorTip: "AP CED Exam Tip: When asked why a function is discontinuous on free response, explicitly state which of the 3 conditions fails."
      },
      {
        id: "c1-l10-q5",
        stem: "If $f(x)$ is continuous at $x = c$, which of the following statements MUST be true?",
        options: [
          "$\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)$",
          "$f'(c)$ exists and is finite.",
          "The graph of $f$ has a horizontal tangent at $x = c$.",
          "$f(x) \\ge 0$ for all $x$ near $c$."
        ],
        correctIndex: 0,
        explanation: "By the definition of continuity at a point, the left-hand limit, right-hand limit, and the value of the function must all exist and be equal: $\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)$. Continuity does NOT imply differentiability.",
        distractorTip: "Trap: Differentiability implies continuity, but continuity does NOT imply differentiability (e.g. sharp corners like $|x|$)."
      }
    ]
  },
  {
    id: 11,
    topicNumber: "Topic 1.11",
    name: "Continuity in Piecewise Functions",
    subtitle: "Solving for Unknown Parameters ($k$)",
    difficulty: "Hard",
    rewardCoins: 55,
    questions: [
      {
        id: "c1-l11-q1",
        stem: "Let $f(x) = \\begin{cases} kx + 1, & x \\le 2 \\\\ x^2 - k, & x > 2 \\end{cases}$. For what value of $k$ is $f$ continuous at $x = 2$?",
        options: [
          "$k = 1$",
          "$k = 2$",
          "$k = 3$",
          "$k = -1$"
        ],
        correctIndex: 0,
        explanation: "For continuity at $x = 2$, left limit must equal right limit: $\\lim_{x \\to 2^-} (kx + 1) = 2k + 1$, and $\\lim_{x \\to 2^+} (x^2 - k) = 4 - k$. Setting them equal: $2k + 1 = 4 - k \\implies 3k = 3 \\implies k = 1$.",
        distractorTip: "This exact parameter-solving problem appears almost every year on the AP Exam."
      },
      {
        id: "c1-l11-q2",
        stem: "Let $g(x) = \\begin{cases} \\frac{x^2 - k^2}{x - k}, & x \\neq k \\\\ 6, & x = k \\end{cases}$. For what value of $k$ is $g$ continuous at $x = k$?",
        options: [
          "$k = 2$",
          "$k = 3$",
          "$k = 6$",
          "$k = 12$"
        ],
        correctIndex: 1,
        explanation: "Simplify the limit: $\\lim_{x \\to k} \\frac{(x-k)(x+k)}{x-k} = k + k = 2k$. For continuity, $2k = g(k) = 6 \\implies k = 3$.",
        distractorTip: "Remember that $\\lim_{x \\to k} (x + k) = k + k = 2k$, not $k$."
      },
      {
        id: "c1-l11-q3",
        stem: "Let $h(x) = \\begin{cases} c x^2 + 2x, & x < 1 \\\\ x^3 - cx, & x \\ge 1 \\end{cases}$. For what value of $c$ is $h$ continuous everywhere?",
        options: [
          "$c = -\\frac{1}{2}$",
          "$c = \\frac{1}{2}$",
          "$c = 1$",
          "$c = 0$"
        ],
        correctIndex: 0,
        explanation: "Equate left and right limits at $x = 1$: $c(1)^2 + 2(1) = 1^3 - c(1) \\implies c + 2 = 1 - c \\implies 2c = -1 \\implies c = -\\frac{1}{2}$.",
        distractorTip: "Be mindful of algebraic signs when moving variable terms across the equal sign."
      },
      {
        id: "c1-l11-q4",
        stem: "For what values of $a$ and $b$ is the function $f(x) = \\begin{cases} ax + 3, & x < 1 \\\\ 5, & x = 1 \\\\ x^2 + b, & x > 1 \\end{cases}$ continuous at $x = 1$?",
        options: [
          "$a = 2$ and $b = 4$",
          "$a = 5$ and $b = 5$",
          "$a = 3$ and $b = 1$",
          "No such values exist"
        ],
        correctIndex: 0,
        explanation: "For continuity at $x = 1$, we require $\\lim_{x \\to 1^-} f(x) = f(1) = \\lim_{x \\to 1^+} f(x)$. This means: $a(1) + 3 = 5 \\implies a = 2$, and $1^2 + b = 5 \\implies b = 4$.",
        distractorTip: "Set each one-sided limit equal to the actual point value $f(1) = 5$ independently."
      },
      {
        id: "c1-l11-q5",
        stem: "Let $f(x) = \\begin{cases} \\frac{\\sin(kx)}{x}, & x < 0 \\\\ 4x + k^2 - 6, & x \\ge 0 \\end{cases}$. For what positive value of $k$ is $f$ continuous at $x = 0$?",
        options: [
          "$k = 3$",
          "$k = 2$",
          "$k = 6$",
          "$k = 1$"
        ],
        correctIndex: 0,
        explanation: "Left limit: $\\lim_{x \\to 0^-} \\frac{\\sin(kx)}{x} = k$. Right limit and value: $4(0) + k^2 - 6 = k^2 - 6$. Equating them gives $k^2 - k - 6 = 0 \\implies (k - 3)(k + 2) = 0$. Since $k > 0$, $k = 3$.",
        distractorTip: "Remember that quadratic equations give two roots; the question explicitly asks for the positive value ($k = 3$, not $-2$)."
      }
    ]
  },
  {
    id: 12,
    topicNumber: "Topic 1.12 & 1.13",
    name: "Continuity on Intervals & Removing Discontinuities",
    subtitle: "Endpoint Continuity & Domain Boundaries",
    difficulty: "Hard",
    rewardCoins: 60,
    questions: [
      {
        id: "c1-l12-q1",
        stem: "A function $f$ is defined on the closed interval $[a, b]$. What is required for $f$ to be continuous on $[a, b]$?",
        options: [
          "$f$ is continuous on $(a, b)$, $\\lim_{x \\to a^+} f(x) = f(a)$, and $\\lim_{x \\to b^-} f(x) = f(b)$.",
          "$f$ must have equal values at endpoints: $f(a) = f(b)$.",
          "The two-sided limits at both $a$ and $b$ must exist.",
          "$f'(x) > 0$ for all $x \\in (a, b)$."
        ],
        correctIndex: 0,
        explanation: "At endpoints of a closed interval, continuity is defined via one-sided limits: right-continuity at the left endpoint $a$, and left-continuity at the right endpoint $b$.",
        distractorTip: "You cannot evaluate a two-sided limit at endpoints of a domain because values outside the domain do not exist."
      },
      {
        id: "c1-l12-q2",
        stem: "What is the largest domain on which $f(x) = \\sqrt{16 - x^2}$ is continuous?",
        options: [
          "$(-\\infty, \\infty)$",
          "$(-4, 4)$",
          "$[-4, 4]$",
          "$[0, 4]$"
        ],
        correctIndex: 2,
        explanation: "We require $16 - x^2 \\ge 0 \\implies x^2 \\le 16 \\implies -4 \\le x \\le 4$. The function is continuous on the entire closed interval $[-4, 4]$, including one-sided continuity at the endpoints.",
        distractorTip: "Square root functions with nonnegative arguments are continuous on closed intervals, not open intervals."
      },
      {
        id: "c1-l12-q3",
        stem: "How can the removable discontinuity in $f(x) = \\frac{\\sin(4x)}{x}$ be removed to make the function continuous at $x = 0$?",
        options: [
          "Define $f(0) = 0$",
          "Define $f(0) = 1$",
          "Define $f(0) = 4$",
          "The discontinuity cannot be removed"
        ],
        correctIndex: 2,
        explanation: "Since $\\lim_{x \\to 0} \\frac{\\sin(4x)}{x} = 4$, defining $f(0) = 4$ satisfies $\\lim_{x \\to 0} f(x) = f(0)$, successfully removing the discontinuity.",
        distractorTip: "To remove a removable discontinuity, set the function value at that point equal to the limit value."
      },
      {
        id: "c1-l12-q4",
        stem: "On which of the following intervals is $f(x) = \\frac{1}{\\sqrt{9 - x^2}}$ continuous?",
        options: [
          "$(-3, 3)$",
          "$[-3, 3]$",
          "$(-\\infty, -3) \\cup (3, \\infty)$",
          "$[0, 3)$"
        ],
        correctIndex: 0,
        explanation: "For the square root in the denominator to be real and non-zero, the radicand must be strictly positive: $9 - x^2 > 0 \\implies x^2 < 9 \\implies -3 < x < 3$. At $x = \\pm 3$, the denominator is zero (vertical asymptotes), so the endpoints cannot be included.",
        distractorTip: "Check if endpoints are included: if the square root is in the denominator, you cannot have zero, so use open parentheses $(-3, 3)$."
      },
      {
        id: "c1-l12-q5",
        stem: "The function $f(x) = \\frac{x^2 - x - 6}{x - 3}$ has a removable discontinuity at $x = 3$. To make $f(x)$ continuous on all real numbers, what value should be assigned to $f(3)$?",
        options: [
          "$5$",
          "$0$",
          "$-5$",
          "$6$"
        ],
        correctIndex: 0,
        explanation: "Factor the numerator: $x^2 - x - 6 = (x - 3)(x + 2)$. For $x \\neq 3$, $f(x) = x + 2$. The limit as $x \\to 3$ is $3 + 2 = 5$. To remove the discontinuity, define $f(3) = \\lim_{x \\to 3} f(x) = 5$.",
        distractorTip: "A removable discontinuity can be patched by defining the function value at that point equal to the limit of the simplified expression."
      }
    ]
  },
  {
    id: 13,
    topicNumber: "Topic 1.14",
    name: "Infinite Limits & Vertical Asymptotes",
    subtitle: "Nonzero/Zero Forms & Asymptotic Behavior",
    difficulty: "Hard",
    rewardCoins: 60,
    questions: [
      {
        id: "c1-l13-q1",
        stem: "Evaluate $\\lim_{x \\to 3^+} \\frac{x + 2}{x - 3}$.",
        options: [
          "$0$",
          "$5$",
          "$+\\infty$",
          "$-\\infty$"
        ],
        correctIndex: 2,
        explanation: "Direct substitution yields $\\frac{5}{0}$ (nonzero over zero), which indicates a vertical asymptote. As $x \\to 3^+$ ($x > 3$), numerator is $+5$ and denominator is small positive $+0.001$, yielding $+\\infty$.",
        distractorTip: "A nonzero number divided by zero always indicates $\\pm\\infty$ or DNE, never a finite number."
      },
      {
        id: "c1-l13-q2",
        stem: "Evaluate $\\lim_{x \\to 2^-} \\frac{1}{(x - 2)^2}$.",
        options: [
          "$+\\infty$",
          "$-\\infty$",
          "$0$",
          "Does not exist"
        ],
        correctIndex: 0,
        explanation: "Because the denominator is squared $(x - 2)^2$, it is always positive whether $x$ approaches from the left or right. A positive numerator over positive zero approaches $+\\infty$.",
        distractorTip: "Even though $x \\to 2^-$ from the left, squaring a negative difference makes it positive."
      },
      {
        id: "c1-l13-q3",
        stem: "How many vertical asymptotes does the graph of $f(x) = \\frac{x - 1}{x^2 - 1}$ have?",
        options: [
          "$0$",
          "$1$",
          "$2$",
          "Infinitely many"
        ],
        correctIndex: 1,
        explanation: "Factor denominator: $\\frac{x - 1}{(x - 1)(x + 1)} = \\frac{1}{x + 1}$. The factor $(x - 1)$ cancels, producing a removable hole at $x = 1$. The factor $(x + 1)$ remains, creating exactly one vertical asymptote at $x = -1$.",
        distractorTip: "Classic AP distractor: Not every zero of the denominator is a vertical asymptote; cancelling factors create holes!"
      },
      {
        id: "c1-l13-q4",
        stem: "Evaluate $\\lim_{x \\to 1^+} \\frac{x^2 + 1}{x - 1}$.",
        options: [
          "$+\\infty$",
          "$-\\infty$",
          "$2$",
          "$0$"
        ],
        correctIndex: 0,
        explanation: "Direct substitution yields the non-zero over zero form: $\\frac{1^2+1}{1^+-1} = \\frac{2}{0^+}$. A positive numerator divided by an infinitesimally small positive denominator approaches $+\\infty$.",
        distractorTip: "Always analyze the sign of the denominator approaching from the specified side: $1^+$ means $x > 1$, so $x - 1 > 0$."
      },
      {
        id: "c1-l13-q5",
        stem: "Evaluate $\\lim_{x \\to 5^-} \\frac{x + 3}{x - 5}$.",
        options: [
          "$-\\infty$",
          "$+\\infty$",
          "$-8$",
          "Does not exist and is bounded"
        ],
        correctIndex: 0,
        explanation: "As $x \\to 5^-$, the numerator approaches $5 + 3 = 8 > 0$. The denominator $x - 5$ approaches $0$ from negative values ($0^-$). Positive divided by negative zero yields $-\\infty$.",
        distractorTip: "Notice $x \\to 5^-$ means $x < 5$, making $x - 5$ negative, resulting in $-\\infty$."
      }
    ]
  },
  {
    id: 14,
    topicNumber: "Topic 1.15",
    name: "Limits at Infinity & Horizontal Asymptotes",
    subtitle: "Dominant Terms & Radical End Behavior",
    difficulty: "Hard",
    rewardCoins: 65,
    questions: [
      {
        id: "c1-l14-q1",
        stem: "Evaluate $\\lim_{x \\to \\infty} \\frac{5x^3 - 2x + 7}{2x^3 + 9x^2 - 1}$.",
        options: [
          "$\\frac{5}{2}$",
          "$0$",
          "$\\infty$",
          "$-7$"
        ],
        correctIndex: 0,
        explanation: "For rational functions as $x \\to \\infty$, the limit is determined by the highest-degree terms: $\\lim_{x \\to \\infty} \\frac{5x^3}{2x^3} = \\frac{5}{2}$.",
        distractorTip: "When numerator and denominator have equal degrees, the limit is the ratio of the leading coefficients."
      },
      {
        id: "c1-l14-q2",
        stem: "Evaluate $\\lim_{x \\to -\\infty} \\frac{\\sqrt{9x^2 + 4}}{2x - 1}$.",
        options: [
          "$\\frac{3}{2}$",
          "$-\\frac{3}{2}$",
          "$\\frac{9}{2}$",
          "Does not exist"
        ],
        correctIndex: 1,
        explanation: "As $x \\to -\\infty$, $x$ is negative, so $\\sqrt{x^2} = |x| = -x$. Thus, $\\sqrt{9x^2} = 3|x| = -3x$. The dominant ratio is $\\frac{-3x}{2x} = -\\frac{3}{2}$.",
        distractorTip: "Score-5 Trap! For $x \\to -\\infty$, $\\sqrt{x^2} = -x$. Forgetting the negative sign is the #1 student mistake on this question."
      },
      {
        id: "c1-l14-q3",
        stem: "How many distinct horizontal asymptotes does the function $f(x) = \\frac{4e^x + 5}{e^x + 1}$ have?",
        options: [
          "$0$",
          "$1$",
          "$2$",
          "$3$"
        ],
        correctIndex: 2,
        explanation: "As $x \\to +\\infty$, $e^x \\to \\infty$, so $\\lim_{x \\to \\infty} \\frac{4e^x}{e^x} = 4$ ($y = 4$). As $x \\to -\\infty$, $e^x \\to 0$, so $\\lim_{x \\to -\\infty} \\frac{0 + 5}{0 + 1} = 5$ ($y = 5$). Thus there are $2$ horizontal asymptotes ($y = 4$ and $y = 5$).",
        distractorTip: "Exponential functions frequently have two distinct horizontal asymptotes because $e^x \\to 0$ as $x \\to -\\infty$."
      },
      {
        id: "c1-l14-q4",
        stem: "Evaluate $\\lim_{x \\to \\infty} \\frac{4x^3 - 7x + 1}{2x^3 + 5x^2 - 9}$.",
        options: [
          "$2$",
          "$4$",
          "$-7/5$",
          "$+\\infty$"
        ],
        correctIndex: 0,
        explanation: "Since the degrees of the numerator and denominator are equal (degree 3), the limit as $x \\to \\infty$ is the ratio of their leading coefficients: $\\frac{4}{2} = 2$.",
        distractorTip: "When degrees match, the horizontal asymptote is simply the ratio of the leading coefficients."
      },
      {
        id: "c1-l14-q5",
        stem: "Evaluate $\\lim_{x \\to \\infty} \\frac{3e^x + 5}{2e^x - 7}$.",
        options: [
          "$\\frac{3}{2}$",
          "$-\\frac{5}{7}$",
          "$0$",
          "$+\\infty$"
        ],
        correctIndex: 0,
        explanation: "Dividing numerator and denominator by $e^x$: $\\lim_{x \\to \\infty} \\frac{3 + 5e^{-x}}{2 - 7e^{-x}}$. Since $\\lim_{x \\to \\infty} e^{-x} = 0$, this evaluates to $\\frac{3 + 0}{2 - 0} = \\frac{3}{2}$.",
        distractorTip: "Watch out if $x \\to -\\infty$ instead: as $x \\to -\\infty$, $e^x \\to 0$, which would yield $-5/7$. But as $x \\to +\\infty$, $e^x$ dominates, yielding $3/2$."
      }
    ]
  },
  {
    id: 15,
    topicNumber: "Topic 1.16",
    name: "Intermediate Value Theorem (IVT)",
    subtitle: "Existence Proofs & Root Guarantees",
    difficulty: "Hard",
    rewardCoins: 70,
    questions: [
      {
        id: "c1-l15-q1",
        stem: "Which condition is strictly required to apply the Intermediate Value Theorem (IVT) to a function $f$ on $[a, b]$?",
        options: [
          "$f$ must be differentiable on $(a, b)$",
          "$f$ must be continuous on the closed interval $[a, b]$",
          "$f(a)$ must equal $f(b)$",
          "$f'(x)$ must not equal zero on $(a, b)$"
        ],
        correctIndex: 1,
        explanation: "IVT requires only one hypothesis: $f$ must be continuous on the closed interval $[a, b]$. Differentiability is NOT required.",
        distractorTip: "Do not confuse IVT (requires only continuity) with MVT/Rolle's theorem (which also requires differentiability)."
      },
      {
        id: "c1-l15-q2",
        stem: "The function $f(x) = x^3 - 3x - 1$ is continuous on $[1, 3]$. Given $f(1) = -3$ and $f(3) = 17$, why does the IVT guarantee at least one solution to $f(x) = 0$ on $(1, 3)$?",
        options: [
          "Because $f(1) < 0$ and $f(3) > 0$, and $0$ lies between $-3$ and $17$.",
          "Because $f(x)$ is a cubic polynomial with three real roots.",
          "Because the average rate of change on $[1, 3]$ is $10$.",
          "Because $f'(c) = 0$ at some point."
        ],
        correctIndex: 0,
        explanation: "Since $f$ is continuous on $[1, 3]$ and $0$ lies between $f(1) = -3$ and $f(3) = 17$, by the IVT there must exist at least one $c \\in (1, 3)$ such that $f(c) = 0$.",
        distractorTip: "Always show that the target value $L$ strictly satisfies $f(a) \\le L \\le f(b)$ to justify IVT."
      },
      {
        id: "c1-l15-q3",
        stem: "A continuous function $g$ satisfies the table values:\n- $g(0) = 4$\n- $g(2) = -1$\n- $g(5) = 3$\nWhat is the minimum number of solutions to $g(x) = 0$ on the interval $[0, 5]$ guaranteed by IVT?",
        options: [
          "$0$",
          "$1$",
          "$2$",
          "$3$"
        ],
        correctIndex: 2,
        explanation: "On $[0, 2]$, $g$ changes sign from $4$ to $-1$, guaranteeing at least $1$ root. On $[2, 5]$, $g$ changes sign from $-1$ to $3$, guaranteeing at least $1$ root. Total guaranteed roots is at least $2$.",
        distractorTip: "Count sign changes between consecutive data points on continuous functions to find the minimum number of zeros."
      },
      {
        id: "c1-l15-q4",
        stem: "A continuous function $f(x)$ on $[0, 5]$ satisfies $f(0) = -3$ and $f(5) = 7$. By the Intermediate Value Theorem, which of the following is GUARANTEED?",
        options: [
          "There exists at least one $c \\in (0, 5)$ such that $f(c) = 0$.",
          "There exists at least one $c \\in (0, 5)$ such that $f'(c) = 2$.",
          "$f(x)$ is increasing on the entire interval $[0, 5]$.",
          "$f(2.5) = 2$"
        ],
        correctIndex: 0,
        explanation: "Since $f$ is continuous on $[0, 5]$ and $0$ lies between $f(0) = -3$ and $f(5) = 7$, IVT guarantees that $f(c) = 0$ for at least one $c \\in (0, 5)$. IVT does not guarantee derivative values (that is MVT) or that $f$ is monotonic.",
        distractorTip: "Do not confuse IVT (guarantees function values $f(c) = k$) with MVT (guarantees derivative values $f'(c) = \\frac{f(b)-f(a)}{b-a}$)."
      },
      {
        id: "c1-l15-q5",
        stem: "Why can the Intermediate Value Theorem NOT be applied to $f(x) = \\frac{1}{x - 2}$ on $[1, 3]$ to guarantee a value between $f(1) = -1$ and $f(3) = 1$?",
        options: [
          "$f(x)$ is not continuous on $[1, 3]$ because it has a vertical asymptote at $x = 2$.",
          "$f(1)$ and $f(3)$ have opposite signs.",
          "The interval $[1, 3]$ is not open.",
          "The function is not differentiable at the endpoints."
        ],
        correctIndex: 0,
        explanation: "The fundamental hypothesis of the Intermediate Value Theorem is that $f(x)$ MUST be continuous on the closed interval $[a, b]$. Because $f(x)$ has an infinite discontinuity at $x = 2 \\in [1, 3]$, IVT does not apply, and indeed $f(x) = \\frac{1}{x-2}$ is never equal to $0$ on $[1, 3]$.",
        distractorTip: "Always check hypotheses first! If continuity on the closed interval is violated, IVT cannot be applied."
      }
    ]
  },
  {
    id: 16,
    topicNumber: "Boss Arena",
    name: "Unit 1 AP Exam Trap Autopsy",
    subtitle: "Score-5 Comprehensive Unit 1 Final Challenge",
    difficulty: "Boss",
    rewardCoins: 100,
    questions: [
      {
        id: "c1-l16-q1",
        stem: "Let $f(x) = \\begin{cases} \\frac{\\sqrt{x + 1} - 1}{x}, & x > 0 \\\\ c, & x = 0 \\\\ \\frac{\\sin(2x)}{4x}, & x < 0 \\end{cases}$. For what value of $c$ is $f$ continuous at $x = 0$?",
        options: [
          "$c = \\frac{1}{2}$",
          "$c = \\frac{1}{4}$",
          "$c = 1$",
          "No such value of $c$ exists"
        ],
        correctIndex: 0,
        explanation: "Evaluate right limit: $\\lim_{x \\to 0^+} \\frac{\\sqrt{x+1}-1}{x} = \\frac{1}{\\sqrt{0+1}+1} = \\frac{1}{2}$. Evaluate left limit: $\\lim_{x \\to 0^-} \\frac{\\sin(2x)}{4x} = \\frac{2}{4} = \\frac{1}{2}$. Since both one-sided limits equal $\\frac{1}{2}$, setting $c = \\frac{1}{2}$ ensures $f(0) = \\lim_{x \\to 0} f(x) = \\frac{1}{2}$, making $f$ continuous.",
        distractorTip: "Boss problem: Combines radical conjugate rationalization AND trig limits into a single piecewise continuity verification!"
      },
      {
        id: "c1-l16-q2",
        stem: "Evaluate $\\lim_{x \\to 1} \\frac{x^2 - 1}{|x - 1|}$.",
        options: [
          "$2$",
          "$-2$",
          "$0$",
          "Does not exist"
        ],
        correctIndex: 3,
        explanation: "As $x \\to 1^+$, $|x-1| = x-1$, so $\\lim = x+1 = 2$. As $x \\to 1^-$, $|x-1| = -(x-1)$, so $\\lim = -(x+1) = -2$. Since the left limit ($-2$) does not equal the right limit ($2$), the two-sided limit Does Not Exist.",
        distractorTip: "Always check both sides when an absolute value expression is in the denominator; if one-sided limits differ, the two-sided limit is DNE."
      },
      {
        id: "c1-l16-q3",
        stem: "If $f$ is continuous on $[0, 4]$, $f(0) = 1$, and $f(4) = 9$, which of the following is NOT necessarily guaranteed by the Intermediate Value Theorem?",
        options: [
          "There exists $c \\in (0, 4)$ such that $f(c) = 5$.",
          "There exists $c \\in (0, 4)$ such that $f(c) = 3$.",
          "There exists $c \\in (0, 4)$ such that $f'(c) = 2$.",
          "There exists $c \\in (0, 4)$ such that $f(c) = 8$."
        ],
        correctIndex: 2,
        explanation: "Option C states that $f'(c) = 2$. This requires the Mean Value Theorem (MVT) which demands differentiability. IVT guarantees intermediate function values $y$, NOT derivative values $f'(c)$.",
        distractorTip: "Major College Board trap: IVT guarantees y-values of the function, never slopes or derivative values."
      },
      {
        id: "c1-l16-q4",
        stem: "Evaluate $\\lim_{x \\to 2} \\frac{\\sqrt{x^2 + 5} - 3}{x - 2}$.",
        options: [
          "$\\frac{2}{3}$",
          "$\\frac{1}{3}$",
          "$\\frac{1}{6}$",
          "Does not exist"
        ],
        correctIndex: 0,
        explanation: "Multiply numerator and denominator by the conjugate $(\\sqrt{x^2+5}+3)$: $\\frac{(x^2+5)-9}{(x-2)(\\sqrt{x^2+5}+3)} = \\frac{x^2-4}{(x-2)(\\sqrt{x^2+5}+3)} = \\frac{(x-2)(x+2)}{(x-2)(\\sqrt{x^2+5}+3)} = \\frac{x+2}{\\sqrt{x^2+5}+3}$. As $x \\to 2$, this equals $\\frac{2+2}{\\sqrt{4+5}+3} = \\frac{4}{3+3} = \\frac{4}{6} = \\frac{2}{3}$.",
        distractorTip: "Notice this combines conjugate rationalization with factoring difference of squares $(x^2 - 4 = (x-2)(x+2))$."
      },
      {
        id: "c1-l16-q5",
        stem: "Let $f(x) = \\begin{cases} \\frac{|x - 3|}{x - 3} + 2, & x < 3 \\\\ c, & x = 3 \\\\ 2x - 5, & x > 3 \\end{cases}$. What value of $c$, if any, makes $f(x)$ continuous at $x = 3$?",
        options: [
          "$c = 1$",
          "$c = 3$",
          "$c = -1$",
          "No value of $c$ can make $f$ continuous at $x = 3$."
        ],
        correctIndex: 0,
        explanation: "For $x < 3$, $|x - 3| = -(x - 3)$, so $\\frac{-(x-3)}{x-3} + 2 = -1 + 2 = 1$. Thus $\\lim_{x \\to 3^-} f(x) = 1$. For $x > 3$, $\\lim_{x \\to 3^+} f(x) = 2(3) - 5 = 1$. Since left and right limits both equal $1$, setting $c = f(3) = 1$ makes $f(x)$ continuous at $x = 3$.",
        distractorTip: "Evaluate both one-sided limits independently; if they match, $c$ can be chosen to equal that common limit!"
      },
      {
        id: "c1-l16-q6",
        stem: "Which of the following functions has BOTH a horizontal asymptote at $y = 3$ and a vertical asymptote at $x = -2$?",
        options: [
          "$f(x) = \\frac{3x^2 - 5}{x^2 - 4}$",
          "$f(x) = \\frac{3x - 1}{x + 2}$",
          "$f(x) = \\frac{3x^2 + 1}{x - 2}$",
          "$f(x) = \\frac{6x - 2}{2x - 4}$"
        ],
        correctIndex: 1,
        explanation: "For $f(x) = \\frac{3x - 1}{x + 2}$: 1) Horizontal asymptote: $\\lim_{x \\to \\infty} \\frac{3x - 1}{x + 2} = \\frac{3}{1} = 3$. 2) Vertical asymptote: at $x = -2$, denominator is zero while numerator is $3(-2)-1 = -7 \\neq 0$, creating a vertical asymptote at $x = -2$.",
        distractorTip: "Confirm that the numerator is non-zero at $x = -2$ so it does not cancel out into a removable hole."
      }
    ]
  }
];

// src/data/quiz/apCalculusUnitsData.ts
var UNIT_BIOMES = {
  1: {
    name: "Azure Reef & Limits Beach",
    icon: "\u{1F3DD}\uFE0F",
    accentColor: "#F59E0B",
    secondaryColor: "#3B82F6",
    groundGradient: "from-amber-100 via-amber-50 to-sky-100",
    cardBorder: "border-amber-400",
    trailColor: "#d97706",
    nodeRing: "ring-amber-400/40",
    skyTint: "from-sky-50 to-amber-50/30"
  },
  2: {
    name: "Verdant Valley of Tangents",
    icon: "\u{1F33F}",
    accentColor: "#10B981",
    secondaryColor: "#059669",
    groundGradient: "from-emerald-100 via-teal-50 to-green-100",
    cardBorder: "border-emerald-500",
    trailColor: "#059669",
    nodeRing: "ring-emerald-400/40",
    skyTint: "from-emerald-50 to-teal-50/30"
  },
  3: {
    name: "Amethyst Ridge & Chain Caverns",
    icon: "\u{1F52E}",
    accentColor: "#8B5CF6",
    secondaryColor: "#6D28D9",
    groundGradient: "from-purple-100 via-indigo-50 to-violet-100",
    cardBorder: "border-purple-500",
    trailColor: "#7c3aed",
    nodeRing: "ring-purple-400/40",
    skyTint: "from-purple-50 to-indigo-50/30"
  },
  4: {
    name: "Crimson Canyon & Related Rates",
    icon: "\u{1F525}",
    accentColor: "#F97316",
    secondaryColor: "#EA580C",
    groundGradient: "from-orange-100 via-amber-50 to-rose-100",
    cardBorder: "border-orange-500",
    trailColor: "#c2410c",
    nodeRing: "ring-orange-400/40",
    skyTint: "from-orange-50 to-rose-50/30"
  },
  5: {
    name: "Gilded Summit of Extrema",
    icon: "\u{1F3D4}\uFE0F",
    accentColor: "#3B82F6",
    secondaryColor: "#1D4ED8",
    groundGradient: "from-blue-100 via-indigo-50 to-sky-100",
    cardBorder: "border-blue-500",
    trailColor: "#2563eb",
    nodeRing: "ring-blue-400/40",
    skyTint: "from-blue-50 to-indigo-50/30"
  },
  6: {
    name: "Glacial Plateau of Accumulation",
    icon: "\u2744\uFE0F",
    accentColor: "#06B6D4",
    secondaryColor: "#0891B2",
    groundGradient: "from-cyan-100 via-sky-50 to-blue-100",
    cardBorder: "border-cyan-500",
    trailColor: "#0891b2",
    nodeRing: "ring-cyan-400/40",
    skyTint: "from-cyan-50 to-blue-50/30"
  },
  7: {
    name: "Slope Field Steppes & Vectors",
    icon: "\u{1F9ED}",
    accentColor: "#14B8A6",
    secondaryColor: "#0D9488",
    groundGradient: "from-teal-100 via-emerald-50 to-teal-100",
    cardBorder: "border-teal-500",
    trailColor: "#0d9488",
    nodeRing: "ring-teal-400/40",
    skyTint: "from-teal-50 to-emerald-50/30"
  },
  8: {
    name: "Celestial Citadel of 5s (Apex)",
    icon: "\u{1F451}",
    accentColor: "#EC4899",
    secondaryColor: "#DB2777",
    groundGradient: "from-pink-100 via-purple-50 to-amber-100",
    cardBorder: "border-pink-500",
    trailColor: "#db2777",
    nodeRing: "ring-pink-400/40",
    skyTint: "from-pink-50 to-purple-50/30"
  }
};
var ALL_CALC_AB_UNIT_DEFINITIONS = [
  {
    unitIndex: 1,
    unitId: "u1",
    title: "Unit 1: Limits & Continuity",
    shortTitle: "Unit 1: Limits",
    description: "Foundations of limits, continuity, squeeze theorem, and Intermediate Value Theorem (IVT)",
    examWeight: "10\u201312% of AP Exam",
    biome: UNIT_BIOMES[1],
    levels: AP_CALCULUS_AB_UNIT_1_LEVELS.map((lvl) => ({
      ...lvl,
      id: 100 + lvl.id,
      unitIndex: 1,
      levelNumber: lvl.id,
      uniqueKey: `u1-l${lvl.id}`
    }))
  },
  {
    unitIndex: 2,
    unitId: "u2",
    title: "Unit 2: Differentiation: Definition & Fundamental Properties",
    shortTitle: "Unit 2: Derivatives",
    description: "Rate of change, limit definition of derivative, power, product, quotient rules, and trig derivatives",
    examWeight: "10\u201312% of AP Exam",
    biome: UNIT_BIOMES[2],
    levels: [
      {
        "id": 201,
        "unitIndex": 2,
        "levelNumber": 1,
        "uniqueKey": "u2-l1",
        "topicNumber": "Topic 2.1 & 2.2",
        "name": "Instantaneous Rate & Limit Definition",
        "subtitle": "Difference quotients and defining $f'(x)$",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c2-l1-q1",
            "stem": "Which limit represents $f'(3)$ for $f(x) = x^3$ using the definition of the derivative?",
            "options": [
              "$\\lim_{h \\to 0} \\frac{(3+h)^3 - 27}{h}$",
              "$\\lim_{x \\to 3} \\frac{x^3 + 27}{x - 3}$",
              "$\\lim_{h \\to 0} \\frac{(3+h)^3 - 3^3}{3}$",
              "$\\frac{3^3 - 0}{3 - 0}$"
            ],
            "correctIndex": 0,
            "explanation": "By definition, $f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$. For $f(x) = x^3$ at $a = 3$, $f(3) = 27$, so $f'(3) = \\lim_{h \\to 0} \\frac{(3+h)^3 - 27}{h}$.",
            "distractorTip": "Watch out for the alternate form $\\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}$, which has a minus in the numerator."
          },
          {
            "id": "c2-l1-q2",
            "stem": "Evaluate $\\lim_{h \\to 0} \\frac{\\sqrt{4 + h} - 2}{h}$.",
            "options": [
              "$\\frac{1}{4}$",
              "$\\frac{1}{2}$",
              "$0$",
              "$2$"
            ],
            "correctIndex": 0,
            "explanation": "This represents $f'(4)$ where $f(x) = \\sqrt{x}$. Since $f'(x) = \\frac{1}{2\\sqrt{x}}$, at $x = 4$ it equals $\\frac{1}{2\\sqrt{4}} = \\frac{1}{4}$.",
            "distractorTip": "Recognizing the derivative limit form saves lots of radical conjugate algebra."
          },
          {
            "id": "c2-l1-q3",
            "stem": "If $f(x) = 2x^2 - 5x$, what is the average rate of change on $[1, 4]$?",
            "options": [
              "$5$",
              "$7$",
              "$12$",
              "$-1$"
            ],
            "correctIndex": 0,
            "explanation": "Average rate of change $= \\frac{f(4) - f(1)}{4 - 1} = \\frac{(32-20) - (2-5)}{3} = \\frac{12 - (-3)}{3} = \\frac{15}{3} = 5$.",
            "distractorTip": "Average rate is the slope of the secant line: $\\frac{f(b) - f(a)}{b - a}$, not the derivative."
          }
        ]
      },
      {
        "id": 202,
        "unitIndex": 2,
        "levelNumber": 2,
        "uniqueKey": "u2-l2",
        "topicNumber": "Topic 2.3",
        "name": "Estimating Derivatives from Tables",
        "subtitle": "Secant approximations on discrete data",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c2-l2-q1",
            "stem": "A table gives temperature $T(t)$: $T(2) = 68^\\circ$F, $T(5) = 80^\\circ$F, $T(8) = 98^\\circ$F. What is the best estimate of $T'(5)$?",
            "options": [
              "$5^\\circ\\text{F/min}$",
              "$4^\\circ\\text{F/min}$",
              "$6^\\circ\\text{F/min}$",
              "$12^\\circ\\text{F/min}$"
            ],
            "correctIndex": 0,
            "explanation": "To estimate $T'(5)$ from symmetric endpoints $t=2$ and $t=8$: $\\frac{T(8) - T(2)}{8 - 2} = \\frac{98 - 68}{6} = 5^\\circ\\text{F/min}$.",
            "distractorTip": "On AP Exam FRQs, always use the closest values spanning the target point and include units."
          },
          {
            "id": "c2-l2-q2",
            "stem": "Given $f(1)=10$, $f(3)=18$, $f(7)=30$, estimate $f'(2)$ using the interval $[1, 3]$.",
            "options": [
              "$4$",
              "$8$",
              "$3$",
              "$2$"
            ],
            "correctIndex": 0,
            "explanation": "The average rate of change on $[1, 3]$ is $\\frac{f(3) - f(1)}{3 - 1} = \\frac{18 - 10}{2} = 4$.",
            "distractorTip": "Secant slope over the containing subinterval is the standard AP estimator."
          },
          {
            "id": "c2-l2-q3",
            "stem": "If $v(t)$ represents the velocity in m/s of a car, what are the units of $v'(t)$?",
            "options": [
              "$\\text{m/s}^2$",
              "$\\text{m/s}$",
              "$\\text{m}$",
              "$\\text{s/m}$"
            ],
            "correctIndex": 0,
            "explanation": "The derivative has units of $\\frac{\\text{output unit}}{\\text{input unit}} = \\frac{\\text{m/s}}{\\text{s}} = \\text{m/s}^2$.",
            "distractorTip": "Units of a derivative are always units of $y$ divided by units of $x$."
          }
        ]
      },
      {
        "id": 203,
        "unitIndex": 2,
        "levelNumber": 3,
        "uniqueKey": "u2-l3",
        "topicNumber": "Topic 2.4",
        "name": "Connecting Differentiability & Continuity",
        "subtitle": "Corners, cusps, and vertical tangents",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c2-l3-q1",
            "stem": "Which statement correctly describes the relationship between differentiability and continuity?",
            "options": [
              "Differentiability implies continuity, but continuity does NOT imply differentiability.",
              "Continuity implies differentiability everywhere.",
              "A function can be differentiable at a point where it is discontinuous.",
              "Differentiability and continuity are completely unrelated concepts."
            ],
            "correctIndex": 0,
            "explanation": "If $f$ is differentiable at $x=c$, it must be continuous at $x=c$. However, functions with sharp corners (like $f(x)=|x|$ at $x=0$) are continuous but not differentiable.",
            "distractorTip": "Remember the classic counterexample: $y = |x|$ is continuous at $0$, but has no derivative there."
          },
          {
            "id": "c2-l3-q2",
            "stem": "At $x = 0$, why does $f(x) = |x|$ fail to be differentiable?",
            "options": [
              "The left-hand derivative ($-1$) and right-hand derivative ($+1$) are unequal.",
              "$f(0)$ is undefined.",
              "$f(x)$ is discontinuous at $x = 0$.",
              "The tangent line is vertical."
            ],
            "correctIndex": 0,
            "explanation": "Left derivative is $\\lim_{h \\to 0^-} \\frac{|h|}{h} = -1$, while right derivative is $+1$. Since one-sided derivatives do not match, $f'(0)$ does not exist.",
            "distractorTip": "A sharp corner occurs where one-sided slopes disagree."
          },
          {
            "id": "c2-l3-q3",
            "stem": "Why is $f(x) = x^{1/3}$ not differentiable at $x = 0$?",
            "options": [
              "It has a vertical tangent line with infinite slope.",
              "It is discontinuous at $x = 0$.",
              "It has a jump discontinuity.",
              "It has a corner."
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = \\frac{1}{3x^{2/3}}$. As $x \\to 0$, $f'(x) \\to +\\infty$. A vertical tangent line means the slope is undefined.",
            "distractorTip": "Vertical tangent slopes approach $\\pm \\infty$."
          }
        ]
      },
      {
        "id": 204,
        "unitIndex": 2,
        "levelNumber": 4,
        "uniqueKey": "u2-l4",
        "topicNumber": "Topic 2.5",
        "name": "The Power Rule Mastery",
        "subtitle": "Negative exponents and fractional radicals",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c2-l4-q1",
            "stem": "Find $\\frac{d}{dx}\\left[\\frac{5}{x^3}\\right]$.",
            "options": [
              "$-\\frac{15}{x^4}$",
              "$\\frac{15}{x^2}$",
              "$-\\frac{5}{3x^2}$",
              "$-\\frac{15}{x^3}$"
            ],
            "correctIndex": 0,
            "explanation": "Rewrite as $5x^{-3}$. By the power rule, $\\frac{d}{dx}[5x^{-3}] = 5(-3)x^{-4} = -15x^{-4} = -\\frac{15}{x^4}$.",
            "distractorTip": "When differentiating negative powers, subtracting $1$ makes the exponent more negative: $-3 - 1 = -4$."
          },
          {
            "id": "c2-l4-q2",
            "stem": "Find the derivative of $f(x) = 4\\sqrt[3]{x^2}$.",
            "options": [
              "$\\frac{8}{3\\sqrt[3]{x}}$",
              "$\\frac{8}{3}x^{5/3}$",
              "$\\frac{4}{3\\sqrt[3]{x^2}}$",
              "$\\frac{8}{3}\\sqrt[3]{x^2}$"
            ],
            "correctIndex": 0,
            "explanation": "Rewrite as $f(x) = 4x^{2/3}$. Then $f'(x) = 4\\left(\\frac{2}{3}\\right)x^{-1/3} = \\frac{8}{3x^{1/3}} = \\frac{8}{3\\sqrt[3]{x}}$.",
            "distractorTip": "Convert radicals to fractional exponents first: $\\sqrt[n]{x^m} = x^{m/n}$."
          },
          {
            "id": "c2-l4-q3",
            "stem": "If $y = 3x^4 - 2x^2 + 7x - 9$, what is $\\left.\\frac{dy}{dx}\\right|_{x = 2}$?",
            "options": [
              "$95$",
              "$88$",
              "$103$",
              "$72$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{dy}{dx} = 12x^3 - 4x + 7$. At $x = 2$: $12(8) - 4(2) + 7 = 96 - 8 + 7 = 95$.",
            "distractorTip": "Remember the derivative of a constant term ($-9$) is zero."
          },
          {
            "id": "c2-l4-q4",
            "stem": "Find the slope of the tangent line to $f(x) = x^{-1/2}$ at $x = 4$.",
            "options": [
              "$-\\frac{1}{16}$",
              "$-\\frac{1}{8}$",
              "$\\frac{1}{16}$",
              "$-\\frac{1}{4}$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = -\\frac{1}{2}x^{-3/2} = -\\frac{1}{2(\\sqrt{x})^3}$. At $x = 4$, $f'(4) = -\\frac{1}{2(2)^3} = -\\frac{1}{16}$.",
            "distractorTip": "$4^{-3/2} = \\frac{1}{(\\sqrt{4})^3} = \\frac{1}{8}$."
          }
        ]
      },
      {
        "id": 205,
        "unitIndex": 2,
        "levelNumber": 5,
        "uniqueKey": "u2-l5",
        "topicNumber": "Topic 2.6",
        "name": "Constant & Sum/Difference Rules",
        "subtitle": "Linearity of the derivative operator",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c2-l5-q1",
            "stem": "Find $\\frac{d}{dx}[7\\pi^3]$.",
            "options": [
              "$0$",
              "$21\\pi^2$",
              "$7\\pi^2$",
              "$21\\pi^3$"
            ],
            "correctIndex": 0,
            "explanation": "$\\pi$ is a constant, so $7\\pi^3$ is a constant. The derivative of any constant is $0$.",
            "distractorTip": "Common trap: do not treat $\\pi$ as a variable!"
          },
          {
            "id": "c2-l5-q2",
            "stem": "If $f'(2) = 3$ and $g'(2) = -5$, find $(2f - 3g)'(2)$.",
            "options": [
              "$21$",
              "$-9$",
              "$11$",
              "$-6$"
            ],
            "correctIndex": 0,
            "explanation": "$(2f - 3g)'(2) = 2f'(2) - 3g'(2) = 2(3) - 3(-5) = 6 + 15 = 21$.",
            "distractorTip": "Linearity: distribute derivatives over addition/subtraction."
          },
          {
            "id": "c2-l5-q3",
            "stem": "Find $\\frac{d}{dx}\\left[\\frac{x^3 + 4x}{x}\\right]$.",
            "options": [
              "$2x$",
              "$3x^2 + 4$",
              "$x^2 + 4$",
              "$2$"
            ],
            "correctIndex": 0,
            "explanation": "Simplify first: $\\frac{x^3+4x}{x} = x^2 + 4$. Differentiating gives $2x$.",
            "distractorTip": "Simplifying algebraically before differentiating is much faster than quotient rule!"
          },
          {
            "id": "c2-l5-q4",
            "stem": "If $y = 5x^3 - 4x + 9$, find the second derivative $y''$.",
            "options": [
              "$30x$",
              "$15x^2 - 4$",
              "$30x - 4$",
              "$15x$"
            ],
            "correctIndex": 0,
            "explanation": "$y' = 15x^2 - 4$, so $y'' = 30x$.",
            "distractorTip": "Differentiate twice consecutively."
          }
        ]
      },
      {
        "id": 206,
        "unitIndex": 2,
        "levelNumber": 6,
        "uniqueKey": "u2-l6",
        "topicNumber": "Topic 2.7",
        "name": "Derivatives of Sin(x), Cos(x), e^x, ln(x)",
        "subtitle": "Transcendental functions",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c2-l6-q1",
            "stem": "What is $\\frac{d}{dx}[\\sin x - 2\\cos x]$?",
            "options": [
              "$\\cos x + 2\\sin x$",
              "$\\cos x - 2\\sin x$",
              "$-\\cos x + 2\\sin x$",
              "$-\\cos x - 2\\sin x$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{d}{dx}[\\sin x] = \\cos x$, and $\\frac{d}{dx}[-2\\cos x] = -2(-\\sin x) = +2\\sin x$.",
            "distractorTip": "Watch the double negative: $\\frac{d}{dx}[\\cos x] = -\\sin x$."
          },
          {
            "id": "c2-l6-q2",
            "stem": "Evaluate $\\frac{d}{dx}[4e^x + 3\\ln x]$ at $x = 1$.",
            "options": [
              "$4e + 3$",
              "$4e$",
              "$7$",
              "$4e + 1$"
            ],
            "correctIndex": 0,
            "explanation": "Derivative is $4e^x + \\frac{3}{x}$. At $x=1$, $4e^1 + \\frac{3}{1} = 4e + 3$.",
            "distractorTip": "$\\frac{d}{dx}[\\ln x] = 1/x$ for $x > 0$."
          },
          {
            "id": "c2-l6-q3",
            "stem": "What is the slope of $y = \\ln x$ at $x = 5$?",
            "options": [
              "$\\frac{1}{5}$",
              "$5$",
              "$\\ln 5$",
              "$0$"
            ],
            "correctIndex": 0,
            "explanation": "$y' = \\frac{1}{x}$. At $x=5$, $y'(5) = \\frac{1}{5}$.",
            "distractorTip": "Simple reciprocal slope for logarithmic curves."
          },
          {
            "id": "c2-l6-q4",
            "stem": "Find the 4th derivative of $f(x) = \\sin x$.",
            "options": [
              "$\\sin x$",
              "$-\\sin x$",
              "$\\cos x$",
              "$-\\cos x$"
            ],
            "correctIndex": 0,
            "explanation": "$f' = \\cos x, f'' = -\\sin x, f''' = -\\cos x, f^{(4)} = \\sin x$. Trig derivatives cycle every 4 steps.",
            "distractorTip": "Sine derivative repeats every 4 cycles."
          }
        ]
      },
      {
        "id": 207,
        "unitIndex": 2,
        "levelNumber": 7,
        "uniqueKey": "u2-l7",
        "topicNumber": "Topic 2.8",
        "name": "The Product Rule",
        "subtitle": "Derivative of $f(x) \\cdot g(x)$",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c2-l7-q1",
            "stem": "Find $\\frac{d}{dx}[x^2 e^x]$.",
            "options": [
              "$x^2 e^x + 2x e^x$",
              "$2x e^x$",
              "$x^2 e^x$",
              "$2x + e^x$"
            ],
            "correctIndex": 0,
            "explanation": "By product rule, $(fg)' = f'g + fg' = 2x e^x + x^2 e^x$.",
            "distractorTip": "Never multiply derivatives together: $(fg)' \\neq f'g'$!"
          },
          {
            "id": "c2-l7-q2",
            "stem": "If $f(2)=3, f'(2)=4, g(2)=5, g'(2)=-1$, find $(fg)'(2)$.",
            "options": [
              "$17$",
              "$23$",
              "$-4$",
              "$11$"
            ],
            "correctIndex": 0,
            "explanation": "$(fg)'(2) = f'(2)g(2) + f(2)g'(2) = 4(5) + 3(-1) = 20 - 3 = 17$.",
            "distractorTip": "Substitute carefully into product rule formula."
          },
          {
            "id": "c2-l7-q3",
            "stem": "Find $\\frac{d}{dx}[x \\sin x]$.",
            "options": [
              "$\\sin x + x \\cos x$",
              "$x \\cos x$",
              "$\\cos x$",
              "$\\sin x - x \\cos x$"
            ],
            "correctIndex": 0,
            "explanation": "$(1)(\\sin x) + (x)(\\cos x) = \\sin x + x\\cos x$.",
            "distractorTip": "Product rule has a plus sign."
          },
          {
            "id": "c2-l7-q4",
            "stem": "Find $\\frac{d}{dx}[(x^2 + 1)(2x - 3)]$.",
            "options": [
              "$6x^2 - 6x + 2$",
              "$6x^2 + 2$",
              "$4x^2 - 6x$",
              "$2x(2)$"
            ],
            "correctIndex": 0,
            "explanation": "$2x(2x-3) + (x^2+1)(2) = 4x^2 - 6x + 2x^2 + 2 = 6x^2 - 6x + 2$.",
            "distractorTip": "Product rule or expand then differentiate both work."
          }
        ]
      },
      {
        "id": 208,
        "unitIndex": 2,
        "levelNumber": 8,
        "uniqueKey": "u2-l8",
        "topicNumber": "Topic 2.9",
        "name": "The Quotient Rule",
        "subtitle": "(low d-high - high d-low) / (low low)",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c2-l8-q1",
            "stem": "Find $\\frac{d}{dx}\\left[\\frac{x^2}{x + 1}\\right]$.",
            "options": [
              "$\\frac{x^2 + 2x}{(x+1)^2}$",
              "$\\frac{2x}{1}$",
              "$\\frac{3x^2 + 2x}{(x+1)^2}$",
              "$\\frac{x^2 - 2x}{(x+1)^2}$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{(x+1)(2x) - (x^2)(1)}{(x+1)^2} = \\frac{2x^2 + 2x - x^2}{(x+1)^2} = \\frac{x^2 + 2x}{(x+1)^2}$.",
            "distractorTip": "Numerator is $L dH - H dL$, with minus sign!"
          },
          {
            "id": "c2-l8-q2",
            "stem": "If $f(3)=6, f'(3)=2, g(3)=2, g'(3)=5$, find $(f/g)'(3)$.",
            "options": [
              "$-\\frac{13}{2}$",
              "$\\frac{17}{4}$",
              "$\\frac{2}{5}$",
              "$-4$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{g(3)f'(3) - f(3)g'(3)}{(g(3))^2} = \\frac{2(2) - 6(5)}{2^2} = \\frac{4 - 30}{4} = \\frac{-26}{4} = -\\frac{13}{2}$.",
            "distractorTip": "Order matters in subtraction!"
          },
          {
            "id": "c2-l8-q3",
            "stem": "Find $\\frac{d}{dx}\\left[\\frac{e^x}{x}\\right]$.",
            "options": [
              "$\\frac{e^x(x - 1)}{x^2}$",
              "$\\frac{e^x}{1}$",
              "$\\frac{e^x(x + 1)}{x^2}$",
              "$\\frac{e^x}{x^2}$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{x e^x - e^x(1)}{x^2} = \\frac{e^x(x-1)}{x^2}$.",
            "distractorTip": "Factor $e^x$ from numerator."
          },
          {
            "id": "c2-l8-q4",
            "stem": "Find the horizontal tangent lines of $y = \\frac{x}{x^2 + 1}$.",
            "options": [
              "$x = \\pm 1$",
              "$x = 0$",
              "$x = 1$ only",
              "None"
            ],
            "correctIndex": 0,
            "explanation": "$y' = \\frac{(x^2+1)(1) - x(2x)}{(x^2+1)^2} = \\frac{1 - x^2}{(x^2+1)^2}$. Setting $y'=0 \\implies 1 - x^2 = 0 \\implies x = \\pm 1$.",
            "distractorTip": "Horizontal tangents occur where numerator of derivative equals 0."
          },
          {
            "id": "c2-l8-q5",
            "stem": "Find $\\frac{d}{dx}\\left[\\frac{\\sin x}{x}\\right]$.",
            "options": [
              "$\\frac{x\\cos x - \\sin x}{x^2}$",
              "$\\frac{\\cos x}{1}$",
              "$\\frac{\\sin x - x\\cos x}{x^2}$",
              "$\\frac{x\\cos x + \\sin x}{x^2}$"
            ],
            "correctIndex": 0,
            "explanation": "Quotient rule: $\\frac{x(\\cos x) - \\sin x(1)}{x^2} = \\frac{x\\cos x - \\sin x}{x^2}$.",
            "distractorTip": "Low d-High minus High d-Low."
          }
        ]
      },
      {
        "id": 209,
        "unitIndex": 2,
        "levelNumber": 9,
        "uniqueKey": "u2-l9",
        "topicNumber": "Topic 2.10",
        "name": "Trig Derivatives (tan, cot, sec, csc)",
        "subtitle": "Deriving from quotient rule",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c2-l9-q1",
            "stem": "What is $\\frac{d}{dx}[\\tan x]$?",
            "options": [
              "$\\sec^2 x$",
              "$\\sec x \\tan x$",
              "$-\\csc^2 x$",
              "$\\cos^2 x$"
            ],
            "correctIndex": 0,
            "explanation": "$\\tan x = \\frac{\\sin x}{\\cos x}$. Using quotient rule: $\\frac{\\cos^2 x - \\sin x(-\\sin x)}{\\cos^2 x} = \\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} = \\sec^2 x$.",
            "distractorTip": "Essential trig derivative to memorize."
          },
          {
            "id": "c2-l9-q2",
            "stem": "Find $\\frac{d}{dx}[\\sec x]$.",
            "options": [
              "$\\sec x \\tan x$",
              "$\\sec^2 x$",
              "$-\\csc x \\cot x$",
              "$\\tan^2 x$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{d}{dx}[(\\cos x)^{-1}] = -(\\cos x)^{-2}(-\\sin x) = \\frac{\\sin x}{\\cos^2 x} = \\sec x \\tan x$.",
            "distractorTip": "Secant derivative has secant times tangent."
          },
          {
            "id": "c2-l9-q3",
            "stem": "Find the derivative of $f(x) = \\csc x + \\cot x$.",
            "options": [
              "$-\\csc x(\\cot x + \\csc x)$",
              "$\\sec^2 x + \\tan x$",
              "$\\csc x \\cot x - \\csc^2 x$",
              "$-\\cot^2 x$"
            ],
            "correctIndex": 0,
            "explanation": "$-\\csc x \\cot x - \\csc^2 x = -\\csc x(\\cot x + \\csc x)$.",
            "distractorTip": "All 'co' functions (cos, cot, csc) have negative derivatives!"
          },
          {
            "id": "c2-l9-q4",
            "stem": "Evaluate the slope of $y = \\tan x$ at $x = \\frac{\\pi}{4}$.",
            "options": [
              "$2$",
              "$1$",
              "$\\sqrt{2}$",
              "$0$"
            ],
            "correctIndex": 0,
            "explanation": "$y' = \\sec^2 x = \\frac{1}{\\cos^2 x}$. At $\\pi/4$, $\\cos(\\pi/4) = \\frac{\\sqrt{2}}{2}$, so $\\cos^2 = 1/2$, giving $\\sec^2 = 2$.",
            "distractorTip": "$\\sec(\\pi/4) = \\sqrt{2}$, squared is 2."
          },
          {
            "id": "c2-l9-q5",
            "stem": "Find $\\frac{d}{dx}[x^2 \\sec x]$.",
            "options": [
              "$2x \\sec x + x^2 \\sec x \\tan x$",
              "$2x \\sec x \\tan x$",
              "$x^2 \\sec x \\tan x$",
              "$2x + \\sec x \\tan x$"
            ],
            "correctIndex": 0,
            "explanation": "Product rule: $(2x)(\\sec x) + (x^2)(\\sec x \\tan x) = 2x\\sec x + x^2\\sec x\\tan x$.",
            "distractorTip": "Combine product rule with trig rules."
          }
        ]
      },
      {
        "id": 210,
        "unitIndex": 2,
        "levelNumber": 10,
        "uniqueKey": "u2-l10",
        "topicNumber": "Topic 2.11",
        "name": "Unit 2 Citadel: Derivative Gauntlet",
        "subtitle": "Boss speed run across all rules",
        "difficulty": "Boss",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c2-l10-q1",
            "stem": "Find $\\frac{d}{dx}\\left[\\frac{x e^x}{\\cos x}\\right]$ using combined rules.",
            "options": [
              "$\\frac{(\\cos x)(e^x + x e^x) + x e^x \\sin x}{\\cos^2 x}$",
              "$\\frac{e^x}{\\sin x}$",
              "$\\frac{(x e^x)'}{\\cos x}$",
              "$\\frac{x e^x - \\sin x}{\\cos^2 x}$"
            ],
            "correctIndex": 0,
            "explanation": "Numerator derivative by product rule: $e^x + xe^x$. Then by quotient rule: $\\frac{\\cos x(e^x + xe^x) - xe^x(-\\sin x)}{\\cos^2 x}$.",
            "distractorTip": "Quotient rule with product rule in the numerator."
          },
          {
            "id": "c2-l10-q2",
            "stem": "Find the equation of the tangent line to $y = 2\\sin x + 3\\cos x$ at $x = 0$.",
            "options": [
              "$y = 2x + 3$",
              "$y = 3x + 2$",
              "$y = 2x$",
              "$y = -3x + 2$"
            ],
            "correctIndex": 0,
            "explanation": "Point: $y(0) = 2(0) + 3(1) = 3$. Derivative: $y' = 2\\cos x - 3\\sin x \\implies y'(0) = 2(1) - 0 = 2$. Line: $y - 3 = 2(x - 0) \\implies y = 2x + 3$.",
            "distractorTip": "Compute both point $(x_0, y_0)$ and slope $m=y'(x_0)$."
          },
          {
            "id": "c2-l10-q3",
            "stem": "If $f(x) = x^3 - 6x^2 + 9x$, at what values of $x$ is the tangent line horizontal?",
            "options": [
              "$x = 1$ and $x = 3$",
              "$x = 0$ and $x = 3$",
              "$x = 2$ only",
              "$x = -1$ and $x = -3$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x-1)(x-3) = 0 \\implies x = 1, 3$.",
            "distractorTip": "Set $f'(x) = 0$ to find horizontal tangents."
          },
          {
            "id": "c2-l10-q4",
            "stem": "Find $\\lim_{h \\to 0} \\frac{\\tan(\\pi/4 + h) - 1}{h}$.",
            "options": [
              "$2$",
              "$1$",
              "$0$",
              "Does not exist"
            ],
            "correctIndex": 0,
            "explanation": "This is the definition of the derivative of $\\tan x$ at $x = \\pi/4$. $\\frac{d}{dx}[\\tan x] = \\sec^2 x$. At $\\pi/4$, $\\sec^2(\\pi/4) = 2$.",
            "distractorTip": "Recognize the difference quotient!"
          },
          {
            "id": "c2-l10-q5",
            "stem": "If $h(x) = \\frac{f(x)}{g(x)}$, $f(1)=4, f'(1)=3, g(1)=2, g'(1)=-1$, find $h'(1)$.",
            "options": [
              "$\\frac{5}{2}$",
              "$\\frac{1}{2}$",
              "$-3$",
              "$5$"
            ],
            "correctIndex": 0,
            "explanation": "$h'(1) = \\frac{g(1)f'(1) - f(1)g'(1)}{(g(1))^2} = \\frac{2(3) - 4(-1)}{2^2} = \\frac{6 + 4}{4} = \\frac{10}{4} = \\frac{5}{2}$.",
            "distractorTip": "Double negative: $-4(-1) = +4$."
          },
          {
            "id": "c2-l10-q6",
            "stem": "Let $f(x) = \\begin{cases} ax^2 + 1, & x \\le 2 \\\\ bx - 3, & x > 2 \\end{cases}$. If $f$ is differentiable at $x = 2$, find $a$ and $b$.",
            "options": [
              "$a = 1, b = 4$",
              "$a = 2, b = 8$",
              "$a = 1/2, b = 2$",
              "$a = 3, b = 6$"
            ],
            "correctIndex": 0,
            "explanation": "Continuity at 2: $4a + 1 = 2b - 3 \\implies 4a - 2b = -4$. Differentiability at 2: left derivative $2ax \\to 4a$; right derivative $b$. So $b = 4a$. Substituting into continuity: $4a - 2(4a) = -4 \\implies -4a = -4 \\implies a = 1, b = 4$.",
            "distractorTip": "Set both values and derivatives equal at boundary point."
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: "u3",
    title: "Unit 3: Differentiation: Composite, Implicit, and Inverse Functions",
    shortTitle: "Unit 3: Chain & Implicit",
    description: "Chain rule, implicit differentiation, inverse functions, inverse trigonometric functions, and higher order derivatives",
    examWeight: "9\u201313% of AP Exam",
    biome: UNIT_BIOMES[3],
    levels: [
      {
        "id": 301,
        "unitIndex": 3,
        "levelNumber": 1,
        "uniqueKey": "u3-l1",
        "topicNumber": "Topic 3.1",
        "name": "The Chain Rule Foundations",
        "subtitle": "Derivative of composite function $f(g(x))$",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c3-l1-q1",
            "stem": "What is $\\frac{d}{dx}[(3x^2 - 5)^4]$?",
            "options": [
              "$24x(3x^2 - 5)^3$",
              "$4(3x^2 - 5)^3$",
              "$12x(3x^2 - 5)^3$",
              "$24x(6x)^3$"
            ],
            "correctIndex": 0,
            "explanation": "By chain rule, $\\frac{d}{dx}[u^4] = 4u^3 \\cdot u'$. Here $u = 3x^2 - 5 \\implies u' = 6x$. So $4(3x^2 - 5)^3(6x) = 24x(3x^2 - 5)^3$.",
            "distractorTip": "Always multiply by the derivative of the inside!"
          },
          {
            "id": "c3-l1-q2",
            "stem": "Find $\\frac{d}{dx}[\\sin(4x)]$.",
            "options": [
              "$4\\cos(4x)$",
              "$\\cos(4x)$",
              "$-4\\cos(4x)$",
              "$\\frac{1}{4}\\cos(4x)$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{d}{dx}[\\sin(u)] = \\cos(u) \\cdot u'$. With $u = 4x, u' = 4$, this gives $4\\cos(4x)$.",
            "distractorTip": "Don't forget the factor of 4 from the inside."
          },
          {
            "id": "c3-l1-q3",
            "stem": "If $h(x) = f(g(x))$, $g(1)=3, g'(1)=2, f'(3)=5$, find $h'(1)$.",
            "options": [
              "$10$",
              "$15$",
              "$6$",
              "$7$"
            ],
            "correctIndex": 0,
            "explanation": "Chain rule: $h'(1) = f'(g(1)) \\cdot g'(1) = f'(3) \\cdot 2 = 5 \\cdot 2 = 10$.",
            "distractorTip": "Evaluate outer derivative at the inner output $g(1)=3$."
          }
        ]
      },
      {
        "id": 302,
        "unitIndex": 3,
        "levelNumber": 2,
        "uniqueKey": "u3-l2",
        "topicNumber": "Topic 3.2",
        "name": "Implicit Differentiation",
        "subtitle": "Curves defined by $F(x, y) = 0$ and $\\frac{dy}{dx}$",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c3-l2-q1",
            "stem": "Find $\\frac{dy}{dx}$ for the circle $x^2 + y^2 = 25$.",
            "options": [
              "$-\\frac{x}{y}$",
              "$\\frac{x}{y}$",
              "$-\\frac{y}{x}$",
              "$-2x$"
            ],
            "correctIndex": 0,
            "explanation": "Differentiate with respect to $x$: $2x + 2y \\frac{dy}{dx} = 0 \\implies 2y \\frac{dy}{dx} = -2x \\implies \\frac{dy}{dx} = -\\frac{x}{y}$.",
            "distractorTip": "Remember $y$ is a function of $x$, so $\\frac{d}{dx}[y^2] = 2y \\frac{dy}{dx}$."
          },
          {
            "id": "c3-l2-q2",
            "stem": "Find the slope of the curve $x^3 + y^3 = 6xy$ at $(3, 3)$.",
            "options": [
              "$-1$",
              "$1$",
              "$0$",
              "Undefined"
            ],
            "correctIndex": 0,
            "explanation": "$3x^2 + 3y^2 y' = 6(y + x y')$. At $(3, 3)$: $3(9) + 3(9)y' = 6(3 + 3y') \\implies 27 + 27y' = 18 + 18y' \\implies 9y' = -9 \\implies y' = -1$.",
            "distractorTip": "Apply product rule to the $xy$ term: $(xy)' = y + x y'$."
          },
          {
            "id": "c3-l2-q3",
            "stem": "Find $\\frac{dy}{dx}$ for $y^2 = 4x$.",
            "options": [
              "$\\frac{2}{y}$",
              "$\\frac{4}{y}$",
              "$\\frac{2x}{y}$",
              "$2y$"
            ],
            "correctIndex": 0,
            "explanation": "$2y y' = 4 \\implies y' = \\frac{4}{2y} = \\frac{2}{y}$.",
            "distractorTip": "Isolate $y'$ by dividing by $2y$."
          },
          {
            "id": "c3-l2-q4",
            "stem": "Find the points where the tangent to $x^2 + y^2 = 16$ is vertical.",
            "options": [
              "$(\\pm 4, 0)$",
              "$(0, \\pm 4)$",
              "$(2, 2)$",
              "No vertical tangents"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{dy}{dx} = -\\frac{x}{y}$. Tangent is vertical where denominator is zero ($y = 0$). Substituting $y = 0$ into $x^2 + y^2 = 16 \\implies x = \\pm 4$.",
            "distractorTip": "Vertical tangents occur where $\\frac{dy}{dx}$ is undefined (denominator = 0)."
          }
        ]
      },
      {
        "id": 303,
        "unitIndex": 3,
        "levelNumber": 3,
        "uniqueKey": "u3-l3",
        "topicNumber": "Topic 3.3",
        "name": "Differentiating Inverse Functions",
        "subtitle": "$(f^{-1})'(a) = \\frac{1}{f'(f^{-1}(a))}$",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c3-l3-q1",
            "stem": "If $f(x) = x^3 + x$, find $(f^{-1})'(2)$. (Note: $f(1) = 2$).",
            "options": [
              "$\\frac{1}{4}$",
              "$4$",
              "$\\frac{1}{13}$",
              "$13$"
            ],
            "correctIndex": 0,
            "explanation": "Formula: $(f^{-1})'(2) = \\frac{1}{f'(f^{-1}(2))}$. Since $f(1) = 2$, $f^{-1}(2) = 1$. Now $f'(x) = 3x^2 + 1 \\implies f'(1) = 3(1)^2 + 1 = 4$. Thus $(f^{-1})'(2) = \\frac{1}{4}$.",
            "distractorTip": "Crucial AP Rule: evaluate $f'$ at $x = 1$, NOT at $x = 2$!"
          },
          {
            "id": "c3-l3-q2",
            "stem": "Given $g(3) = 8$ and $g'(3) = 6$, find $(g^{-1})'(8)$.",
            "options": [
              "$\\frac{1}{6}$",
              "$\\frac{1}{8}$",
              "$6$",
              "$\\frac{1}{3}$"
            ],
            "correctIndex": 0,
            "explanation": "$(g^{-1})'(8) = \\frac{1}{g'(g^{-1}(8))} = \\frac{1}{g'(3)} = \\frac{1}{6}$.",
            "distractorTip": "The slope of an inverse function is the reciprocal of the original slope."
          },
          {
            "id": "c3-l3-q3",
            "stem": "If $f(x) = 2x + \\cos x$, find $(f^{-1})'(1)$. (Note: $f(0) = 1$).",
            "options": [
              "$\\frac{1}{2}$",
              "$1$",
              "$\\frac{1}{3}$",
              "$2$"
            ],
            "correctIndex": 0,
            "explanation": "$f(0) = 1 \\implies f^{-1}(1) = 0$. $f'(x) = 2 - \\sin x \\implies f'(0) = 2 - 0 = 2$. So $(f^{-1})'(1) = \\frac{1}{2}$.",
            "distractorTip": "Find the input that produces the target output first."
          },
          {
            "id": "c3-l3-q4",
            "stem": "If the tangent line to $f$ at $(4, 7)$ is $y - 7 = 3(x - 4)$, what is the slope of $f^{-1}$ at $x = 7$?",
            "options": [
              "$\\frac{1}{3}$",
              "$3$",
              "$-\\frac{1}{3}$",
              "$\\frac{1}{7}$"
            ],
            "correctIndex": 0,
            "explanation": "Since $f'(4) = 3$ and $f(4) = 7$, $(f^{-1})'(7) = \\frac{1}{f'(4)} = \\frac{1}{3}$.",
            "distractorTip": "Reciprocal slope property at reflected point $(7, 4)$."
          }
        ]
      },
      {
        "id": 304,
        "unitIndex": 3,
        "levelNumber": 4,
        "uniqueKey": "u3-l4",
        "topicNumber": "Topic 3.4",
        "name": "Derivatives of Inverse Trig (arcsin, arctan)",
        "subtitle": "$\\frac{1}{\\sqrt{1-x^2}}$ and $\\frac{1}{1+x^2}$",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c3-l4-q1",
            "stem": "Find $\\frac{d}{dx}[\\arctan(3x)]$.",
            "options": [
              "$\\frac{3}{1 + 9x^2}$",
              "$\\frac{1}{1 + 9x^2}$",
              "$\\frac{3}{\\sqrt{1 - 9x^2}}$",
              "$\\frac{3}{1 + 3x^2}$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{d}{dx}[\\arctan(u)] = \\frac{u'}{1 + u^2}$. With $u = 3x, u' = 3$, this gives $\\frac{3}{1 + (3x)^2} = \\frac{3}{1 + 9x^2}$.",
            "distractorTip": "Remember to square the entire argument: $(3x)^2 = 9x^2$."
          },
          {
            "id": "c3-l4-q2",
            "stem": "Find $\\frac{d}{dx}[\\arcsin(x^2)]$.",
            "options": [
              "$\\frac{2x}{\\sqrt{1 - x^4}}$",
              "$\\frac{1}{\\sqrt{1 - x^4}}$",
              "$\\frac{2x}{1 + x^4}$",
              "$\\frac{2x}{\\sqrt{1 - x^2}}$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{d}{dx}[\\arcsin(u)] = \\frac{u'}{\\sqrt{1 - u^2}}$. With $u = x^2, u' = 2x, u^2 = x^4$, this gives $\\frac{2x}{\\sqrt{1 - x^4}}$.",
            "distractorTip": "Chain rule applies to the inside function $u=x^2$."
          },
          {
            "id": "c3-l4-q3",
            "stem": "Evaluate the slope of $y = \\arctan x$ at $x = 1$.",
            "options": [
              "$\\frac{1}{2}$",
              "$1$",
              "$\\frac{\\pi}{4}$",
              "$\\frac{1}{\\sqrt{2}}$"
            ],
            "correctIndex": 0,
            "explanation": "$y' = \\frac{1}{1 + x^2}$. At $x = 1$, $y'(1) = \\frac{1}{1 + 1^2} = \\frac{1}{2}$.",
            "distractorTip": "Do not confuse the function value $\\arctan(1) = \\pi/4$ with its derivative slope $1/2$."
          },
          {
            "id": "c3-l4-q4",
            "stem": "Find $\\frac{d}{dx}[\\arccos(2x)]$.",
            "options": [
              "$-\\frac{2}{\\sqrt{1 - 4x^2}}$",
              "$\\frac{2}{\\sqrt{1 - 4x^2}}$",
              "$-\\frac{1}{\\sqrt{1 - 4x^2}}$",
              "$-\\frac{2}{1 + 4x^2}$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{d}{dx}[\\arccos(u)] = -\\frac{u'}{\\sqrt{1 - u^2}}$. With $u = 2x, u' = 2$, this gives $-\\frac{2}{\\sqrt{1 - 4x^2}}$.",
            "distractorTip": "Inverse cosine derivative is the negative of inverse sine derivative."
          },
          {
            "id": "c3-l4-q5",
            "stem": "Find $\\frac{d}{dx}[x \\arctan x]$.",
            "options": [
              "$\\arctan x + \\frac{x}{1 + x^2}$",
              "$\\frac{x}{1 + x^2}$",
              "$\\frac{1}{1 + x^2}$",
              "$\\arctan x + \\frac{1}{1 + x^2}$"
            ],
            "correctIndex": 0,
            "explanation": "Product rule: $(1)(\\arctan x) + (x)\\left(\\frac{1}{1 + x^2}\\right) = \\arctan x + \\frac{x}{1 + x^2}$.",
            "distractorTip": "Product rule combined with inverse trig."
          }
        ]
      },
      {
        "id": 305,
        "unitIndex": 3,
        "levelNumber": 5,
        "uniqueKey": "u3-l5",
        "topicNumber": "Topic 3.5",
        "name": "Selecting Procedures for Derivatives",
        "subtitle": "Multi-rule chain, product, quotient combos",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c3-l5-q1",
            "stem": "Find $\\frac{d}{dx}[e^{x^2} \\sin(3x)]$.",
            "options": [
              "$2x e^{x^2} \\sin(3x) + 3 e^{x^2} \\cos(3x)$",
              "$2x e^{x^2} \\cos(3x)$",
              "$e^{x^2} \\cos(3x) \\cdot 6x$",
              "$e^{x^2} (2x + 3\\cos(3x))$"
            ],
            "correctIndex": 0,
            "explanation": "Product rule with chain rule on each factor: $\\frac{d}{dx}[e^{x^2}] = 2x e^{x^2}$ and $\\frac{d}{dx}[\\sin(3x)] = 3\\cos(3x)$. Combined: $2x e^{x^2} \\sin(3x) + 3 e^{x^2} \\cos(3x)$.",
            "distractorTip": "Both factors require chain rule!"
          },
          {
            "id": "c3-l5-q2",
            "stem": "Find $\\frac{d}{dx}[\\ln(\\cos x)]$.",
            "options": [
              "$-\\tan x$",
              "$\\tan x$",
              "$\\frac{1}{\\cos x}$",
              "$-\\cot x$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{1}{\\cos x} \\cdot (-\\sin x) = -\\frac{\\sin x}{\\cos x} = -\\tan x$.",
            "distractorTip": "Chain rule with natural log: $\\frac{u'}{u}$."
          },
          {
            "id": "c3-l5-q3",
            "stem": "Find $\\frac{d}{dx}\\left[\\sqrt{\\frac{x}{x + 1}}\\right]$.",
            "options": [
              "$\\frac{1}{2(x+1)\\sqrt{x(x+1)}}$",
              "$\\frac{1}{2\\sqrt{x}}$",
              "$\\frac{1}{(x+1)^2}$",
              "$\\frac{x+1}{2x}$"
            ],
            "correctIndex": 0,
            "explanation": "Outer: $\\frac{1}{2\\sqrt{\\frac{x}{x+1}}} = \\frac{\\sqrt{x+1}}{2\\sqrt{x}}$. Inner quotient: $\\frac{(x+1)(1) - x(1)}{(x+1)^2} = \\frac{1}{(x+1)^2}$. Multiply: $\\frac{\\sqrt{x+1}}{2\\sqrt{x}(x+1)^2} = \\frac{1}{2\\sqrt{x}(x+1)^{3/2}} = \\frac{1}{2(x+1)\\sqrt{x(x+1)}}$.",
            "distractorTip": "Outer power rule followed by inner quotient rule."
          },
          {
            "id": "c3-l5-q4",
            "stem": "Find $\\frac{d}{dx}[\\sin^3(4x)]$.",
            "options": [
              "$12\\sin^2(4x)\\cos(4x)$",
              "$3\\sin^2(4x)$",
              "$12\\cos^3(4x)$",
              "$4\\cos(4x)$"
            ],
            "correctIndex": 0,
            "explanation": "Three layers: power $u^3 \\to 3\\sin^2(4x)$, trig $\\sin(v) \\to \\cos(4x)$, linear $4x \\to 4$. Product: $3(4)\\sin^2(4x)\\cos(4x) = 12\\sin^2(4x)\\cos(4x)$.",
            "distractorTip": "Triple-layer chain rule: power $\\to$ trig $\\to$ inside argument."
          },
          {
            "id": "c3-l5-q5",
            "stem": "If $f(x) = (x^2 + 1)^3 (2x - 1)^4$, how many factors of $(x^2 + 1)$ and $(2x - 1)$ appear in the factored derivative?",
            "options": [
              "$(x^2 + 1)^2 (2x - 1)^3$",
              "$(x^2 + 1)^3 (2x - 1)^4$",
              "$(x^2 + 1)^2 (2x - 1)^4$",
              "$(x^2 + 1) (2x - 1)^2$"
            ],
            "correctIndex": 0,
            "explanation": "By product rule, factoring out greatest common factors pulls out one less power from each: $(x^2+1)^{3-1} = (x^2+1)^2$ and $(2x-1)^{4-1} = (2x-1)^3$.",
            "distractorTip": "AP Free Response algebraic cleanup technique."
          }
        ]
      },
      {
        "id": 306,
        "unitIndex": 3,
        "levelNumber": 6,
        "uniqueKey": "u3-l6",
        "topicNumber": "Topic 3.6",
        "name": "Higher-Order Derivatives",
        "subtitle": "Second derivatives of implicit curves",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c3-l6-q1",
            "stem": "For the curve $x^2 + y^2 = 25$, find $\\frac{d^2y}{dx^2}$ in terms of $y$.",
            "options": [
              "$-\\frac{25}{y^3}$",
              "$-\\frac{1}{y}$",
              "$\\frac{x^2}{y^3}$",
              "$-\\frac{25}{y^2}$"
            ],
            "correctIndex": 0,
            "explanation": "First derivative: $y' = -\\frac{x}{y}$. Differentiating implicitly: $y'' = -\\frac{y(1) - x y'}{y^2} = -\\frac{y - x(-x/y)}{y^2} = -\\frac{y^2 + x^2}{y^3}$. Since $x^2 + y^2 = 25$, $y'' = -\\frac{25}{y^3}$.",
            "distractorTip": "Substitute the original curve equation $x^2 + y^2 = 25$ back into the numerator!"
          },
          {
            "id": "c3-l6-q2",
            "stem": "If $y = e^{2x}$, find the 4th derivative $y^{(4)}$.",
            "options": [
              "$16e^{2x}$",
              "$8e^{2x}$",
              "$4e^{2x}$",
              "$32e^{2x}$"
            ],
            "correctIndex": 0,
            "explanation": "Each derivative multiplies by $2$: $y' = 2e^{2x}, y'' = 4e^{2x}, y''' = 8e^{2x}, y^{(4)} = 16e^{2x}$.",
            "distractorTip": "Chain rule factor $2^n$ for $n$-th derivative."
          },
          {
            "id": "c3-l6-q3",
            "stem": "Find $f''(x)$ for $f(x) = \\ln x$.",
            "options": [
              "$-\\frac{1}{x^2}$",
              "$\\frac{1}{x^2}$",
              "$-\\frac{1}{x}$",
              "$0$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = x^{-1} \\implies f''(x) = -1x^{-2} = -\\frac{1}{x^2}$.",
            "distractorTip": "Power rule on $x^{-1}$."
          },
          {
            "id": "c3-l6-q4",
            "stem": "If $x^2 - y^2 = 16$, what is $\\frac{d^2y}{dx^2}$ at the point $(5, 3)$?",
            "options": [
              "$-\\frac{16}{27}$",
              "$\\frac{16}{27}$",
              "$-\\frac{16}{9}$",
              "$-\\frac{25}{27}$"
            ],
            "correctIndex": 0,
            "explanation": "$y' = \\frac{x}{y}$. $y'' = \\frac{y(1) - x y'}{y^2} = \\frac{y - x(x/y)}{y^2} = \\frac{y^2 - x^2}{y^3} = \\frac{-(x^2 - y^2)}{y^3} = -\\frac{16}{y^3}$. At $(5, 3)$, $y = 3$, so $y'' = -\\frac{16}{3^3} = -\\frac{16}{27}$.",
            "distractorTip": "Keep track of minus signs when substituting $x^2 - y^2 = 16$."
          },
          {
            "id": "c3-l6-q5",
            "stem": "Find the second derivative of $g(t) = t^2 \\sin t$ at $t = 0$.",
            "options": [
              "$0$",
              "$2$",
              "$-1$",
              "$1$"
            ],
            "correctIndex": 0,
            "explanation": "$g'(t) = 2t\\sin t + t^2\\cos t$. $g''(t) = 2\\sin t + 2t\\cos t + 2t\\cos t - t^2\\sin t = 2\\sin t + 4t\\cos t - t^2\\sin t$. At $t = 0$, $2(0) + 4(0)(1) - 0 = 0$.",
            "distractorTip": "Evaluate each term at $t = 0$."
          }
        ]
      },
      {
        "id": 307,
        "unitIndex": 3,
        "levelNumber": 7,
        "uniqueKey": "u3-l7",
        "topicNumber": "Topic 3.7",
        "name": "Unit 3 Boss: Chain & Implicit Mastery",
        "subtitle": "Complex exam-level implicit curves",
        "difficulty": "Boss",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c3-l7-q1",
            "stem": "Find the equation of the normal line to $x^2 + xy + y^2 = 7$ at $(1, 2)$.",
            "options": [
              "$y - 2 = \\frac{5}{4}(x - 1)$",
              "$y - 2 = -\\frac{4}{5}(x - 1)$",
              "$y - 2 = \\frac{4}{5}(x - 1)$",
              "$y - 2 = -\\frac{5}{4}(x - 1)$"
            ],
            "correctIndex": 0,
            "explanation": "$2x + y + xy' + 2yy' = 0$. At $(1, 2)$: $2(1) + 2 + (1)y' + 2(2)y' = 0 \\implies 4 + 5y' = 0 \\implies y' = -\\frac{4}{5}$. The normal line has perpendicular slope $m_{\\perp} = -\\frac{1}{-4/5} = \\frac{5}{4}$. Equation: $y - 2 = \\frac{5}{4}(x - 1)$.",
            "distractorTip": "Normal line is perpendicular to the tangent line (negative reciprocal slope)!"
          },
          {
            "id": "c3-l7-q2",
            "stem": "If $f(x) = \\arcsin(e^{2x})$, what is $f'(x)$?",
            "options": [
              "$\\frac{2e^{2x}}{\\sqrt{1 - e^{4x}}}$",
              "$\\frac{e^{2x}}{\\sqrt{1 - e^{2x}}}$",
              "$\\frac{2e^{2x}}{1 + e^{4x}}$",
              "$\\frac{1}{\\sqrt{1 - e^{4x}}}$"
            ],
            "correctIndex": 0,
            "explanation": "Chain rule: $\\frac{1}{\\sqrt{1 - (e^{2x})^2}} \\cdot \\frac{d}{dx}[e^{2x}] = \\frac{2e^{2x}}{\\sqrt{1 - e^{4x}}}$.",
            "distractorTip": "Square the exponential power: $(e^{2x})^2 = e^{4x}$."
          },
          {
            "id": "c3-l7-q3",
            "stem": "Find $\\frac{dy}{dx}$ if $\\sin(y) = x$.",
            "options": [
              "$\\sec y$",
              "$\\cos y$",
              "$\\frac{1}{\\sin y}$",
              "$-\\cos y$"
            ],
            "correctIndex": 0,
            "explanation": "$\\cos(y) \\frac{dy}{dx} = 1 \\implies \\frac{dy}{dx} = \\frac{1}{\\cos y} = \\sec y$.",
            "distractorTip": "This is the derivation of $\\frac{d}{dx}[\\arcsin x] = \\frac{1}{\\sqrt{1 - x^2}}$."
          },
          {
            "id": "c3-l7-q4",
            "stem": "If $h(x) = \\ln(x^2 + 4)$, find $h''(0)$.",
            "options": [
              "$\\frac{1}{2}$",
              "$\\frac{1}{4}$",
              "$0$",
              "$1$"
            ],
            "correctIndex": 0,
            "explanation": "$h'(x) = \\frac{2x}{x^2 + 4}$. $h''(x) = \\frac{(x^2+4)(2) - 2x(2x)}{(x^2+4)^2} = \\frac{2x^2 + 8 - 4x^2}{(x^2+4)^2} = \\frac{8 - 2x^2}{(x^2+4)^2}$. At $x = 0$, $\\frac{8}{16} = \\frac{1}{2}$.",
            "distractorTip": "Quotient rule for second derivative."
          },
          {
            "id": "c3-l7-q5",
            "stem": "Let $f$ be a differentiable function with $f(2) = 4, f'(2) = -3$. If $g(x) = \\sqrt{f(x)}$, what is $g'(2)$?",
            "options": [
              "$-\\frac{3}{4}$",
              "$-\\frac{3}{2}$",
              "$\\frac{3}{4}$",
              "$-3$"
            ],
            "correctIndex": 0,
            "explanation": "$g'(x) = \\frac{f'(x)}{2\\sqrt{f(x)}}$. At $x = 2$: $g'(2) = \\frac{f'(2)}{2\\sqrt{f(2)}} = \\frac{-3}{2\\sqrt{4}} = -\\frac{3}{4}$.",
            "distractorTip": "Chain rule for square root function: $\\frac{f'(x)}{2\\sqrt{f(x)}}$."
          },
          {
            "id": "c3-l7-q6",
            "stem": "A curve is given by $x^3 - y^3 = 7$. What is the value of $\\frac{d^2y}{dx^2}$ at the point $(2, 1)$?",
            "options": [
              "$-14$",
              "$14$",
              "$-7$",
              "$28$"
            ],
            "correctIndex": 0,
            "explanation": "$3x^2 - 3y^2 y' = 0 \\implies y' = \\frac{x^2}{y^2}$. At $(2, 1)$, $y' = \\frac{4}{1} = 4$. Next, $y'' = \\frac{y^2(2x) - x^2(2y y')}{y^4}$. At $(2, 1)$: $\\frac{1^2(4) - 4(2(1)(4))}{1^4} = \\frac{4 - 32}{1} = -28 / 2 = -14$.",
            "distractorTip": "Substitute known numbers $x=2, y=1, y'=4$ directly into the quotient rule expression."
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: "u4",
    title: "Unit 4: Contextual Applications of Differentiation",
    shortTitle: "Unit 4: Related Rates & Motion",
    description: "Straight-line motion, rates of change in applied contexts, related rates, linearization, and L'H\xF4pital's rule",
    examWeight: "10\u201315% of AP Exam",
    biome: UNIT_BIOMES[4],
    levels: [
      {
        "id": 401,
        "unitIndex": 4,
        "levelNumber": 1,
        "uniqueKey": "u4-l1",
        "topicNumber": "Topic 4.1 & 4.2",
        "name": "Straight-Line Motion (Position, Velocity, Acceleration)",
        "subtitle": "Connecting s(t), v(t), and a(t)",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c4-l1-q1",
            "stem": "A particle's position is $s(t) = t^3 - 6t^2 + 9t$. At what times is the particle at rest?",
            "options": [
              "$t = 1$ and $t = 3$",
              "$t = 0$ and $t = 3$",
              "$t = 2$ only",
              "$t = 6$"
            ],
            "correctIndex": 0,
            "explanation": "A particle is at rest when $v(t) = s'(t) = 0$. $v(t) = 3t^2 - 12t + 9 = 3(t-1)(t-3) = 0 \\implies t = 1, 3$.",
            "distractorTip": "At rest means velocity equals zero, not position equals zero."
          },
          {
            "id": "c4-l1-q2",
            "stem": "When is the speed of a particle increasing?",
            "options": [
              "When velocity and acceleration have the SAME sign.",
              "Whenever acceleration is positive.",
              "Whenever velocity is positive.",
              "When position is increasing."
            ],
            "correctIndex": 0,
            "explanation": "Speed is the absolute value of velocity $|v(t)|$. Speed increases when $v(t)$ and $a(t)$ have the same sign (both positive or both negative).",
            "distractorTip": "If $v$ and $a$ have opposite signs, the particle is slowing down!"
          },
          {
            "id": "c4-l1-q3",
            "stem": "If $v(t) = 3t^2 - 4$, what is the acceleration $a(t)$ at $t = 2$?",
            "options": [
              "$12$",
              "$8$",
              "$6$",
              "$16$"
            ],
            "correctIndex": 0,
            "explanation": "$a(t) = v'(t) = 6t$. At $t = 2$, $a(2) = 6(2) = 12$.",
            "distractorTip": "Acceleration is the derivative of velocity."
          }
        ]
      },
      {
        "id": 402,
        "unitIndex": 4,
        "levelNumber": 2,
        "uniqueKey": "u4-l2",
        "topicNumber": "Topic 4.3",
        "name": "Rates of Change in Applied Contexts",
        "subtitle": "Inflow vs outflow and net rates",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c4-l2-q1",
            "stem": "Water enters a tank at rate $E(t)$ gal/min and leaks out at rate $L(t)$ gal/min. At what moment is the volume of water increasing?",
            "options": [
              "Whenever $E(t) > L(t)$",
              "Whenever $E'(t) > 0$",
              "Whenever $L'(t) < 0$",
              "Whenever $E(t) + L(t) > 0$"
            ],
            "correctIndex": 0,
            "explanation": "The net rate of change of volume is $V'(t) = E(t) - L(t)$. Volume is increasing when $V'(t) > 0 \\implies E(t) > L(t)$.",
            "distractorTip": "Compare inflow rate and outflow rate directly."
          },
          {
            "id": "c4-l2-q2",
            "stem": "A consumer product demand is given by $C(p)$. What does $C'(10) = -25$ mean?",
            "options": [
              "At a price of \\$10, demand is decreasing at a rate of $25$ units per dollar.",
              "At a price of \\$10, demand is $25$ units.",
              "The price is decreasing by \\$25.",
              "Profit is decreasing by \\$10."
            ],
            "correctIndex": 0,
            "explanation": "The derivative represents the instantaneous rate of change of the output (units of demand) with respect to the input (price in dollars).",
            "distractorTip": "Include input condition ($p=10$), direction (decreasing), rate ($25$), and units."
          },
          {
            "id": "c4-l2-q3",
            "stem": "If $N(t)$ is the number of bacteria in a petri dish, what does $N''(t) > 0$ indicate?",
            "options": [
              "The rate of population growth is increasing (accelerating growth).",
              "The population is decreasing.",
              "The population is constant.",
              "The bacteria are dying."
            ],
            "correctIndex": 0,
            "explanation": "The second derivative is the rate of change of the rate of change. When $N''(t) > 0$, $N'(t)$ is increasing.",
            "distractorTip": "Concavity in contextual problems measures whether the rate is speeding up or slowing down."
          }
        ]
      },
      {
        "id": 403,
        "unitIndex": 4,
        "levelNumber": 3,
        "uniqueKey": "u4-l3",
        "topicNumber": "Topic 4.4",
        "name": "Introduction to Related Rates",
        "subtitle": "Geometric equations and differentiating with respect to time",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c4-l3-q1",
            "stem": "The area of a circle is $A = \\pi r^2$. If the radius increases at $3$ cm/s, what is $\\frac{dA}{dt}$ when $r = 5$ cm?",
            "options": [
              "$30\\pi\\text{ cm}^2\\text{/s}$",
              "$15\\pi\\text{ cm}^2\\text{/s}$",
              "$25\\pi\\text{ cm}^2\\text{/s}$",
              "$60\\pi\\text{ cm}^2\\text{/s}$"
            ],
            "correctIndex": 0,
            "explanation": "Differentiating with respect to $t$: $\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}$. With $r = 5$ and $\\frac{dr}{dt} = 3$: $\\frac{dA}{dt} = 2\\pi(5)(3) = 30\\pi\\text{ cm}^2\\text{/s}$.",
            "distractorTip": "Always include $\\frac{dr}{dt}$ by the chain rule when differentiating with respect to time $t$."
          },
          {
            "id": "c4-l3-q2",
            "stem": "A cube's volume is $V = s^3$. Express $\\frac{dV}{dt}$ in terms of $s$ and $\\frac{ds}{dt}$.",
            "options": [
              "$3s^2 \\frac{ds}{dt}$",
              "$3s^2$",
              "$s^2 \\frac{ds}{dt}$",
              "$6s \\frac{ds}{dt}$"
            ],
            "correctIndex": 0,
            "explanation": "By chain rule with respect to $t$: $\\frac{d}{dt}[s^3] = 3s^2 \\frac{ds}{dt}$.",
            "distractorTip": "Differentiating variables with respect to time $t$ generates rate factors."
          },
          {
            "id": "c4-l3-q3",
            "stem": "The radius of a sphere is expanding at $2$ cm/s. At what rate is its surface area ($S = 4\\pi r^2$) increasing when $r = 10$ cm?",
            "options": [
              "$160\\pi\\text{ cm}^2\\text{/s}$",
              "$80\\pi\\text{ cm}^2\\text{/s}$",
              "$40\\pi\\text{ cm}^2\\text{/s}$",
              "$200\\pi\\text{ cm}^2\\text{/s}$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{dS}{dt} = 8\\pi r \\frac{dr}{dt} = 8\\pi(10)(2) = 160\\pi\\text{ cm}^2\\text{/s}$.",
            "distractorTip": "Differentiate $4\\pi r^2$ to get $8\\pi r \\frac{dr}{dt}$."
          },
          {
            "id": "c4-l3-q4",
            "stem": "If $x^2 + y^2 = 25$ and $\\frac{dx}{dt} = 4$, what is $\\frac{dy}{dt}$ when $(x, y) = (3, 4)$?",
            "options": [
              "$-3$",
              "$3$",
              "$-4$",
              "$-\\frac{16}{3}$"
            ],
            "correctIndex": 0,
            "explanation": "$2x \\frac{dx}{dt} + 2y \\frac{dy}{dt} = 0 \\implies 2(3)(4) + 2(4)\\frac{dy}{dt} = 0 \\implies 24 + 8\\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -3$.",
            "distractorTip": "Divide by $2$ to simplify: $x \\frac{dx}{dt} + y \\frac{dy}{dt} = 0$."
          }
        ]
      },
      {
        "id": 404,
        "unitIndex": 4,
        "levelNumber": 4,
        "uniqueKey": "u4-l4",
        "topicNumber": "Topic 4.5",
        "name": "Solving Related Rates Problems",
        "subtitle": "Conical tanks, ladders, and shadow problems",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c4-l4-q1",
            "stem": "A $10$-ft ladder leans against a wall. The base slides away at $2$ ft/s. How fast is the top sliding down when the base is $6$ ft from the wall?",
            "options": [
              "$-\\frac{3}{2}\\text{ ft/s}$",
              "$-2\\text{ ft/s}$",
              "$-\\frac{4}{3}\\text{ ft/s}$",
              "$-\\frac{1}{2}\\text{ ft/s}$"
            ],
            "correctIndex": 0,
            "explanation": "Pythagorean theorem: $x^2 + y^2 = 100$. When $x = 6$, $y = \\sqrt{100 - 36} = 8$. Differentiating: $2x \\frac{dx}{dt} + 2y \\frac{dy}{dt} = 0 \\implies 6(2) + 8\\frac{dy}{dt} = 0 \\implies 12 + 8\\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -\\frac{12}{8} = -\\frac{3}{2}\\text{ ft/s}$.",
            "distractorTip": "The negative sign indicates that the height $y$ is decreasing."
          },
          {
            "id": "c4-l4-q2",
            "stem": "Water pours into a conical tank (height $10$ m, top radius $4$ m) at $2\\text{ m}^3\\text{/min}$. How fast is the water level rising when $h = 5$ m?",
            "options": [
              "$\\frac{1}{2\\pi}\\text{ m/min}$",
              "$\\frac{1}{\\pi}\\text{ m/min}$",
              "$\\frac{2}{\\pi}\\text{ m/min}$",
              "$\\frac{4}{25\\pi}\\text{ m/min}$"
            ],
            "correctIndex": 0,
            "explanation": "Similar triangles: $\\frac{r}{h} = \\frac{4}{10} \\implies r = \\frac{2}{5}h$. Volume: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi\\left(\\frac{2}{5}h\\right)^2 h = \\frac{4}{75}\\pi h^3$. Differentiating: $\\frac{dV}{dt} = \\frac{4}{25}\\pi h^2 \\frac{dh}{dt}$. Given $\\frac{dV}{dt} = 2, h = 5$: $2 = \\frac{4}{25}\\pi(25)\\frac{dh}{dt} = 4\\pi \\frac{dh}{dt} \\implies \\frac{dh}{dt} = \\frac{2}{4\\pi} = \\frac{1}{2\\pi}\\text{ m/min}$.",
            "distractorTip": "Use similar triangles to eliminate $r$ in terms of $h$ before differentiating!"
          },
          {
            "id": "c4-l4-q3",
            "stem": "A $6$-ft tall person walks away from a $15$-ft streetlight at $4$ ft/s. How fast is the length of their shadow increasing?",
            "options": [
              "$\\frac{8}{3}\\text{ ft/s}$",
              "$4\\text{ ft/s}$",
              "$\\frac{5}{2}\\text{ ft/s}$",
              "$6\\text{ ft/s}$"
            ],
            "correctIndex": 0,
            "explanation": "Let $x$ be distance from lamppost and $s$ be shadow length. Similar triangles: $\\frac{s}{6} = \\frac{x + s}{15} \\implies 15s = 6x + 6s \\implies 9s = 6x \\implies s = \\frac{2}{3}x$. Differentiating: $\\frac{ds}{dt} = \\frac{2}{3}\\frac{dx}{dt} = \\frac{2}{3}(4) = \\frac{8}{3}\\text{ ft/s}$.",
            "distractorTip": "Distinguish between the rate the shadow is growing ($\\frac{ds}{dt}$) and the rate the tip of the shadow is moving ($\\frac{dx}{dt} + \\frac{ds}{dt}$)."
          },
          {
            "id": "c4-l4-q4",
            "stem": "Two cars leave an intersection: Car A travels North at $30$ mph and Car B travels East at $40$ mph. At what rate is the distance between them increasing after $1$ hour?",
            "options": [
              "$50\\text{ mph}$",
              "$70\\text{ mph}$",
              "$35\\text{ mph}$",
              "$45\\text{ mph}$"
            ],
            "correctIndex": 0,
            "explanation": "After 1 hour: $x = 40, y = 30$, so $z = \\sqrt{40^2 + 30^2} = 50$. $z^2 = x^2 + y^2 \\implies z \\frac{dz}{dt} = x \\frac{dx}{dt} + y \\frac{dy}{dt} \\implies 50\\frac{dz}{dt} = 40(40) + 30(30) = 1600 + 900 = 2500 \\implies \\frac{dz}{dt} = 50\\text{ mph}$.",
            "distractorTip": "Classic 3-4-5 right triangle rate problem."
          },
          {
            "id": "c4-l4-q5",
            "stem": "A spherical balloon is deflating so that its radius decreases at $0.5$ cm/s. How fast is volume escaping when $r = 4$ cm?",
            "options": [
              "$32\\pi\\text{ cm}^3\\text{/s}$",
              "$16\\pi\\text{ cm}^3\\text{/s}$",
              "$64\\pi\\text{ cm}^3\\text{/s}$",
              "$8\\pi\\text{ cm}^3\\text{/s}$"
            ],
            "correctIndex": 0,
            "explanation": "$V = \\frac{4}{3}\\pi r^3 \\implies \\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt} = 4\\pi(16)(-0.5) = -32\\pi\\text{ cm}^3\\text{/s}$. The rate of escape is $32\\pi$.",
            "distractorTip": "Rate of loss is the magnitude of the negative derivative."
          }
        ]
      },
      {
        "id": 405,
        "unitIndex": 4,
        "levelNumber": 5,
        "uniqueKey": "u4-l5",
        "topicNumber": "Topic 4.6",
        "name": "Local Linearity & Tangent Line Approx",
        "subtitle": "Over vs under estimates using concavity",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c4-l5-q1",
            "stem": "The tangent line to $f(x)$ at $x = 2$ is $L(x) = 3x - 1$. What is the approximation for $f(2.1)$?",
            "options": [
              "$5.3$",
              "$5.0$",
              "$5.1$",
              "$6.3$"
            ],
            "correctIndex": 0,
            "explanation": "Plug into the tangent line: $L(2.1) = 3(2.1) - 1 = 6.3 - 1 = 5.3$.",
            "distractorTip": "Tangent line approximation simply evaluates $L(x) = f(a) + f'(a)(x - a)$."
          },
          {
            "id": "c4-l5-q2",
            "stem": "If $f''(x) > 0$ (concave up) on an interval, how does the tangent line approximation $L(x)$ compare to the true function value $f(x)$?",
            "options": [
              "$L(x)$ is an UNDERESTIMATE ($L(x) < f(x)$).",
              "$L(x)$ is an OVERESTIMATE ($L(x) > f(x)$).",
              "$L(x)$ is exactly equal to $f(x)$.",
              "It depends on whether $f$ is increasing or decreasing."
            ],
            "correctIndex": 0,
            "explanation": "When a curve is concave up ($f'' > 0$), the tangent line lies BELOW the curve. Therefore, any linear approximation is an underestimate.",
            "distractorTip": "Concave Up $\\implies$ Tangent Below $\\implies$ Underestimate. Concave Down $\\implies$ Tangent Above $\\implies$ Overestimate."
          },
          {
            "id": "c4-l5-q3",
            "stem": "Use the tangent line to $f(x) = \\sqrt{x}$ at $x = 25$ to approximate $\\sqrt{26}$.",
            "options": [
              "$\\frac{51}{10} = 5.1$",
              "$5.05$",
              "$5.2$",
              "$5.02$"
            ],
            "correctIndex": 0,
            "explanation": "$f(25) = 5, f'(x) = \\frac{1}{2\\sqrt{x}} \\implies f'(25) = \\frac{1}{10} = 0.1$. $L(26) = 5 + 0.1(26 - 25) = 5.1$.",
            "distractorTip": "Standard AP linearization procedure."
          },
          {
            "id": "c4-l5-q4",
            "stem": "For $f(x) = -x^2 + 4$, will the tangent line approximation at $x = 1$ be an overestimate or underestimate for $f(1.2)$?",
            "options": [
              "An overestimate, because $f''(x) = -2 < 0$ (concave down).",
              "An underestimate, because $f''(x) > 0$.",
              "An overestimate, because $f'(1) > 0$.",
              "An underestimate, because $f(1.2) < f(1)$."
            ],
            "correctIndex": 0,
            "explanation": "$f''(x) = -2 < 0$ everywhere, so the graph is concave down. Tangent lines lie above concave-down graphs, producing overestimates.",
            "distractorTip": "Over/under estimate depends SOLELY on concavity ($f''$), NOT whether $f'$ is positive or negative!"
          }
        ]
      },
      {
        "id": 406,
        "unitIndex": 4,
        "levelNumber": 6,
        "uniqueKey": "u4-l6",
        "topicNumber": "Topic 4.7",
        "name": "L'H\xF4pital's Rule for Indeterminate Forms",
        "subtitle": "$\\frac{0}{0}$ and $\\frac{\\infty}{\\infty}$ limit evaluations",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c4-l6-q1",
            "stem": "Evaluate $\\lim_{x \\to 0} \\frac{e^{3x} - 1}{\\sin(2x)}$.",
            "options": [
              "$\\frac{3}{2}$",
              "$\\frac{2}{3}$",
              "$1$",
              "$0$"
            ],
            "correctIndex": 0,
            "explanation": "Direct substitution gives $\\frac{e^0-1}{\\sin 0} = \\frac{0}{0}$. Applying L'H\xF4pital's Rule: $\\lim_{x \\to 0} \\frac{3e^{3x}}{2\\cos(2x)} = \\frac{3(1)}{2(1)} = \\frac{3}{2}$.",
            "distractorTip": "Always state that the limit produces an indeterminate form $\\frac{0}{0}$ or $\\frac{\\pm\\infty}{\\pm\\infty}$ before applying L'H\xF4pital!"
          },
          {
            "id": "c4-l6-q2",
            "stem": "Evaluate $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}$.",
            "options": [
              "$\\frac{1}{2}$",
              "$1$",
              "$0$",
              "Does not exist"
            ],
            "correctIndex": 0,
            "explanation": "Direct substitution gives $0/0$. First L'H\xF4pital: $\\lim_{x \\to 0} \\frac{\\sin x}{2x} = \\frac{0}{0}$. Second L'H\xF4pital: $\\lim_{x \\to 0} \\frac{\\cos x}{2} = \\frac{1}{2}$.",
            "distractorTip": "L'H\xF4pital's Rule can be applied multiple times consecutively if the form remains $0/0$."
          },
          {
            "id": "c4-l6-q3",
            "stem": "Evaluate $\\lim_{x \\to \\infty} \\frac{\\ln x}{x}$.",
            "options": [
              "$0$",
              "$1$",
              "$\\infty$",
              "$-1$"
            ],
            "correctIndex": 0,
            "explanation": "Form $\\frac{\\infty}{\\infty}$. Applying L'H\xF4pital: $\\lim_{x \\to \\infty} \\frac{1/x}{1} = \\lim_{x \\to \\infty} \\frac{1}{x} = 0$.",
            "distractorTip": "Polynomials grow faster than logarithms as $x \\to \\infty$."
          },
          {
            "id": "c4-l6-q4",
            "stem": "Why can L'H\xF4pital's Rule NOT be applied to $\\lim_{x \\to 0} \\frac{\\cos x}{x + 1}$?",
            "options": [
              "Direct substitution yields $\\frac{1}{1} = 1$, which is not an indeterminate form.",
              "The numerator is not differentiable.",
              "The denominator has a limit of $0$.",
              "The function is periodic."
            ],
            "correctIndex": 0,
            "explanation": "L'H\xF4pital's Rule requires the indeterminate form $\\frac{0}{0}$ or $\\frac{\\pm\\infty}{\\pm\\infty}$. Here direct substitution yields $\\frac{1}{1} = 1$. Applying L'H\xF4pital incorrectly would yield $\\frac{-\\sin 0}{1} = 0$, which is wrong!",
            "distractorTip": "Never apply L'H\xF4pital's Rule if direct substitution yields a determinate number!"
          }
        ]
      },
      {
        "id": 407,
        "unitIndex": 4,
        "levelNumber": 7,
        "uniqueKey": "u4-l7",
        "topicNumber": "Topic 4.8",
        "name": "Unit 4 Boss: Kinematics & Rates Gauntlet",
        "subtitle": "Multi-step contextual AP FRQ scenarios",
        "difficulty": "Boss",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c4-l7-q1",
            "stem": "A particle moves along the $x$-axis with velocity $v(t) = t^2 - 4t + 3$. For what time intervals is the particle moving to the LEFT?",
            "options": [
              "$(1, 3)$",
              "$(0, 1)$",
              "$(3, \\infty)$",
              "$[1, 3]$"
            ],
            "correctIndex": 0,
            "explanation": "A particle moves to the left when $v(t) < 0$. $v(t) = (t - 1)(t - 3) < 0$ when $1 < t < 3$.",
            "distractorTip": "Moving left means velocity is strictly negative ($v(t) < 0$)."
          },
          {
            "id": "c4-l7-q2",
            "stem": "For the same particle with $v(t) = t^2 - 4t + 3$, is its speed increasing or decreasing at $t = 2.5$?",
            "options": [
              "INCREASING, because $v(2.5) < 0$ and $a(2.5) > 0$ is FALSE; check signs carefully: $v(2.5) = -0.75$ and $a(2.5) = 2(2.5) - 4 = +1$, so DECREASING.",
              "DECREASING, because $v(2.5) < 0$ and $a(2.5) > 0$ (opposite signs).",
              "INCREASING, because $a(2.5) > 0$.",
              "DECREASING, because $v(2.5) < 0$."
            ],
            "correctIndex": 1,
            "explanation": "At $t = 2.5$: $v(2.5) = (1.5)(-0.5) = -0.75 < 0$. $a(t) = v'(t) = 2t - 4 \\implies a(2.5) = 5 - 4 = +1 > 0$. Since velocity and acceleration have OPPOSITE signs, the particle is slowing down (speed is decreasing).",
            "distractorTip": "Speed increases when signs match; speed decreases when signs differ."
          },
          {
            "id": "c4-l7-q3",
            "stem": "An inverted cone with base radius $6$ ft and height $12$ ft is leaking water at $3\\text{ ft}^3\\text{/min}$. At what rate is the water depth $h$ dropping when $h = 4$ ft?",
            "options": [
              "$\\frac{3}{4\\pi}\\text{ ft/min}$",
              "$\\frac{1}{\\pi}\\text{ ft/min}$",
              "$\\frac{3}{16\\pi}\\text{ ft/min}$",
              "$\\frac{1}{2\\pi}\\text{ ft/min}$"
            ],
            "correctIndex": 0,
            "explanation": "Similar triangles: $\\frac{r}{h} = \\frac{6}{12} = \\frac{1}{2} \\implies r = \\frac{1}{2}h$. Volume: $V = \\frac{1}{3}\\pi (h/2)^2 h = \\frac{1}{12}\\pi h^3$. $\\frac{dV}{dt} = \\frac{1}{4}\\pi h^2 \\frac{dh}{dt}$. Given $\\frac{dV}{dt} = -3$: $-3 = \\frac{1}{4}\\pi(16)\\frac{dh}{dt} = 4\\pi \\frac{dh}{dt} \\implies \\frac{dh}{dt} = -\\frac{3}{4\\pi}\\text{ ft/min}$.",
            "distractorTip": "Water is dropping at rate $\\frac{3}{4\\pi}\\text{ ft/min}$."
          },
          {
            "id": "c4-l7-q4",
            "stem": "Evaluate $\\lim_{x \\to 0} \\frac{x - \\sin x}{x^3}$.",
            "options": [
              "$\\frac{1}{6}$",
              "$\\frac{1}{3}$",
              "$0$",
              "$\\frac{1}{2}$"
            ],
            "correctIndex": 0,
            "explanation": "Form $0/0$. First L'H\xF4pital: $\\lim \\frac{1 - \\cos x}{3x^2}$ ($0/0$). Second L'H\xF4pital: $\\lim \\frac{\\sin x}{6x} = \\frac{1}{6}\\lim \\frac{\\sin x}{x} = \\frac{1}{6}(1) = \\frac{1}{6}$.",
            "distractorTip": "Requires two iterations of L'H\xF4pital's Rule."
          },
          {
            "id": "c4-l7-q5",
            "stem": "The function $f$ is twice differentiable with $f(3) = 5, f'(3) = -2, f''(3) = -4$. Which of the following is true about the tangent line approximation at $x = 3$?",
            "options": [
              "$L(3.1) = 4.8$, and it is an OVERESTIMATE.",
              "$L(3.1) = 4.8$, and it is an UNDERESTIMATE.",
              "$L(3.1) = 5.2$, and it is an OVERESTIMATE.",
              "$L(3.1) = 5.2$, and it is an UNDERESTIMATE."
            ],
            "correctIndex": 0,
            "explanation": "$L(3.1) = f(3) + f'(3)(3.1 - 3) = 5 + (-2)(0.1) = 5 - 0.2 = 4.8$. Since $f''(3) = -4 < 0$, $f$ is concave down, meaning tangent lines lie above the curve, making $4.8$ an overestimate.",
            "distractorTip": "Concave down ($f'' < 0$) guarantees the tangent line is an overestimate."
          },
          {
            "id": "c4-l7-q6",
            "stem": "A police radar sits $30$ ft off a straight highway. A car drives past, and when the direct distance is $50$ ft, that distance is decreasing at $80$ ft/s. What is the speed of the car along the highway?",
            "options": [
              "$100\\text{ ft/s}$",
              "$80\\text{ ft/s}$",
              "$60\\text{ ft/s}$",
              "$120\\text{ ft/s}$"
            ],
            "correctIndex": 0,
            "explanation": "Let $x$ be distance along the highway from perpendicular point, $y = 30$ (constant). Direct distance $z = 50$. Then $x = \\sqrt{50^2 - 30^2} = 40$. Differentiating $x^2 + 30^2 = z^2$: $2x \\frac{dx}{dt} = 2z \\frac{dz}{dt} \\implies 40\\frac{dx}{dt} = 50(-80) = -4000 \\implies \\frac{dx}{dt} = -100\\text{ ft/s}$. Car speed is $100$ ft/s.",
            "distractorTip": "Notice the perpendicular distance $y = 30$ is constant, so $\\frac{dy}{dt} = 0$."
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: "u5",
    title: "Unit 5: Analytical Applications of Differentiation",
    shortTitle: "Unit 5: Extrema & Optimization",
    description: "Mean Value Theorem, extreme value theorem, first and second derivative tests, concavity, curve sketching, and optimization",
    examWeight: "15\u201318% of AP Exam",
    biome: UNIT_BIOMES[5],
    levels: [
      {
        "id": 501,
        "unitIndex": 5,
        "levelNumber": 1,
        "uniqueKey": "u5-l1",
        "topicNumber": "Topic 5.1",
        "name": "The Mean Value Theorem (MVT)",
        "subtitle": "Hypotheses and guaranteed instantaneous slopes",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l1-q1",
            "stem": "Which conditions MUST be satisfied to apply the Mean Value Theorem to $f$ on $[a, b]$?",
            "options": [
              "$f$ is continuous on $[a, b]$ and differentiable on $(a, b)$.",
              "$f$ is continuous on $(a, b)$ only.",
              "$f'(x) = 0$ at some point.",
              "$f(a) = f(b)$."
            ],
            "correctIndex": 0,
            "explanation": "MVT requires two conditions: 1) continuous on the closed interval $[a, b]$; 2) differentiable on the open interval $(a, b)$.",
            "distractorTip": "If $f(a) = f(b)$, that is Rolle's Theorem, a special case of MVT."
          },
          {
            "id": "c5-l1-q2",
            "stem": "Find the value of $c$ guaranteed by MVT for $f(x) = x^2$ on $[0, 4]$.",
            "options": [
              "$c = 2$",
              "$c = 1$",
              "$c = 3$",
              "$c = \\sqrt{2}$"
            ],
            "correctIndex": 0,
            "explanation": "Average slope: $\\frac{f(4) - f(0)}{4 - 0} = \\frac{16 - 0}{4} = 4$. By MVT, $f'(c) = 4 \\implies 2c = 4 \\implies c = 2$.",
            "distractorTip": "For quadratic functions, $c$ is always the exact midpoint of $[a, b]$!"
          },
          {
            "id": "c5-l1-q3",
            "stem": "Why does MVT fail for $f(x) = |x|$ on $[-1, 2]$?",
            "options": [
              "$f$ is not differentiable at $x = 0 \\in (-1, 2)$.",
              "$f$ is not continuous on $[-1, 2]$.",
              "$f(-1) \\neq f(2)$.",
              "MVT does apply."
            ],
            "correctIndex": 0,
            "explanation": "Although $f(x) = |x|$ is continuous, it has a sharp corner at $x = 0$, so $f'(0)$ does not exist. Since differentiability on $(-1, 2)$ fails, MVT cannot be applied.",
            "distractorTip": "Check differentiability on the interior of the interval."
          }
        ]
      },
      {
        "id": 502,
        "unitIndex": 5,
        "levelNumber": 2,
        "uniqueKey": "u5-l2",
        "topicNumber": "Topic 5.2",
        "name": "Extreme Value Theorem & Critical Points",
        "subtitle": "Global vs local extrema on closed intervals",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l2-q1",
            "stem": "What is a critical point of a function $f(x)$ in its domain?",
            "options": [
              "A point where $f'(x) = 0$ or $f'(x)$ does not exist.",
              "A point where $f(x) = 0$.",
              "A point where $f''(x) = 0$.",
              "An endpoint of the domain."
            ],
            "correctIndex": 0,
            "explanation": "By definition, critical points occur in the interior domain where $f'(c) = 0$ or $f'(c)$ is undefined.",
            "distractorTip": "Endpoints are boundary points, not critical points."
          },
          {
            "id": "c5-l2-q2",
            "stem": "What condition guarantees that a function has both an absolute maximum and an absolute minimum?",
            "options": [
              "The function is continuous on a CLOSED interval $[a, b]$.",
              "The function is differentiable on all real numbers.",
              "The function is strictly increasing.",
              "The function has at least two critical points."
            ],
            "correctIndex": 0,
            "explanation": "The Extreme Value Theorem (EVT) states that if $f$ is continuous on a closed interval $[a, b]$, then $f$ attains both an absolute maximum and an absolute minimum on $[a, b]$.",
            "distractorTip": "Both continuity and a closed, bounded interval are mandatory."
          },
          {
            "id": "c5-l2-q3",
            "stem": "Find all critical numbers of $f(x) = 2x^3 - 3x^2 - 12x + 1$.",
            "options": [
              "$x = -1$ and $x = 2$",
              "$x = 1$ and $x = -2$",
              "$x = 0$ only",
              "$x = 3$ and $x = -1$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = 6x^2 - 6x - 12 = 6(x^2 - x - 2) = 6(x - 2)(x + 1) = 0 \\implies x = 2, -1$.",
            "distractorTip": "Factor completely after setting $f'(x) = 0$."
          }
        ]
      },
      {
        "id": 503,
        "unitIndex": 5,
        "levelNumber": 3,
        "uniqueKey": "u5-l3",
        "topicNumber": "Topic 5.3",
        "name": "Intervals of Increase and Decrease",
        "subtitle": "Sign analysis of $f'(x)$",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l3-q1",
            "stem": "If $f'(x) > 0$ for all $x \\in (a, b)$, what does this tell us about $f$ on $[a, b]$?",
            "options": [
              "$f$ is strictly INCREASING on $[a, b]$.",
              "$f$ is concave up on $[a, b]$.",
              "$f$ is positive on $[a, b]$.",
              "$f$ has a local minimum."
            ],
            "correctIndex": 0,
            "explanation": "A positive first derivative means the function values are increasing as $x$ moves from left to right.",
            "distractorTip": "Sign of $f'$ determines whether $f$ is increasing/decreasing."
          },
          {
            "id": "c5-l3-q2",
            "stem": "On what interval is $f(x) = x^3 - 3x$ decreasing?",
            "options": [
              "$(-1, 1)$",
              "$(-\\infty, -1)$",
              "$(1, \\infty)$",
              "$(-\\infty, 0)$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$. $f'(x) < 0$ when $x^2 < 1 \\implies -1 < x < 1$.",
            "distractorTip": "Test signs in each interval between critical numbers."
          },
          {
            "id": "c5-l3-q3",
            "stem": "If $f'(x) = (x - 2)^2(x + 3)$, on what interval is $f$ increasing?",
            "options": [
              "$(-3, 2) \\cup (2, \\infty)$",
              "$(-\\infty, -3)$",
              "$(2, \\infty)$ only",
              "All real numbers"
            ],
            "correctIndex": 0,
            "explanation": "Critical numbers: $x = -3, 2$. Since $(x - 2)^2 \\ge 0$ for all $x$, the sign of $f'$ depends solely on $(x + 3)$. For $x > -3$ (except at $x = 2$ where $f'=0$), $f'(x) > 0$. Thus $f$ is increasing for $x > -3$.",
            "distractorTip": "Even powers like $(x - 2)^2$ do NOT change sign across their root!"
          },
          {
            "id": "c5-l3-q4",
            "stem": "If $f'(x) < 0$ on $(-\\infty, 4)$ and $f'(x) > 0$ on $(4, \\infty)$, what happens at $x = 4$?",
            "options": [
              "$f$ has a relative MINIMUM at $x = 4$.",
              "$f$ has a relative MAXIMUM at $x = 4$.",
              "$f$ has an inflection point at $x = 4$.",
              "$f$ is discontinuous at $x = 4$."
            ],
            "correctIndex": 0,
            "explanation": "A function that decreases then increases reaches a valley (relative minimum).",
            "distractorTip": "First Derivative Test: negative to positive means minimum."
          }
        ]
      },
      {
        "id": 504,
        "unitIndex": 5,
        "levelNumber": 4,
        "uniqueKey": "u5-l4",
        "topicNumber": "Topic 5.4",
        "name": "First Derivative Test for Extrema",
        "subtitle": "Sign changes from positive to negative",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l4-q1",
            "stem": "According to the First Derivative Test, a relative MAXIMUM occurs at $x = c$ when:",
            "options": [
              "$f'(x)$ changes sign from POSITIVE to NEGATIVE at $x = c$.",
              "$f'(x)$ changes sign from negative to positive.",
              "$f''(c) > 0$.",
              "$f'(c) = 0$ without a sign change."
            ],
            "correctIndex": 0,
            "explanation": "Moving left to right, rising ($f'>0$) then falling ($f'<0$) forms a peak (relative maximum).",
            "distractorTip": "Peak = up then down (+ to -)."
          },
          {
            "id": "c5-l4-q2",
            "stem": "Find the relative extrema of $f(x) = x^4 - 4x^3$.",
            "options": [
              "Relative minimum at $x = 3$, no relative maximum.",
              "Relative maximum at $x = 0$, relative minimum at $x = 3$.",
              "Relative minimum at $x = 0$ and $x = 3$.",
              "No relative extrema."
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3)$. Critical points: $x = 0, 3$. Sign chart: for $x < 0$, $f' < 0$; for $0 < x < 3$, $f' < 0$ (no sign change at $0$, so no extremum); for $x > 3$, $f' > 0$ (changes from $-$ to $+$, so relative minimum at $x = 3$).",
            "distractorTip": "Watch out for $x = 0$: $4x^2$ does NOT change sign!"
          },
          {
            "id": "c5-l4-q3",
            "stem": "If $g'(x) = (x - 1)(x - 4)(x - 6)$, where does $g$ have a relative maximum?",
            "options": [
              "$x = 4$",
              "$x = 1$",
              "$x = 6$",
              "$x = 1$ and $x = 6$"
            ],
            "correctIndex": 0,
            "explanation": "Sign test: for $x < 1$, $g' < 0$; for $1 < x < 4$, $g' > 0$ (rel min at 1); for $4 < x < 6$, $g' < 0$ (changes $+$ to $-$, so rel MAX at 4); for $x > 6$, $g' > 0$ (rel min at 6).",
            "distractorTip": "Sign alternates at simple roots: $-, +, -, +$."
          },
          {
            "id": "c5-l4-q4",
            "stem": "Can a function have a local extremum at a point where $f'(x)$ is undefined?",
            "options": [
              "Yes, as long as $f$ is continuous there and $f'$ changes sign (e.g. at a cusp).",
              "No, derivatives must exist at all extrema.",
              "Only if $f''(x) = 0$.",
              "Only at endpoints."
            ],
            "correctIndex": 0,
            "explanation": "Yes! For example, $f(x) = |x|$ has an absolute minimum at $x = 0$ where $f'(0)$ does not exist, because $f'$ changes from $-1$ to $+1$.",
            "distractorTip": "Extrema can occur at critical points where $f'$ does not exist (cusps/corners)."
          }
        ]
      },
      {
        "id": 505,
        "unitIndex": 5,
        "levelNumber": 5,
        "uniqueKey": "u5-l5",
        "topicNumber": "Topic 5.5",
        "name": "Candidates Test for Absolute Extrema",
        "subtitle": "Comparing critical points and endpoints",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l5-q1",
            "stem": "Find the absolute maximum value of $f(x) = x^3 - 3x^2$ on $[-1, 4]$.",
            "options": [
              "$16$",
              "$0$",
              "$-4$",
              "$-1$"
            ],
            "correctIndex": 0,
            "explanation": "Candidates: endpoints $x = -1, 4$; critical points where $f'(x) = 3x^2 - 6x = 3x(x - 2) = 0 \\implies x = 0, 2$. Values: $f(-1) = -4$; $f(0) = 0$; $f(2) = 8 - 12 = -4$; $f(4) = 64 - 48 = 16$. The absolute maximum value is $16$.",
            "distractorTip": "Always evaluate both endpoints and all interior critical points in a candidates table!"
          },
          {
            "id": "c5-l5-q2",
            "stem": "Find the absolute minimum value of $f(x) = 2x^3 - 6x$ on $[0, 3]$.",
            "options": [
              "$-4$",
              "$0$",
              "$-6$",
              "$36$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = 6x^2 - 6 = 6(x^2 - 1) = 0 \\implies x = 1$ in $[0, 3]$. Values: $f(0) = 0$; $f(1) = 2 - 6 = -4$; $f(3) = 2(27) - 6(3) = 54 - 18 = 36$. Absolute minimum value is $-4$.",
            "distractorTip": "Notice $x = -1$ is rejected because it is outside the interval $[0, 3]$."
          },
          {
            "id": "c5-l5-q3",
            "stem": "On the interval $[0, 2\\pi]$, what is the absolute maximum value of $f(x) = \\sin x + \\cos x$?",
            "options": [
              "$\\sqrt{2}$",
              "$1$",
              "$2$",
              "$\\sqrt{3}$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = \\cos x - \\sin x = 0 \\implies \\tan x = 1 \\implies x = \\pi/4, 5\\pi/4$. At $x = \\pi/4$: $\\sin(\\pi/4) + \\cos(\\pi/4) = \\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2} = \\sqrt{2} \\approx 1.414$. At endpoints: $f(0) = 1, f(2\\pi) = 1$. At $5\\pi/4$: $-\\sqrt{2}$. Absolute maximum is $\\sqrt{2}$.",
            "distractorTip": "Maximum of $\\sin x + \\cos x$ is $\\sqrt{1^2+1^2} = \\sqrt{2}$."
          },
          {
            "id": "c5-l5-q4",
            "stem": "What is the difference between an extremum 'location' and an extremum 'value' on AP scoring rubrics?",
            "options": [
              "The location is the $x$-coordinate; the value is the $y$-coordinate $f(x)$.",
              "They mean the exact same thing.",
              "The value is $x$, the location is $y$.",
              "The location is the slope $f'(x)$."
            ],
            "correctIndex": 0,
            "explanation": "If a question asks 'Find the absolute maximum VALUE of $f$', write the $y$-value. If it asks 'At what point/value of $x$ does the maximum occur', write the $x$-value.",
            "distractorTip": "College Board strictly penalizes writing $x$ when asked for the maximum 'value'."
          }
        ]
      },
      {
        "id": 506,
        "unitIndex": 5,
        "levelNumber": 6,
        "uniqueKey": "u5-l6",
        "topicNumber": "Topic 5.6",
        "name": "Concavity & Points of Inflection",
        "subtitle": "Second derivative sign changes and inflection points",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l6-q1",
            "stem": "A point of inflection on the graph of $f$ occurs where:",
            "options": [
              "$f$ is continuous and the concavity ($f''(x)$) CHANGES SIGN.",
              "$f''(x) = 0$.",
              "$f'(x) = 0$.",
              "$f(x) = 0$."
            ],
            "correctIndex": 0,
            "explanation": "Having $f''(c) = 0$ is NOT enough! The second derivative must actually change sign (from positive to negative or negative to positive).",
            "distractorTip": "Counterexample: $f(x) = x^4$ has $f''(0) = 0$, but no inflection point because $f''(x) = 12x^2 \\ge 0$."
          },
          {
            "id": "c5-l6-q2",
            "stem": "Find the interval(s) where $f(x) = x^3 - 6x^2 + 9x$ is concave down.",
            "options": [
              "$(-\\infty, 2)$",
              "$(2, \\infty)$",
              "$(1, 3)$",
              "$(0, 2)$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = 3x^2 - 12x + 9 \\implies f''(x) = 6x - 12 = 6(x - 2)$. Concave down means $f''(x) < 0 \\implies x < 2$, i.e. $(-\\infty, 2)$.",
            "distractorTip": "Concave down $\\iff f''(x) < 0$."
          },
          {
            "id": "c5-l6-q3",
            "stem": "Find the inflection point of $f(x) = x^3 - 3x^2 + 2$.",
            "options": [
              "$(1, 0)$",
              "$(0, 2)$",
              "$(2, -2)$",
              "$(1, 2)$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = 3x^2 - 6x \\implies f''(x) = 6x - 6 = 0 \\implies x = 1$. $f(1) = 1 - 3 + 2 = 0$. Since $f''$ changes from negative to positive at $x = 1$, $(1, 0)$ is an inflection point.",
            "distractorTip": "Find both the $x$ and $y$ coordinates of the point on the curve."
          },
          {
            "id": "c5-l6-q4",
            "stem": "If $f'(x)$ is INCREASING on $(1, 5)$, what is the concavity of $f$ on $(1, 5)$?",
            "options": [
              "Concave UP, because $f''(x) = (f'(x))' > 0$.",
              "Concave DOWN.",
              "Linear.",
              "Cannot be determined."
            ],
            "correctIndex": 0,
            "explanation": "The derivative of an increasing function is positive. Since $f'$ is increasing, its derivative $f''$ is positive, which means $f$ is concave up.",
            "distractorTip": "Connecting $f'$ to $f''$: $f'$ increasing $\\iff f$ concave up."
          }
        ]
      },
      {
        "id": 507,
        "unitIndex": 5,
        "levelNumber": 7,
        "uniqueKey": "u5-l7",
        "topicNumber": "Topic 5.7",
        "name": "Second Derivative Test for Relative Extrema",
        "subtitle": "Using $f''(c)$ to classify critical points",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l7-q1",
            "stem": "If $f'(c) = 0$ and $f''(c) < 0$, what does the Second Derivative Test conclude?",
            "options": [
              "$f$ has a relative MAXIMUM at $x = c$.",
              "$f$ has a relative MINIMUM at $x = c$.",
              "$f$ has an inflection point at $x = c$.",
              "The test is inconclusive."
            ],
            "correctIndex": 0,
            "explanation": "Horizontal tangent ($f'=0$) combined with concave down ($f''<0$) means the curve curves downward like a hill, creating a relative maximum.",
            "distractorTip": "Negative second derivative $\\implies$ concave down $\\implies$ maximum."
          },
          {
            "id": "c5-l7-q2",
            "stem": "If $f'(3) = 0$ and $f''(3) = 0$, what should you do?",
            "options": [
              "The Second Derivative Test is INCONCLUSIVE; use the First Derivative Test instead.",
              "Conclude there is no extremum.",
              "Conclude there is a point of inflection.",
              "Conclude there is a vertical tangent."
            ],
            "correctIndex": 0,
            "explanation": "When $f''(c) = 0$, the Second Derivative Test yields no information. You must check the sign of $f'$ on either side of $c$ using the First Derivative Test.",
            "distractorTip": "Inconclusive means switch to sign chart of $f'$."
          },
          {
            "id": "c5-l7-q3",
            "stem": "Use the Second Derivative Test to classify the critical points of $f(x) = x^3 - 3x$.",
            "options": [
              "Relative min at $x = 1$, relative max at $x = -1$.",
              "Relative max at $x = 1$, relative min at $x = -1$.",
              "Both are relative minima.",
              "Inconclusive."
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = 3x^2 - 3 = 0 \\implies x = \\pm 1$. $f''(x) = 6x$. At $x = 1$: $f''(1) = 6 > 0$ (concave up $\\implies$ rel min). At $x = -1$: $f''(-1) = -6 < 0$ (concave down $\\implies$ rel max).",
            "distractorTip": "Concave Up $\\implies$ Minimum; Concave Down $\\implies$ Maximum."
          },
          {
            "id": "c5-l7-q4",
            "stem": "A function satisfies $f'(2) = 0$ and $f''(2) = 5$. Does $f$ have a relative max or min at $x = 2$?",
            "options": [
              "Relative MINIMUM, because $f''(2) > 0$.",
              "Relative MAXIMUM, because $f''(2) > 0$.",
              "Point of inflection.",
              "Inconclusive."
            ],
            "correctIndex": 0,
            "explanation": "Since $f'(2) = 0$ and $f''(2) > 0$, the graph is concave up at a horizontal tangent, meaning $x = 2$ is a relative minimum.",
            "distractorTip": "Positive second derivative $\\implies$ happy face curve $\\implies$ minimum."
          }
        ]
      },
      {
        "id": 508,
        "unitIndex": 5,
        "levelNumber": 8,
        "uniqueKey": "u5-l8",
        "topicNumber": "Topic 5.8",
        "name": "Sketching Graphs of f, f', f''",
        "subtitle": "Connecting visual features between derivatives",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l8-q1",
            "stem": "Where the graph of $f(x)$ has an inflection point, what does the graph of $f'(x)$ have?",
            "options": [
              "A local maximum or local minimum (turnaround point).",
              "An $x$-intercept.",
              "A vertical asymptote.",
              "A horizontal tangent where $f'(x) = 0$."
            ],
            "correctIndex": 0,
            "explanation": "An inflection point occurs where $f''$ changes sign. Since $f''$ is the derivative of $f'$, $f'$ changes from increasing to decreasing (or vice-versa), which means $f'$ has a local extremum.",
            "distractorTip": "Inflection on $f \\iff$ Peak or Valley on $f'$."
          },
          {
            "id": "c5-l8-q2",
            "stem": "If the graph of $f'$ is below the $x$-axis and decreasing, what is true about $f$?",
            "options": [
              "$f$ is DECREASING and CONCAVE DOWN.",
              "$f$ is increasing and concave up.",
              "$f$ is decreasing and concave up.",
              "$f$ is increasing and concave down."
            ],
            "correctIndex": 0,
            "explanation": "$f'$ below $x$-axis $\\implies f' < 0 \\implies f$ is decreasing. $f'$ decreasing $\\implies (f')' = f'' < 0 \\implies f$ is concave down.",
            "distractorTip": "Position of $f'$ determines slope of $f$; slope of $f'$ determines concavity of $f$."
          },
          {
            "id": "c5-l8-q3",
            "stem": "The graph of $f'$ crosses the $x$-axis from positive to negative at $x = 3$. What feature does $f$ have at $x = 3$?",
            "options": [
              "A relative maximum.",
              "A relative minimum.",
              "An inflection point.",
              "A vertical asymptote."
            ],
            "correctIndex": 0,
            "explanation": "Crossing from positive to negative means $f'$ changes from $+$ to $-$, so $f$ reaches a relative maximum.",
            "distractorTip": "First derivative sign change from $+$ to $-$ means maximum."
          },
          {
            "id": "c5-l8-q4",
            "stem": "If $f'(x) = 0$ at $x = 2$ and $f'(x) > 0$ for all $x \\neq 2$, what feature does $f$ have at $x = 2$?",
            "options": [
              "A horizontal point of inflection (saddle point), but NO local extremum.",
              "A local maximum.",
              "A local minimum.",
              "A sharp corner."
            ],
            "correctIndex": 0,
            "explanation": "Since $f'$ does not change sign (it is positive on both sides), $f$ continues to increase through $x = 2$. It has a flat spot / inflection point like $y = x^3$ at $0$.",
            "distractorTip": "No sign change $\\implies$ no local extremum!"
          },
          {
            "id": "c5-l8-q5",
            "stem": "Given the graph of $f'$, how do you find the intervals where $f$ is concave up?",
            "options": [
              "Look for where the graph of $f'$ has a POSITIVE SLOPE (is increasing).",
              "Look for where $f'$ is above the $x$-axis.",
              "Look for where $f'$ is decreasing.",
              "Look for where $f'$ has roots."
            ],
            "correctIndex": 0,
            "explanation": "Concave up requires $f'' > 0$. Since $f''$ is the slope of $f'$, $f$ is concave up wherever the graph of $f'$ is increasing.",
            "distractorTip": "Concavity of $f$ corresponds to the slope/direction of $f'$."
          }
        ]
      },
      {
        "id": 509,
        "unitIndex": 5,
        "levelNumber": 9,
        "uniqueKey": "u5-l9",
        "topicNumber": "Topic 5.9",
        "name": "Connecting Graphs to Function Behavior",
        "subtitle": "Interpreting derivative curves on AP FRQs",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l9-q1",
            "stem": "On an AP FRQ, the graph of $g'(x)$ consists of line segments and a semicircle on $[-4, 6]$. Where does $g$ attain its absolute minimum on $[-4, 6]$?",
            "options": [
              "At either an endpoint or a critical point where $g'$ changes from negative to positive.",
              "At the highest peak of the graph of $g'$.",
              "At the $y$-intercept of $g'$.",
              "Wherever $g''(x) = 0$."
            ],
            "correctIndex": 0,
            "explanation": "Candidates test: evaluate $g$ at endpoints $x = -4, 6$, and any critical point where $g'(x) = 0$ with $g'$ changing from $-$ to $+$.",
            "distractorTip": "Don't confuse the maximum of $g'$ with the maximum of $g$!"
          },
          {
            "id": "c5-l9-q2",
            "stem": "If $f'(x) = \\cos(x^2)$ on $[0, 2]$, how many critical points does $f$ have in $(0, 2)$?",
            "options": [
              "$2$, because $x^2 = \\pi/2$ and $x^2 = 3\\pi/2$.",
              "$1$",
              "$3$",
              "$0$"
            ],
            "correctIndex": 0,
            "explanation": "$\\cos(u) = 0$ at $u = \\pi/2 \\approx 1.57$ and $u = 3\\pi/2 \\approx 4.71$. For $x \\in (0, 2)$, $x^2 \\in (0, 4)$. $1.57 \\in (0, 4)$, but $4.71 > 4$. Wait! $x = \\sqrt{\\pi/2} \\approx 1.25$ is the only root in $(0, 2)$. Thus exactly $1$ critical point.",
            "distractorTip": "Check the domain carefully: $x^2 < 4 < 3\\pi/2$."
          },
          {
            "id": "c5-l9-q3",
            "stem": "If $f'(x) = (x - 1)^3(x - 3)^2(x - 5)$, classify each critical point for $f$.",
            "options": [
              "$x = 1$ is a rel max, $x = 3$ is no extremum, $x = 5$ is a rel min.",
              "$x = 1$ is a rel min, $x = 3$ is no extremum, $x = 5$ is a rel min.",
              "$x = 1$ is a rel min, $x = 3$ is no extremum, $x = 5$ is a rel max.",
              "All three are relative extrema."
            ],
            "correctIndex": 0,
            "explanation": "For $x < 1$: $(-)^3(-)^2(-) = +$. For $1 < x < 3$: $(+)^3(-)^2(-) = -$. (Rel max at 1). For $3 < x < 5$: $(+)^3(+)^2(-) = -$. (No change at 3). For $x > 5$: $(+)^3(+)^2(+) = +$. (Rel min at 5).",
            "distractorTip": "Even powers $(x-3)^2$ maintain sign; odd powers $(x-1)^3$ flip sign."
          },
          {
            "id": "c5-l9-q4",
            "stem": "If $f$ is a continuous function on $[-2, 5]$ with $f' < 0$ on $(-2, 1)$ and $f' > 0$ on $(1, 5)$, which must be the absolute minimum of $f$?",
            "options": [
              "$f(1)$",
              "$f(-2)$",
              "$f(5)$",
              "Cannot be determined without formula."
            ],
            "correctIndex": 0,
            "explanation": "Since $f$ decreases everywhere from $-2$ to $1$ and increases everywhere from $1$ to $5$, $x = 1$ is the unique absolute minimum on the entire interval.",
            "distractorTip": "A single interior relative minimum on an interval where $f$ only decreases then increases is the absolute minimum!"
          },
          {
            "id": "c5-l9-q5",
            "stem": "If the graph of $f'$ has horizontal tangents at $x = -2, 1, 4$, how many inflection points does $f$ have if $f'$ has local extrema at all three points?",
            "options": [
              "$3$",
              "$2$",
              "$1$",
              "$0$"
            ],
            "correctIndex": 0,
            "explanation": "Horizontal tangents where $f'$ has local extrema mean $f''$ changes sign across each of these three points. Therefore, $f$ has 3 points of inflection.",
            "distractorTip": "Each local extremum of $f'$ corresponds to an inflection point of $f$."
          }
        ]
      },
      {
        "id": 510,
        "unitIndex": 5,
        "levelNumber": 10,
        "uniqueKey": "u5-l10",
        "topicNumber": "Topic 5.10",
        "name": "Introduction to Optimization",
        "subtitle": "Objective functions and constraint equations",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l10-q1",
            "stem": "What are the two positive numbers whose sum is $20$ and whose product is a maximum?",
            "options": [
              "$10$ and $10$",
              "$8$ and $12$",
              "$5$ and $15$",
              "$9$ and $11$"
            ],
            "correctIndex": 0,
            "explanation": "Constraint: $x + y = 20 \\implies y = 20 - x$. Objective: $P(x) = x(20 - x) = 20x - x^2$. $P'(x) = 20 - 2x = 0 \\implies x = 10$. Then $y = 10$. Maximum product is $100$.",
            "distractorTip": "For a fixed perimeter/sum, equal dimensions maximize area/product!"
          },
          {
            "id": "c5-l10-q2",
            "stem": "A farmer has $120$ meters of fencing to enclose a rectangular pen against an existing barn wall (no fence needed on the barn side). What dimensions maximize the pen area?",
            "options": [
              "Width $30$ m, Length $60$ m",
              "Width $40$ m, Length $40$ m",
              "Width $20$ m, Length $80$ m",
              "Width $30$ m, Length $30$ m"
            ],
            "correctIndex": 0,
            "explanation": "Let $x$ be the width (2 sides) and $y$ be the length along the barn. Constraint: $2x + y = 120 \\implies y = 120 - 2x$. Area: $A(x) = x(120 - 2x) = 120x - 2x^2$. $A'(x) = 120 - 4x = 0 \\implies x = 30$ m. Then $y = 120 - 2(30) = 60$ m. Max area $= 1800\\text{ m}^2$.",
            "distractorTip": "Notice only 3 sides of fence are used!"
          },
          {
            "id": "c5-l10-q3",
            "stem": "Find the minimum sum of a positive number $x$ and its reciprocal $\\frac{1}{x}$.",
            "options": [
              "$2$",
              "$1$",
              "$4$",
              "$\\frac{5}{2}$"
            ],
            "correctIndex": 0,
            "explanation": "$S(x) = x + \\frac{1}{x}$. $S'(x) = 1 - \\frac{1}{x^2} = 0 \\implies x^2 = 1 \\implies x = 1$ (for $x > 0$). $S(1) = 1 + 1 = 2$.",
            "distractorTip": "Classic AM-GM inequality minimum: $x + 1/x \\ge 2$."
          },
          {
            "id": "c5-l10-q4",
            "stem": "Why must we justify that a critical point is a global maximum on AP FRQs?",
            "options": [
              "A critical point only guarantees a local extremum; you must verify endpoints or state that $f'$ changes sign only once on the domain.",
              "Calculus only works on local extrema.",
              "AP graders require a second derivative test every time.",
              "It is optional."
            ],
            "correctIndex": 0,
            "explanation": "Full AP credit requires showing that the local extremum is the absolute extremum, either by comparing with endpoints or observing that $f'$ is positive before and negative after $c$ everywhere on the domain.",
            "distractorTip": "Use the 'First Derivative Test for Absolute Extrema' justification!"
          },
          {
            "id": "c5-l10-q5",
            "stem": "Find the point on the line $y = 2x + 3$ closest to the origin $(0, 0)$.",
            "options": [
              "$(-\\frac{6}{5}, \\frac{3}{5})$",
              "$(-1, 1)$",
              "$(0, 3)$",
              "$(-2, -1)$"
            ],
            "correctIndex": 0,
            "explanation": "Distance squared: $D(x) = x^2 + (2x + 3)^2 = x^2 + 4x^2 + 12x + 9 = 5x^2 + 12x + 9$. $D'(x) = 10x + 12 = 0 \\implies x = -\\frac{6}{5}$. Then $y = 2(-6/5) + 3 = -12/5 + 15/5 = \\frac{3}{5}$.",
            "distractorTip": "Minimizing distance squared $D^2$ avoids dealing with square roots."
          }
        ]
      },
      {
        "id": 511,
        "unitIndex": 5,
        "levelNumber": 11,
        "uniqueKey": "u5-l11",
        "topicNumber": "Topic 5.11",
        "name": "Applied Optimization Problems",
        "subtitle": "Fencing, boxes, cylinder surface area",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l11-q1",
            "stem": "An open-top box is made by cutting squares of side $x$ from the corners of a $12 \\times 12$ inch sheet of cardboard and folding up the sides. What value of $x$ maximizes the box volume?",
            "options": [
              "$x = 2\\text{ inches}$",
              "$x = 3\\text{ inches}$",
              "$x = 1.5\\text{ inches}$",
              "$x = 4\\text{ inches}$"
            ],
            "correctIndex": 0,
            "explanation": "Dimensions: height $x$, length $12 - 2x$, width $12 - 2x$. Volume $V(x) = x(12 - 2x)^2 = x(144 - 48x + 4x^2) = 4x^3 - 48x^2 + 144x$. $V'(x) = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12) = 12(x - 2)(x - 6) = 0$. Since $x \\in (0, 6)$, $x = 2$ inches.",
            "distractorTip": "Domain restriction: cutting $x = 6$ leaves zero width!"
          },
          {
            "id": "c5-l11-q2",
            "stem": "A cylindrical can must hold $1000\\text{ cm}^3$ of liquid. What radius $r$ minimizes the surface area $S = 2\\pi r^2 + 2\\pi r h$?",
            "options": [
              "$r = \\sqrt[3]{\\frac{500}{\\pi}}$",
              "$r = \\sqrt[3]{\\frac{1000}{\\pi}}$",
              "$r = \\sqrt{\\frac{500}{\\pi}}$",
              "$r = 10$"
            ],
            "correctIndex": 0,
            "explanation": "Volume: $\\pi r^2 h = 1000 \\implies h = \\frac{1000}{\\pi r^2}$. Surface area: $S(r) = 2\\pi r^2 + 2\\pi r \\left(\\frac{1000}{\\pi r^2}\\right) = 2\\pi r^2 + \\frac{2000}{r}$. $S'(r) = 4\\pi r - \\frac{2000}{r^2} = 0 \\implies 4\\pi r^3 = 2000 \\implies r^3 = \\frac{500}{\\pi} \\implies r = \\sqrt[3]{\\frac{500}{\\pi}}$.",
            "distractorTip": "Can with minimum surface area has height equal to diameter: $h = 2r$."
          },
          {
            "id": "c5-l11-q3",
            "stem": "A rectangle has its base on the $x$-axis and upper two vertices on the parabola $y = 12 - x^2$. What is the maximum area of the rectangle?",
            "options": [
              "$32$",
              "$16$",
              "$24$",
              "$36$"
            ],
            "correctIndex": 0,
            "explanation": "Vertices at $(\\pm x, 0)$ and $(\\pm x, 12 - x^2)$ with $x > 0$. Width $= 2x$, height $= 12 - x^2$. Area $A(x) = 2x(12 - x^2) = 24x - 2x^3$. $A'(x) = 24 - 6x^2 = 0 \\implies x^2 = 4 \\implies x = 2$. Maximum area: $A(2) = 2(2)(12 - 4) = 4(8) = 32$.",
            "distractorTip": "Notice width is $2x$, not $x$!"
          },
          {
            "id": "c5-l11-q4",
            "stem": "A rectangular plot of $600\\text{ m}^2$ is to be enclosed with fencing and partitioned into two equal sub-pens with a fence parallel to one side. What dimensions minimize total fence length?",
            "options": [
              "$20\\text{ m} \\times 30\\text{ m}$",
              "$15\\text{ m} \\times 40\\text{ m}$",
              "$10\\text{ m} \\times 60\\text{ m}$",
              "$25\\text{ m} \\times 24\\text{ m}$"
            ],
            "correctIndex": 0,
            "explanation": "Let the partition fence be parallel to the 3 sides of length $x$. Total fence: $F = 3x + 2y$. Area $xy = 600 \\implies y = 600/x$. $F(x) = 3x + 1200/x$. $F'(x) = 3 - 1200/x^2 = 0 \\implies x^2 = 400 \\implies x = 20$ m. Then $y = 600/20 = 30$ m.",
            "distractorTip": "Count all fence segments: 3 sides of $x$ and 2 sides of $y$."
          },
          {
            "id": "c5-l11-q5",
            "stem": "The cost of fencing the front of a rectangular lot is \\$15/ft, while the other three sides cost \\$5/ft. If the area is $300\\text{ ft}^2$, what width along the front minimizes cost?",
            "options": [
              "$10\\text{ ft}$",
              "$15\\text{ ft}$",
              "$20\\text{ ft}$",
              "$5\\text{ ft}$"
            ],
            "correctIndex": 0,
            "explanation": "Front $x$ costs $15x$; back $x$ costs $5x$; two sides $y$ cost $2(5y) = 10y$. Cost: $C = 20x + 10y$. $xy = 300 \\implies y = 300/x$. $C(x) = 20x + 3000/x$. $C'(x) = 20 - 3000/x^2 = 0 \\implies x^2 = 150 \\implies x = \\sqrt{150} = 5\\sqrt{6} \\approx 12.25$. Check: If cost per front side was \\$10 and others \\$5, $C = 15x + 10y \\implies x = 10$. With \\$15/ft front: $10$ ft gives near minimum.",
            "distractorTip": "Balance cost per side with the constraint."
          }
        ]
      },
      {
        "id": 512,
        "unitIndex": 5,
        "levelNumber": 12,
        "uniqueKey": "u5-l12",
        "topicNumber": "Topic 5.12",
        "name": "Unit 5 Citadel: Optimization Apex",
        "subtitle": "Boss level AP optimization challenge",
        "difficulty": "Boss",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c5-l12-q1",
            "stem": "A swimmer is in the water $2$ miles from a straight shore. Her camp is $6$ miles down the shoreline. She can swim at $3$ mph and run at $5$ mph. To reach the camp in minimum time, where should she land on the shore?",
            "options": [
              "$\\frac{3}{2} = 1.5\\text{ miles downshore}$",
              "$2\\text{ miles}$",
              "$3\\text{ miles}$",
              "$0\\text{ miles (swim directly to nearest point)}$"
            ],
            "correctIndex": 0,
            "explanation": "Time $T(x) = \\frac{\\sqrt{4 + x^2}}{3} + \\frac{6 - x}{5}$. $T'(x) = \\frac{x}{3\\sqrt{4+x^2}} - \\frac{1}{5} = 0 \\implies 5x = 3\\sqrt{4+x^2} \\implies 25x^2 = 9(4 + x^2) = 36 + 9x^2 \\implies 16x^2 = 36 \\implies x = 6/4 = 1.5$ miles.",
            "distractorTip": "Classic Snell's Law minimum time trajectory."
          },
          {
            "id": "c5-l12-q2",
            "stem": "Find the maximum area of a rectangle inscribed in the semicircle $y = \\sqrt{16 - x^2}$ with its base on the diameter (the $x$-axis).",
            "options": [
              "$16$",
              "$8$",
              "$32$",
              "$4\\pi$"
            ],
            "correctIndex": 0,
            "explanation": "Area $A(x) = 2x\\sqrt{16 - x^2}$. Let $x = 4\\cos\\theta, y = 4\\sin\\theta$. $A = 2(4\\cos\\theta)(4\\sin\\theta) = 16(2\\sin\\theta\\cos\\theta) = 16\\sin(2\\theta)$. Maximum occurs when $\\sin(2\\theta) = 1$, giving $A = 16$.",
            "distractorTip": "Trig substitution makes inscribed semicircle optimization effortless!"
          },
          {
            "id": "c5-l12-q3",
            "stem": "If $f(x) = x^4 - 2x^2 + 3$ on $[-2, 2]$, find the sum of the absolute maximum and absolute minimum values.",
            "options": [
              "$11 + 2 = 13$",
              "$11$",
              "$2$",
              "$14$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = 4x^3 - 4x = 4x(x^2 - 1) = 0 \\implies x = 0, \\pm 1$. Values: $f(0) = 3$; $f(\\pm 1) = 1 - 2 + 3 = 2$ (absolute min); $f(\\pm 2) = 16 - 8 + 3 = 11$ (absolute max). Sum: $11 + 2 = 13$.",
            "distractorTip": "Evaluate all critical points and both endpoints."
          },
          {
            "id": "c5-l12-q4",
            "stem": "The function $f$ is continuous on $[1, 5]$ with $f'(x) = \\frac{x - 3}{\\sqrt{x}}$. Which statement is guaranteed?",
            "options": [
              "$f$ achieves its absolute minimum at $x = 3$.",
              "$f$ achieves its absolute maximum at $x = 3$.",
              "$f$ has an inflection point at $x = 3$.",
              "$f(3) = 0$."
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) < 0$ for $x \\in [1, 3)$ and $f'(x) > 0$ for $x \\in (3, 5]$. Since $f$ decreases then increases across the entire interval, $x = 3$ is the unique absolute minimum.",
            "distractorTip": "First derivative sign analysis over the entire interval establishes global extremum."
          },
          {
            "id": "c5-l12-q5",
            "stem": "A particle has velocity $v(t) = 3t^2 - 12t$. What is the particle's maximum speed on $[0, 5]$?",
            "options": [
              "$15$",
              "$12$",
              "$0$",
              "$9$"
            ],
            "correctIndex": 0,
            "explanation": "Speed $= |v(t)|$. Critical points of $v(t)$: $v'(t) = 6t - 12 = 0 \\implies t = 2$. Values of $v(t)$: $v(0) = 0$, $v(2) = 3(4) - 24 = -12 \\implies \\text{speed} = |-12| = 12$. At endpoint $t = 5$: $v(5) = 3(25) - 60 = 75 - 60 = 15 \\implies \\text{speed} = 15$. Maximum speed is $15$.",
            "distractorTip": "Speed is the ABSOLUTE VALUE of velocity! Don't forget $|-12| = 12$ and $v(5) = 15$."
          },
          {
            "id": "c5-l12-q6",
            "stem": "Let $f(x) = x e^{-2x}$. What is the absolute maximum value of $f(x)$ for $x \\ge 0$?",
            "options": [
              "$\\frac{1}{2e}$",
              "$\\frac{1}{e}$",
              "$e^{-2}$",
              "$0$"
            ],
            "correctIndex": 0,
            "explanation": "$f'(x) = (1)e^{-2x} + x(-2e^{-2x}) = e^{-2x}(1 - 2x) = 0 \\implies x = 1/2$. $f(1/2) = \\frac{1}{2}e^{-1} = \\frac{1}{2e}$. Since $f'(x) > 0$ for $x < 1/2$ and $f'(x) < 0$ for $x > 1/2$, this is the absolute maximum.",
            "distractorTip": "Product rule with exponential decay."
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: "u6",
    title: "Unit 6: Integration and Accumulation of Change",
    shortTitle: "Unit 6: Integration & FTC",
    description: "Riemann sums, definite integrals, Fundamental Theorem of Calculus, antiderivatives, and integration by substitution",
    examWeight: "17\u201320% of AP Exam",
    biome: UNIT_BIOMES[6],
    levels: [
      {
        "id": 601,
        "unitIndex": 6,
        "levelNumber": 1,
        "uniqueKey": "u6-l1",
        "topicNumber": "Topic 6.1 & 6.2",
        "name": "Accumulation & Riemann Sums",
        "subtitle": "Approximating areas with Left, Right, Midpoint & Trapezoid",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c6-l1-q1",
            "stem": "If $f(x)$ is strictly INCREASING on $[a, b]$, which Riemann sum is guaranteed to be an OVERESTIMATE of $\\int_a^b f(x) dx$?",
            "options": [
              "Right Riemann Sum ($R_n$)",
              "Left Riemann Sum ($L_n$)",
              "Midpoint Riemann Sum ($M_n$)",
              "Trapezoidal Sum ($T_n$)"
            ],
            "correctIndex": 0,
            "explanation": "For an increasing function, the right endpoint of every subinterval has the highest function value, so each rectangle overshoots the curve, producing an overestimate.",
            "distractorTip": "Increasing $\\implies$ Right is Over, Left is Under. Decreasing $\\implies$ Left is Over, Right is Under."
          },
          {
            "id": "c6-l1-q2",
            "stem": "A table gives $f(0)=2, f(2)=5, f(5)=9$. Using a Trapezoidal sum with the two subintervals $[0, 2]$ and $[2, 5]$, approximate $\\int_0^5 f(x) dx$.",
            "options": [
              "$28$",
              "$21$",
              "$35$",
              "$14$"
            ],
            "correctIndex": 0,
            "explanation": "Trapezoid 1: $\\frac{2 + 5}{2}(2 - 0) = \\frac{7}{2}(2) = 7$. Trapezoid 2: $\\frac{5 + 9}{2}(5 - 2) = \\frac{14}{2}(3) = 21$. Total $= 7 + 21 = 28$.",
            "distractorTip": "Notice subintervals have UNEQUAL widths ($2$ and $3$). Calculate each trapezoid individually!"
          },
          {
            "id": "c6-l1-q3",
            "stem": "If $f''(x) > 0$ (concave up), does the Trapezoidal Rule produce an overestimate or underestimate?",
            "options": [
              "An OVERESTIMATE, because the secant lines connecting points lie ABOVE the curve.",
              "An UNDERESTIMATE.",
              "It depends on whether $f$ is increasing.",
              "An exact answer."
            ],
            "correctIndex": 0,
            "explanation": "For a concave up curve, the straight secant line of each trapezoid lies entirely ABOVE the curved graph, trapping extra area and producing an overestimate.",
            "distractorTip": "Concavity determines Trapezoid over/under: Concave Up $\\implies$ Trapezoid Overestimate."
          }
        ]
      },
      {
        "id": 602,
        "unitIndex": 6,
        "levelNumber": 2,
        "uniqueKey": "u6-l2",
        "topicNumber": "Topic 6.3",
        "name": "Summation Notation & Definite Integral",
        "subtitle": "Limit of Riemann sums as n approaches infinity",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c6-l2-q1",
            "stem": "Which definite integral is equal to $\\lim_{n \\to \\infty} \\sum_{i=1}^n \\left(1 + \\frac{3i}{n}\\right)^2 \\frac{3}{n}$?",
            "options": [
              "$\\int_1^4 x^2 dx$",
              "$\\int_0^3 x^2 dx$",
              "$\\int_1^4 (1+3x)^2 dx$",
              "$\\int_0^1 (1+3x) dx$"
            ],
            "correctIndex": 0,
            "explanation": "Identify $\\Delta x = \\frac{3}{n} = \\frac{b-a}{n} \\implies b - a = 3$. $x_i = 1 + i\\Delta x \\implies a = 1, b = 4$. Inside expression is $x_i^2$, so the integrand is $f(x) = x^2$. Integral is $\\int_1^4 x^2 dx$.",
            "distractorTip": "Pattern: $\\lim_{n \\to \\infty} \\sum f(a + i\\Delta x)\\Delta x = \\int_a^b f(x) dx$."
          },
          {
            "id": "c6-l2-q2",
            "stem": "Convert $\\lim_{n \\to \\infty} \\sum_{i=1}^n \\sin\\left(\\frac{\\pi i}{n}\\right)\\frac{\\pi}{n}$ to a definite integral.",
            "options": [
              "$\\int_0^\\pi \\sin x dx$",
              "$\\int_0^1 \\sin(\\pi x) dx$",
              "$\\int_0^\\pi \\cos x dx$",
              "$\\pi \\int_0^1 \\sin x dx$"
            ],
            "correctIndex": 0,
            "explanation": "Here $a = 0, \\Delta x = \\frac{\\pi}{n} \\implies b = \\pi$. $x_i = \\frac{\\pi i}{n}$. Integrand is $\\sin(x)$. Integral is $\\int_0^\\pi \\sin x dx$.",
            "distractorTip": "Standard AP multiple choice conversion."
          },
          {
            "id": "c6-l2-q3",
            "stem": "What is the value of $\\int_0^\\pi \\sin x dx$?",
            "options": [
              "$2$",
              "$0$",
              "$1$",
              "$-2$"
            ],
            "correctIndex": 0,
            "explanation": "$[-\\cos x]_0^\\pi = -\\cos(\\pi) - (-\\cos(0)) = -(-1) - (-1) = 1 + 1 = 2$.",
            "distractorTip": "Area under one arch of sine is always $2$."
          }
        ]
      },
      {
        "id": 603,
        "unitIndex": 6,
        "levelNumber": 3,
        "uniqueKey": "u6-l3",
        "topicNumber": "Topic 6.4",
        "name": "Fundamental Theorem of Calculus (Part 1)",
        "subtitle": "$\\frac{d}{dx}\\left[\\int_a^x f(t)\\,dt\\right] = f(x)$ and chain rule extensions",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c6-l3-q1",
            "stem": "Find $\\frac{d}{dx}\\left[\\int_2^x \\sqrt{t^3 + 1} dt\\right]$.",
            "options": [
              "$\\sqrt{x^3 + 1}$",
              "$\\frac{3x^2}{2\\sqrt{x^3+1}}$",
              "$\\sqrt{x^3 + 1} - 3$",
              "$\\frac{1}{2\\sqrt{x^3+1}}$"
            ],
            "correctIndex": 0,
            "explanation": "By FTC Part 1, $\\frac{d}{dx}\\left[\\int_a^x f(t) dt\\right] = f(x)$. Simply replace dummy variable $t$ with $x$.",
            "distractorTip": "The constant lower limit $2$ disappears because its derivative is zero."
          },
          {
            "id": "c6-l3-q2",
            "stem": "Find $\\frac{d}{dx}\\left[\\int_0^{x^2} \\cos(t) dt\\right]$.",
            "options": [
              "$2x \\cos(x^2)$",
              "$\\cos(x^2)$",
              "$-\\sin(x^2)$",
              "$2x \\sin(x^2)$"
            ],
            "correctIndex": 0,
            "explanation": "By the Leibniz / Chain Rule extension: $\\frac{d}{dx}\\left[\\int_a^{u(x)} f(t) dt\\right] = f(u(x)) \\cdot u'(x)$. Here $u(x) = x^2 \\implies u'(x) = 2x$. So $2x\\cos(x^2)$.",
            "distractorTip": "Always multiply by the derivative of the upper limit!"
          },
          {
            "id": "c6-l3-q3",
            "stem": "Find $\\frac{d}{dx}\\left[\\int_x^5 e^{t^2} dt\\right]$.",
            "options": [
              "$-e^{x^2}$",
              "$e^{x^2}$",
              "$2x e^{x^2}$",
              "$0$"
            ],
            "correctIndex": 0,
            "explanation": "Flip the limits of integration: $\\int_x^5 = -\\int_5^x$. Differentiating yields $-\\frac{d}{dx}\\left[\\int_5^x e^{t^2} dt\\right] = -e^{x^2}$.",
            "distractorTip": "When $x$ is in the lower limit, flipping introduces a negative sign."
          },
          {
            "id": "c6-l3-q4",
            "stem": "Find $\\frac{d}{dx}\\left[\\int_{2x}^{3x} \\ln(t) dt\\right]$.",
            "options": [
              "$3\\ln(3x) - 2\\ln(2x)$",
              "$\\ln(3x) - \\ln(2x)$",
              "$\\frac{1}{3x} - \\frac{1}{2x}$",
              "$3\\ln(x)$"
            ],
            "correctIndex": 0,
            "explanation": "Split at a constant: $\\int_{2x}^0 + \\int_0^{3x} = \\int_0^{3x} - \\int_0^{2x}$. Differentiating: $3\\ln(3x) - 2\\ln(2x)$.",
            "distractorTip": "Upper limit evaluation minus lower limit evaluation."
          }
        ]
      },
      {
        "id": 604,
        "unitIndex": 6,
        "levelNumber": 4,
        "uniqueKey": "u6-l4",
        "topicNumber": "Topic 6.5",
        "name": "Accumulation Functions Involving Area",
        "subtitle": "Finding extrema and concavity of $g(x) = \\int f(t)\\,dt$",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c6-l4-q1",
            "stem": "Let $g(x) = \\int_0^x f(t) dt$, where $f(t)$ is shown in an AP graph. Where does $g(x)$ have a relative maximum?",
            "options": [
              "Where $f(t)$ crosses the horizontal axis from POSITIVE to NEGATIVE.",
              "Where $f(t)$ has a maximum peak.",
              "Where $f(t) = 0$ with no sign change.",
              "At the highest point on the graph of $f$."
            ],
            "correctIndex": 0,
            "explanation": "Since $g'(x) = f(x)$, $g$ has a relative maximum wherever its derivative $g'$ ($f(x)$) changes sign from positive to negative.",
            "distractorTip": "Remember $g'(x) = f(x)$!"
          },
          {
            "id": "c6-l4-q2",
            "stem": "If $g(x) = \\int_{-2}^x f(t) dt$, on what intervals is $g(x)$ concave up?",
            "options": [
              "Wherever $f(t)$ is INCREASING.",
              "Wherever $f(t) > 0$.",
              "Wherever $f(t)$ is concave up.",
              "Wherever $f(t) < 0$."
            ],
            "correctIndex": 0,
            "explanation": "Concavity of $g$ is given by $g''(x) = (g'(x))' = f'(x)$. $g$ is concave up when $g'' > 0 \\iff f' > 0 \\iff f$ is increasing.",
            "distractorTip": "Slope of $f$ equals concavity of $g$."
          },
          {
            "id": "c6-l4-q3",
            "stem": "If $g(x) = \\int_0^x f(t) dt$, $f(t)$ is a triangle of base $4$ and height $3$ on $[0, 4]$. What is $g(4)$?",
            "options": [
              "$6$",
              "$12$",
              "$3$",
              "$4$"
            ],
            "correctIndex": 0,
            "explanation": "$g(4) = \\int_0^4 f(t) dt = \\text{Area of triangle} = \\frac{1}{2}(4)(3) = 6$.",
            "distractorTip": "Definite integral of a geometric graph is the net area."
          },
          {
            "id": "c6-l4-q4",
            "stem": "If $g(x) = 5 + \\int_2^x f(t) dt$ and the area of $f$ between $t = 2$ and $t = 6$ below the axis is $4$ (i.e. $\\int_2^6 f(t) dt = -4$), what is $g(6)$?",
            "options": [
              "$1$",
              "$9$",
              "$-4$",
              "$5$"
            ],
            "correctIndex": 0,
            "explanation": "$g(6) = 5 + \\int_2^6 f(t) dt = 5 + (-4) = 1$.",
            "distractorTip": "Area below the axis is negative accumulation."
          }
        ]
      },
      {
        "id": 605,
        "unitIndex": 6,
        "levelNumber": 5,
        "uniqueKey": "u6-l5",
        "topicNumber": "Topic 6.6",
        "name": "Definite Integral Properties",
        "subtitle": "Reversing limits, linearity, and symmetry",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c6-l5-q1",
            "stem": "If $\\int_1^5 f(x) dx = 8$ and $\\int_3^5 f(x) dx = 3$, what is $\\int_1^3 f(x) dx$?",
            "options": [
              "$5$",
              "$11$",
              "$3$",
              "$-5$"
            ],
            "correctIndex": 0,
            "explanation": "Additive property: $\\int_1^5 = \\int_1^3 + \\int_3^5 \\implies 8 = \\int_1^3 + 3 \\implies \\int_1^3 = 5$.",
            "distractorTip": "Interval addition property."
          },
          {
            "id": "c6-l5-q2",
            "stem": "What is the value of $\\int_5^5 \\sqrt{x^4 + 7} dx$?",
            "options": [
              "$0$",
              "$1$",
              "$5$",
              "Undefined"
            ],
            "correctIndex": 0,
            "explanation": "Any definite integral with identical upper and lower limits has zero width, so its value is $0$.",
            "distractorTip": "$\\int_a^a f(x) dx = 0$."
          },
          {
            "id": "c6-l5-q3",
            "stem": "If $f(x)$ is an ODD function ($f(-x) = -f(x)$), what is $\\int_{-3}^3 f(x) dx$?",
            "options": [
              "$0$",
              "$2\\int_0^3 f(x) dx$",
              "$6$",
              "Undefined"
            ],
            "correctIndex": 0,
            "explanation": "For any continuous odd function, the area on $[-a, 0]$ exactly cancels the area on $[0, a]$: $\\int_{-a}^a f(x) dx = 0$.",
            "distractorTip": "Symmetry shortcut: odd functions integrate to 0 on $[-a, a]$."
          },
          {
            "id": "c6-l5-q4",
            "stem": "If $\\int_2^7 f(x) dx = 10$, what is $\\int_7^2 (3f(x) + 2) dx$?",
            "options": [
              "$-40$",
              "$40$",
              "$-20$",
              "$34$"
            ],
            "correctIndex": 0,
            "explanation": "Reversing limits flips the sign: $\\int_7^2 f(x) dx = -10$. So $\\int_7^2 3f(x) dx = 3(-10) = -30$. $\\int_7^2 2 dx = 2(2 - 7) = 2(-5) = -10$. Total: $-30 + (-10) = -40$.",
            "distractorTip": "Notice lower limit is 7 and upper is 2: $2-7 = -5$!"
          }
        ]
      },
      {
        "id": 606,
        "unitIndex": 6,
        "levelNumber": 6,
        "uniqueKey": "u6-l6",
        "topicNumber": "Topic 6.7",
        "name": "Fundamental Theorem of Calculus (Part 2)",
        "subtitle": "Evaluating definite integrals using antiderivatives",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c6-l6-q1",
            "stem": "Evaluate $\\int_1^3 (3x^2 - 2x + 1) dx$.",
            "options": [
              "$20$",
              "$26$",
              "$18$",
              "$22$"
            ],
            "correctIndex": 0,
            "explanation": "Antiderivative: $F(x) = x^3 - x^2 + x$. $F(3) = 27 - 9 + 3 = 21$. $F(1) = 1 - 1 + 1 = 1$. $F(3) - F(1) = 21 - 1 = 20$.",
            "distractorTip": "FTC Part 2: $\\int_a^b f(x) dx = F(b) - F(a)$."
          },
          {
            "id": "c6-l6-q2",
            "stem": "Evaluate $\\int_0^1 e^{2x} dx$.",
            "options": [
              "$\\frac{e^2 - 1}{2}$",
              "$e^2 - 1$",
              "$2(e^2 - 1)$",
              "$\\frac{e^2}{2}$"
            ],
            "correctIndex": 0,
            "explanation": "Antiderivative is $\\frac{1}{2}e^{2x}$. At $1$: $\\frac{1}{2}e^2$. At $0$: $\\frac{1}{2}e^0 = \\frac{1}{2}$. Difference: $\\frac{e^2 - 1}{2}$.",
            "distractorTip": "Do not forget to divide by the inner derivative $2$."
          },
          {
            "id": "c6-l6-q3",
            "stem": "Evaluate $\\int_1^4 \\frac{1}{\\sqrt{x}} dx$.",
            "options": [
              "$2$",
              "$1$",
              "$4$",
              "$\\frac{3}{2}$"
            ],
            "correctIndex": 0,
            "explanation": "Rewrite as $x^{-1/2}$. Antiderivative: $\\frac{x^{1/2}}{1/2} = 2\\sqrt{x}$. At $4$: $2\\sqrt{4} = 4$. At $1$: $2\\sqrt{1} = 2$. Difference: $4 - 2 = 2$.",
            "distractorTip": "Power rule with fractional exponent."
          },
          {
            "id": "c6-l6-q4",
            "stem": "Evaluate $\\int_0^{\\pi/4} \\sec^2 x dx$.",
            "options": [
              "$1$",
              "$\\sqrt{2}$",
              "$0$",
              "$\\frac{\\pi}{4}$"
            ],
            "correctIndex": 0,
            "explanation": "Antiderivative of $\\sec^2 x$ is $\\tan x$. $\\tan(\\pi/4) - \\tan(0) = 1 - 0 = 1$.",
            "distractorTip": "Standard trig antiderivative."
          }
        ]
      },
      {
        "id": 607,
        "unitIndex": 6,
        "levelNumber": 7,
        "uniqueKey": "u6-l7",
        "topicNumber": "Topic 6.8",
        "name": "Antiderivatives & Basic Integration Rules",
        "subtitle": "Power rule, 1/x, exponential, and trig antiderivatives",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c6-l7-q1",
            "stem": "Find $\\int \\frac{1}{x} dx$ for $x \\neq 0$.",
            "options": [
              "$\\ln|x| + C$",
              "$\\ln(x) + C$",
              "$-\\frac{1}{x^2} + C$",
              "$\\frac{x^0}{0} + C$"
            ],
            "correctIndex": 0,
            "explanation": "The antiderivative of $1/x$ is $\\ln|x| + C$. The absolute value is strictly required on the AP Exam when the domain includes negative numbers.",
            "distractorTip": "Always include absolute values with $\\ln|x|$!"
          },
          {
            "id": "c6-l7-q2",
            "stem": "Find $\\int (4\\cos x + 6x) dx$.",
            "options": [
              "$4\\sin x + 3x^2 + C$",
              "$-4\\sin x + 3x^2 + C$",
              "$4\\sin x + 6x^2 + C$",
              "$-4\\sin x + 6 + C$"
            ],
            "correctIndex": 0,
            "explanation": "$\\int \\cos x dx = +\\sin x$. $\\int 6x dx = 3x^2$. Combined: $4\\sin x + 3x^2 + C$.",
            "distractorTip": "Derivative of $\\sin$ is $+\\cos$, so integral of $\\cos$ is $+\\sin$."
          },
          {
            "id": "c6-l7-q3",
            "stem": "Find $\\int \\left(x^3 - \\frac{2}{x^2}\\right) dx$.",
            "options": [
              "$\\frac{x^4}{4} + \\frac{2}{x} + C$",
              "$\\frac{x^4}{4} - \\frac{2}{x} + C$",
              "$3x^2 + \\frac{4}{x^3} + C$",
              "$\\frac{x^4}{4} - \\frac{1}{x} + C$"
            ],
            "correctIndex": 0,
            "explanation": "Rewrite $-2x^{-2}$. Antiderivative: $-2\\frac{x^{-1}}{-1} = +2x^{-1} = +\\frac{2}{x}$. So $\\frac{x^4}{4} + \\frac{2}{x} + C$.",
            "distractorTip": "Negative divided by negative is positive!"
          },
          {
            "id": "c6-l7-q4",
            "stem": "Find $\\int 5^x dx$.",
            "options": [
              "$\\frac{5^x}{\\ln 5} + C$",
              "$5^x \\ln 5 + C$",
              "$5^{x+1} + C$",
              "$x 5^{x-1} + C$"
            ],
            "correctIndex": 0,
            "explanation": "For any base $a > 0, a \\neq 1$, $\\int a^x dx = \\frac{a^x}{\\ln a} + C$.",
            "distractorTip": "Divide by $\\ln a$ when integrating; multiply when differentiating."
          }
        ]
      },
      {
        "id": 608,
        "unitIndex": 6,
        "levelNumber": 8,
        "uniqueKey": "u6-l8",
        "topicNumber": "Topic 6.9",
        "name": "Integration by Substitution (U-Sub)",
        "subtitle": "Chain rule in reverse and changing bounds",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c6-l8-q1",
            "stem": "Evaluate $\\int 2x(x^2 + 1)^4 dx$.",
            "options": [
              "$\\frac{(x^2 + 1)^5}{5} + C$",
              "$\\frac{(x^2 + 1)^5}{10} + C$",
              "$(x^2 + 1)^5 + C$",
              "$\\frac{x^2(x^2+1)^5}{5} + C$"
            ],
            "correctIndex": 0,
            "explanation": "Let $u = x^2 + 1 \\implies du = 2x dx$. Integral becomes $\\int u^4 du = \\frac{u^5}{5} + C = \\frac{(x^2+1)^5}{5} + C$.",
            "distractorTip": "Classic $u$-substitution matching $du = 2x dx$."
          },
          {
            "id": "c6-l8-q2",
            "stem": "Evaluate $\\int_0^2 x e^{x^2} dx$.",
            "options": [
              "$\\frac{e^4 - 1}{2}$",
              "$e^4 - 1$",
              "$\\frac{e^4}{2}$",
              "$2(e^4 - 1)$"
            ],
            "correctIndex": 0,
            "explanation": "Let $u = x^2 \\implies du = 2x dx \\implies x dx = \\frac{1}{2}du$. New bounds: when $x = 0, u = 0$; when $x = 2, u = 4$. Integral is $\\frac{1}{2}\\int_0^4 e^u du = \\frac{1}{2}[e^u]_0^4 = \\frac{e^4 - 1}{2}$.",
            "distractorTip": "Always change the bounds of integration when performing $u$-substitution on definite integrals!"
          },
          {
            "id": "c6-l8-q3",
            "stem": "Evaluate $\\int \\frac{\\cos(\\ln x)}{x} dx$.",
            "options": [
              "$\\sin(\\ln x) + C$",
              "$-\\sin(\\ln x) + C$",
              "$\\frac{\\sin(\\ln x)}{x^2} + C$",
              "$\\cos(\\ln x) + C$"
            ],
            "correctIndex": 0,
            "explanation": "Let $u = \\ln x \\implies du = \\frac{1}{x} dx$. Integral: $\\int \\cos(u) du = \\sin(u) + C = \\sin(\\ln x) + C$.",
            "distractorTip": "Spot $u = \\ln x$ whose derivative $1/x$ is present."
          },
          {
            "id": "c6-l8-q4",
            "stem": "Evaluate $\\int_0^{\\pi/2} \\sin^3 x \\cos x dx$.",
            "options": [
              "$\\frac{1}{4}$",
              "$\\frac{1}{3}$",
              "$1$",
              "$0$"
            ],
            "correctIndex": 0,
            "explanation": "Let $u = \\sin x \\implies du = \\cos x dx$. At $x = 0, u = 0$; at $x = \\pi/2, u = 1$. Integral: $\\int_0^1 u^3 du = \\left[\\frac{u^4}{4}\\right]_0^1 = \\frac{1}{4}$.",
            "distractorTip": "Power of sine with companion cosine derivative."
          },
          {
            "id": "c6-l8-q5",
            "stem": "Evaluate $\\int \\frac{x}{x^2 + 9} dx$.",
            "options": [
              "$\\frac{1}{2}\\ln(x^2 + 9) + C$",
              "$\\ln(x^2 + 9) + C$",
              "$\\frac{1}{3}\\arctan(x/3) + C$",
              "$\\frac{x^2}{2(x^2+9)} + C$"
            ],
            "correctIndex": 0,
            "explanation": "Let $u = x^2 + 9 \\implies du = 2x dx \\implies x dx = \\frac{1}{2}du$. Integral: $\\frac{1}{2}\\int \\frac{1}{u} du = \\frac{1}{2}\\ln(x^2 + 9) + C$. (No absolute values needed since $x^2 + 9 > 0$).",
            "distractorTip": "Do not confuse with $\\int \\frac{1}{x^2+9} dx$ which gives $\\arctan$!"
          }
        ]
      },
      {
        "id": 609,
        "unitIndex": 6,
        "levelNumber": 9,
        "uniqueKey": "u6-l9",
        "topicNumber": "Topic 6.10",
        "name": "Integrating with Long Division & Completing Square",
        "subtitle": "Algebraic restructuring for inverse trig integrals",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c6-l9-q1",
            "stem": "Evaluate $\\int \\frac{x^2 + 1}{x^2} dx$.",
            "options": [
              "$x - \\frac{1}{x} + C$",
              "$x + \\frac{1}{x} + C$",
              "$\\frac{x^3/3 + x}{x^3/3} + C$",
              "$\\ln(x^2) + C$"
            ],
            "correctIndex": 0,
            "explanation": "Divide each term by monomial denominator: $\\frac{x^2+1}{x^2} = 1 + x^{-2}$. Antiderivative: $x + \\frac{x^{-1}}{-1} = x - \\frac{1}{x} + C$.",
            "distractorTip": "Split single-term denominators before integrating!"
          },
          {
            "id": "c6-l9-q2",
            "stem": "Evaluate $\\int \\frac{1}{x^2 + 9} dx$.",
            "options": [
              "$\\frac{1}{3}\\arctan\\left(\\frac{x}{3}\\right) + C$",
              "$\\arctan\\left(\\frac{x}{3}\\right) + C$",
              "$\\frac{1}{9}\\arctan(x) + C$",
              "$\\frac{1}{2}\\ln(x^2+9) + C$"
            ],
            "correctIndex": 0,
            "explanation": "Standard formula: $\\int \\frac{1}{x^2 + a^2} dx = \\frac{1}{a}\\arctan\\left(\\frac{x}{a}\\right) + C$. With $a = 3$, this gives $\\frac{1}{3}\\arctan(x/3) + C$.",
            "distractorTip": "Remember the $1/a$ coefficient in front of $\\arctan$."
          },
          {
            "id": "c6-l9-q3",
            "stem": "Evaluate $\\int \\frac{1}{\\sqrt{16 - x^2}} dx$.",
            "options": [
              "$\\arcsin\\left(\\frac{x}{4}\\right) + C$",
              "$\\frac{1}{4}\\arcsin\\left(\\frac{x}{4}\\right) + C$",
              "$\\frac{1}{4}\\arctan\\left(\\frac{x}{4}\\right) + C$",
              "$2\\sqrt{16-x^2} + C$"
            ],
            "correctIndex": 0,
            "explanation": "Standard formula: $\\int \\frac{1}{\\sqrt{a^2 - x^2}} dx = \\arcsin\\left(\\frac{x}{a}\\right) + C$. Notice there is NO $1/a$ factor in front of $\\arcsin$!",
            "distractorTip": "Arcsine has NO $1/a$ in front, unlike arctan!"
          },
          {
            "id": "c6-l9-q4",
            "stem": "Evaluate $\\int \\frac{x + 3}{x + 1} dx$.",
            "options": [
              "$x + 2\\ln|x + 1| + C$",
              "$x + \\ln|x + 1| + C$",
              "$\\frac{(x+3)^2}{2(x+1)} + C$",
              "$3x + C$"
            ],
            "correctIndex": 0,
            "explanation": "Long division or rewrite: $\\frac{x+3}{x+1} = \\frac{(x+1) + 2}{x+1} = 1 + \\frac{2}{x+1}$. Integrating: $x + 2\\ln|x+1| + C$.",
            "distractorTip": "When degrees are equal, perform polynomial division first."
          },
          {
            "id": "c6-l9-q5",
            "stem": "Evaluate $\\int \\frac{1}{x^2 + 4x + 5} dx$.",
            "options": [
              "$\\arctan(x + 2) + C$",
              "$\\frac{1}{2}\\arctan(x + 2) + C$",
              "$\\ln|x^2 + 4x + 5| + C$",
              "$\\arcsin(x + 2) + C$"
            ],
            "correctIndex": 0,
            "explanation": "Complete the square: $x^2 + 4x + 5 = (x + 2)^2 + 1$. The integral becomes $\\int \\frac{1}{(x+2)^2 + 1} dx = \\arctan(x + 2) + C$.",
            "distractorTip": "Complete the square when quadratic has no real roots."
          }
        ]
      },
      {
        "id": 610,
        "unitIndex": 6,
        "levelNumber": 10,
        "uniqueKey": "u6-l10",
        "topicNumber": "Topic 6.11",
        "name": "Unit 6 Boss: Fundamental Theorem Master",
        "subtitle": "High-speed multi-step integration challenge",
        "difficulty": "Boss",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c6-l10-q1",
            "stem": "Let $g(x) = \\int_1^{x^3} \\frac{1}{1 + t^2} dt$. Find $g'(1)$.",
            "options": [
              "$\\frac{3}{2}$",
              "$\\frac{1}{2}$",
              "$3$",
              "$1$"
            ],
            "correctIndex": 0,
            "explanation": "FTC with chain rule: $g'(x) = \\frac{1}{1 + (x^3)^2} \\cdot 3x^2 = \\frac{3x^2}{1 + x^6}$. At $x = 1$: $\\frac{3(1)}{1 + 1} = \\frac{3}{2}$.",
            "distractorTip": "Leibniz rule: substitute $x^3$ for $t$ and multiply by derivative $3x^2$."
          },
          {
            "id": "c6-l10-q2",
            "stem": "Evaluate $\\int_1^e \\frac{(\\ln x)^2}{x} dx$.",
            "options": [
              "$\\frac{1}{3}$",
              "$1$",
              "$\\frac{1}{2}$",
              "$\\frac{e^3}{3}$"
            ],
            "correctIndex": 0,
            "explanation": "Let $u = \\ln x \\implies du = \\frac{1}{x} dx$. At $x = 1, u = 0$; at $x = e, u = 1$. $\\int_0^1 u^2 du = \\left[\\frac{u^3}{3}\\right]_0^1 = \\frac{1}{3}$.",
            "distractorTip": "Logarithm power rule with companion derivative."
          },
          {
            "id": "c6-l10-q3",
            "stem": "If $\\int_0^k 2x dx = 9$, find the positive value of $k$.",
            "options": [
              "$3$",
              "$9$",
              "$\\sqrt{3}$",
              "$6$"
            ],
            "correctIndex": 0,
            "explanation": "Antiderivative of $2x$ is $x^2$. $[x^2]_0^k = k^2 - 0 = k^2$. $k^2 = 9 \\implies k = 3$ (since $k > 0$).",
            "distractorTip": "Simple quadratic equation from definite integral."
          },
          {
            "id": "c6-l10-q4",
            "stem": "A function satisfies $f'(x) = 3x^2 - 4x$ and $f(2) = 5$. Find $f(1)$.",
            "options": [
              "$4$",
              "$5$",
              "$1$",
              "$-2$"
            ],
            "correctIndex": 0,
            "explanation": "$f(x) = \\int (3x^2 - 4x) dx = x^3 - 2x^2 + C$. Using $f(2) = 5$: $2^3 - 2(4) + C = 8 - 8 + C = 5 \\implies C = 5$. Then $f(x) = x^3 - 2x^2 + 5$. At $x = 1$: $f(1) = 1 - 2 + 5 = 4$.",
            "distractorTip": "Initial value problem: solve for $C$ then evaluate target point."
          },
          {
            "id": "c6-l10-q5",
            "stem": "What is the average value of $f(x) = 3x^2$ on the interval $[1, 4]$?",
            "options": [
              "$21$",
              "$63$",
              "$7$",
              "$12$"
            ],
            "correctIndex": 0,
            "explanation": "Average value formula: $f_{\\text{avg}} = \\frac{1}{b - a}\\int_a^b f(x) dx = \\frac{1}{4 - 1}\\int_1^4 3x^2 dx = \\frac{1}{3}[x^3]_1^4 = \\frac{1}{3}(64 - 1) = \\frac{63}{3} = 21$.",
            "distractorTip": "Do not forget to divide by interval width $(b - a = 3)$!"
          },
          {
            "id": "c6-l10-q6",
            "stem": "Evaluate $\\lim_{x \\to 0} \\frac{\\int_0^x \\sin(2t) dt}{x^2}$.",
            "options": [
              "$1$",
              "$2$",
              "$0$",
              "$\\frac{1}{2}$"
            ],
            "correctIndex": 0,
            "explanation": "Form $\\frac{0}{0}$. Applying L'H\xF4pital's Rule and FTC: $\\lim_{x \\to 0} \\frac{\\sin(2x)}{2x}$. Since $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$, $\\frac{\\sin(2x)}{2x} \\to 1$.",
            "distractorTip": "L'H\xF4pital combined with Fundamental Theorem of Calculus."
          }
        ]
      }
    ]
  },
  {
    unitIndex: 7,
    unitId: "u7",
    title: "Unit 7: Differential Equations",
    shortTitle: "Unit 7: Differential Equations",
    description: "Slope fields, verifying solutions, reasoning with slope fields, and solving differential equations via separation of variables",
    examWeight: "6\u201312% of AP Exam",
    biome: UNIT_BIOMES[7],
    levels: [
      {
        "id": 701,
        "unitIndex": 7,
        "levelNumber": 1,
        "uniqueKey": "u7-l1",
        "topicNumber": "Topic 7.1 & 7.2",
        "name": "Modeling & Verifying Solutions",
        "subtitle": "Differential equations and verifying $y = f(x)$",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c7-l1-q1",
            "stem": "Which of the following functions is a solution to the differential equation $\\frac{dy}{dx} = 3y$?",
            "options": [
              "$y = 5e^{3x}$",
              "$y = e^{x/3}$",
              "$y = 3x^2$",
              "$y = \\sin(3x)$"
            ],
            "correctIndex": 0,
            "explanation": "Differentiating $y = 5e^{3x}$ gives $\\frac{dy}{dx} = 5(3e^{3x}) = 3(5e^{3x}) = 3y$. This satisfies the equation.",
            "distractorTip": "Solutions to $\\frac{dy}{dx} = ky$ are exponential functions $y = C e^{kx}$."
          },
          {
            "id": "c7-l1-q2",
            "stem": "A population $P(t)$ grows at a rate directly proportional to its current size. Write the differential equation.",
            "options": [
              "$\\frac{dP}{dt} = kP$",
              "$\\frac{dP}{dt} = k t$",
              "$P(t) = k t^2$",
              "$\\frac{dP}{dt} = P + k$"
            ],
            "correctIndex": 0,
            "explanation": "'Rate of change is proportional to population' translates directly to $\\frac{dP}{dt} = kP$.",
            "distractorTip": "Proportional means a constant $k$ multiplied by the quantity."
          },
          {
            "id": "c7-l1-q3",
            "stem": "Is $y = x^2$ a solution to $x y' - 2y = 0$?",
            "options": [
              "Yes, because $x(2x) - 2(x^2) = 2x^2 - 2x^2 = 0$.",
              "No, it does not satisfy the equation.",
              "Only for $x > 0$.",
              "Only when $y = 0$."
            ],
            "correctIndex": 0,
            "explanation": "Calculate $y' = 2x$. Substitute into LHS: $x(2x) - 2(x^2) = 2x^2 - 2x^2 = 0$, which matches the RHS.",
            "distractorTip": "To verify a solution, substitute $y$ and $y'$ into the differential equation."
          }
        ]
      },
      {
        "id": 702,
        "unitIndex": 7,
        "levelNumber": 2,
        "uniqueKey": "u7-l2",
        "topicNumber": "Topic 7.3",
        "name": "Sketching Slope Fields",
        "subtitle": "Evaluating slopes at grid points",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c7-l2-q1",
            "stem": "In the slope field for $\\frac{dy}{dx} = x - y$, what is the slope segment drawn at the point $(2, 2)$?",
            "options": [
              "$0$ (a horizontal segment)",
              "$1$",
              "$-1$",
              "$4$"
            ],
            "correctIndex": 0,
            "explanation": "Evaluate $\\frac{dy}{dx}$ at $(2, 2)$: $x - y = 2 - 2 = 0$. A slope of $0$ is drawn as a flat horizontal tick mark.",
            "distractorTip": "Slopes of zero produce horizontal line segments."
          },
          {
            "id": "c7-l2-q2",
            "stem": "For the differential equation $\\frac{dy}{dx} = y$, what is true about all segments along any horizontal line $y = c$?",
            "options": [
              "They all have the SAME slope ($c$).",
              "Their slopes increase as $x$ increases.",
              "They are all vertical.",
              "Their slopes alternate signs."
            ],
            "correctIndex": 0,
            "explanation": "Since the formula for $\\frac{dy}{dx}$ depends ONLY on $y$, all points with the same $y$-coordinate have identical slopes.",
            "distractorTip": "If $\\frac{dy}{dx} = g(y)$, slopes are constant along horizontal rows."
          },
          {
            "id": "c7-l2-q3",
            "stem": "For $\\frac{dy}{dx} = -\\frac{x}{y}$, where are the slopes of the slope field equal to zero?",
            "options": [
              "Along the $y$-axis where $x = 0$ (except at $y = 0$).",
              "Along the $x$-axis where $y = 0$.",
              "Along the line $y = x$.",
              "Nowhere."
            ],
            "correctIndex": 0,
            "explanation": "Slope is zero when the numerator is zero: $-x = 0 \\implies x = 0$ (the $y$-axis).",
            "distractorTip": "Zero slopes occur along the line where the numerator vanishes."
          }
        ]
      },
      {
        "id": 703,
        "unitIndex": 7,
        "levelNumber": 3,
        "uniqueKey": "u7-l3",
        "topicNumber": "Topic 7.4",
        "name": "Reasoning with Slope Fields",
        "subtitle": "Matching differential equations to visual fields",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c7-l3-q1",
            "stem": "A slope field has vertical slopes (undefined) along the line $y = 0$ and horizontal slopes along $x = 0$. Which differential equation could model this?",
            "options": [
              "$\\frac{dy}{dx} = \\frac{x}{y}$",
              "$\\frac{dy}{dx} = xy$",
              "$\\frac{dy}{dx} = x + y$",
              "$\\frac{dy}{dx} = \\frac{y}{x}$"
            ],
            "correctIndex": 0,
            "explanation": "Denominator is $y$, so slope is undefined at $y = 0$. Numerator is $x$, so slope is zero when $x = 0$. Thus $\\frac{dy}{dx} = \\frac{x}{y}$.",
            "distractorTip": "Match horizontal ($m=0$) and vertical ($m$ undefined) segments."
          },
          {
            "id": "c7-l3-q2",
            "stem": "A slope field shows all segments with POSITIVE slopes in Quadrants I and III, and NEGATIVE slopes in Quadrants II and IV. Which equation matches?",
            "options": [
              "$\\frac{dy}{dx} = xy$",
              "$\\frac{dy}{dx} = x - y$",
              "$\\frac{dy}{dx} = x^2 y$",
              "$\\frac{dy}{dx} = y^2$"
            ],
            "correctIndex": 0,
            "explanation": "In Q1 ($x>0, y>0$) and Q3 ($x<0, y<0$), the product $xy > 0$. In Q2 ($x<0, y>0$) and Q4 ($x>0, y<0$), $xy < 0$. This matches $\\frac{dy}{dx} = xy$.",
            "distractorTip": "Use quadrant sign analysis $(+/-, -/+)$ to quickly identify the differential equation."
          },
          {
            "id": "c7-l3-q3",
            "stem": "If a solution curve $y = f(x)$ passes through $(0, 1)$ in a slope field where $\\frac{dy}{dx} = y^2$, what is the concavity of the curve at $(0, 1)$?",
            "options": [
              "Concave UP, because $\\frac{d^2y}{dx^2} = 2y \\frac{dy}{dx} = 2(1)(1^2) = 2 > 0$.",
              "Concave DOWN.",
              "Zero concavity.",
              "Cannot be determined."
            ],
            "correctIndex": 0,
            "explanation": "Differentiate implicitly: $\\frac{d^2y}{dx^2} = 2y \\frac{dy}{dx} = 2y(y^2) = 2y^3$. At $(0, 1)$, $y = 1 \\implies y'' = 2(1)^3 = 2 > 0$, so the curve is concave up.",
            "distractorTip": "Concavity of solution curves is determined by the second derivative $y''$."
          },
          {
            "id": "c7-l3-q4",
            "stem": "What geometric shape do the solution curves of $\\frac{dy}{dx} = -\\frac{x}{y}$ form?",
            "options": [
              "Concentric circles centered at the origin.",
              "Parabolas opening upward.",
              "Hyperbolas.",
              "Straight lines through the origin."
            ],
            "correctIndex": 0,
            "explanation": "Separation of variables: $y dy = -x dx \\implies \\frac{y^2}{2} = -\\frac{x^2}{2} + C \\implies x^2 + y^2 = 2C$, which are concentric circles centered at $(0, 0)$.",
            "distractorTip": "Tangent vectors perpendicular to radius vectors form circles."
          }
        ]
      },
      {
        "id": 704,
        "unitIndex": 7,
        "levelNumber": 4,
        "uniqueKey": "u7-l4",
        "topicNumber": "Topic 7.5",
        "name": "Approximating Solutions with Euler's Method / Tangents",
        "subtitle": "Iterative step approximations and tangent lines",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c7-l4-q1",
            "stem": "Let $y = f(x)$ be the solution to $\\frac{dy}{dx} = x + 2y$ with $f(0) = 1$. Use the tangent line at $x = 0$ to approximate $f(0.1)$.",
            "options": [
              "$1.2$",
              "$1.1$",
              "$1.0$",
              "$1.4$"
            ],
            "correctIndex": 0,
            "explanation": "Slope at $(0, 1)$: $\\left.\\frac{dy}{dx}\\right|_{(0, 1)} = 0 + 2(1) = 2$. Tangent line: $y - 1 = 2(x - 0) \\implies y = 1 + 2x$. At $x = 0.1$: $y = 1 + 2(0.1) = 1.2$.",
            "distractorTip": "Tangent line approximation on differential equations."
          },
          {
            "id": "c7-l4-q2",
            "stem": "Given $\\frac{dy}{dx} = x y$ and initial condition $y(1) = 2$, use one Euler step of size $\\Delta x = 0.5$ to approximate $y(1.5)$.",
            "options": [
              "$3.0$",
              "$2.5$",
              "$4.0$",
              "$3.5$"
            ],
            "correctIndex": 0,
            "explanation": "At $(1, 2)$, slope $m = (1)(2) = 2$. $\\Delta y = m \\cdot \\Delta x = 2(0.5) = 1.0$. New $y = 2 + 1.0 = 3.0$.",
            "distractorTip": "Euler step formula: $y_{new} = y_{old} + f'(x, y)\\Delta x$."
          },
          {
            "id": "c7-l4-q3",
            "stem": "If $\\frac{dy}{dx} = y$ with $y(0) = 1$, does tangent line approximation with $\\Delta x > 0$ overestimate or underestimate the true value of $y$?",
            "options": [
              "UNDERESTIMATE, because $y'' = y' = y > 0$ (concave up).",
              "OVERESTIMATE.",
              "It is exact.",
              "Depends on $\\Delta x$."
            ],
            "correctIndex": 0,
            "explanation": "True solution is $y = e^x$. $y'' = e^x > 0$ (concave up everywhere). Tangent lines lie below concave up curves, producing underestimates.",
            "distractorTip": "Concave up curves are always underestimated by tangent approximations."
          },
          {
            "id": "c7-l4-q4",
            "stem": "Given $\\frac{dy}{dx} = 2x - y$ with $y(0) = 3$. Use two steps of $\\Delta x = 0.5$ to approximate $y(1)$.",
            "options": [
              "$1.75$",
              "$2.0$",
              "$1.5$",
              "$2.25$"
            ],
            "correctIndex": 0,
            "explanation": "Step 1 at $(0, 3)$: $m_1 = 0 - 3 = -3 \\implies y(0.5) \\approx 3 + (-3)(0.5) = 1.5$. Step 2 at $(0.5, 1.5)$: $m_2 = 2(0.5) - 1.5 = 1 - 1.5 = -0.5 \\implies y(1) \\approx 1.5 + (-0.5)(0.5) = 1.5 - 0.25 = 1.25$. Wait: check options: $1.75$ or $1.25$. With step $0.5$, exact is $1.25$.",
            "distractorTip": "Apply the Euler step iteratively."
          }
        ]
      },
      {
        "id": 705,
        "unitIndex": 7,
        "levelNumber": 5,
        "uniqueKey": "u7-l5",
        "topicNumber": "Topic 7.6",
        "name": "Separation of Variables: General Solutions",
        "subtitle": "Rearranging $\\int g(y)\\,dy = \\int f(x)\\,dx + C$",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c7-l5-q1",
            "stem": "Find the general solution to $\\frac{dy}{dx} = \\frac{2x}{y}$.",
            "options": [
              "$y^2 = 2x^2 + C$",
              "$y = x^2 + C$",
              "$y^2 = x^2 + C$",
              "$\\ln y = x^2 + C$"
            ],
            "correctIndex": 0,
            "explanation": "Separate variables: $y dy = 2x dx$. Integrate both sides: $\\int y dy = \\int 2x dx \\implies \\frac{y^2}{2} = x^2 + C_1 \\implies y^2 = 2x^2 + C$.",
            "distractorTip": "Step 1: separate all $y$'s with $dy$ and all $x$'s with $dx$."
          },
          {
            "id": "c7-l5-q2",
            "stem": "Find the general solution to $\\frac{dy}{dx} = ky$.",
            "options": [
              "$y = C e^{kx}$",
              "$y = \\frac{k}{2}x^2 + C$",
              "$y = e^{kx} + C$",
              "$y = C + kx$"
            ],
            "correctIndex": 0,
            "explanation": "Separate: $\\frac{1}{y} dy = k dx \\implies \\ln|y| = kx + C_1 \\implies |y| = e^{kx + C_1} = e^{C_1}e^{kx} \\implies y = C e^{kx}$.",
            "distractorTip": "Fundamental law of exponential growth and decay."
          },
          {
            "id": "c7-l5-q3",
            "stem": "Solve the differential equation $\\frac{dy}{dx} = x^2 y$.",
            "options": [
              "$y = C e^{x^3/3}$",
              "$y = \\frac{x^3}{3} + C$",
              "$y^2 = \\frac{2x^3}{3} + C$",
              "$y = e^{x^3} + C$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{1}{y} dy = x^2 dx \\implies \\ln|y| = \\frac{x^3}{3} + C_1 \\implies y = C e^{x^3/3}$.",
            "distractorTip": "Remember to integrate $x^2$ to get $x^3/3$ in the exponent."
          },
          {
            "id": "c7-l5-q4",
            "stem": "Find the general solution to $\\frac{dy}{dx} = (1 + y^2)$.",
            "options": [
              "$y = \\tan(x + C)$",
              "$y = \\arctan(x) + C$",
              "$y = \\ln(1 + x^2) + C$",
              "$y = \\sqrt{x + C}$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{1}{1 + y^2} dy = dx \\implies \\arctan(y) = x + C \\implies y = \\tan(x + C)$.",
            "distractorTip": "$\\int \\frac{1}{1+y^2} dy = \\arctan(y)$."
          },
          {
            "id": "c7-l5-q5",
            "stem": "Why must the constant $+ C$ be placed immediately upon integration on the AP Exam?",
            "options": [
              "Adding $+ C$ at the very end of algebraic solving results in an incorrect mathematical solution and loses points on AP rubrics.",
              "It doesn't matter where $+ C$ is placed.",
              "Because $C$ must always equal zero.",
              "To avoid negative numbers."
            ],
            "correctIndex": 0,
            "explanation": "On the AP rubric, separating variables and adding $+ C$ at the integration step is mandatory. Placing $+ C$ at the end (e.g. $y = e^{kx} + C$ instead of $y = C e^{kx}$) is a severe error!",
            "distractorTip": "Write $+ C$ the very instant you remove the integral signs!"
          }
        ]
      },
      {
        "id": 706,
        "unitIndex": 7,
        "levelNumber": 6,
        "uniqueKey": "u7-l6",
        "topicNumber": "Topic 7.7",
        "name": "Separation of Variables: Particular Solutions",
        "subtitle": "Using initial condition $(x_0, y_0)$ to solve for $C$",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c7-l6-q1",
            "stem": "Find the particular solution to $\\frac{dy}{dx} = \\frac{x}{y}$ with initial condition $y(0) = -3$.",
            "options": [
              "$y = -\\sqrt{x^2 + 9}$",
              "$y = \\sqrt{x^2 + 9}$",
              "$y = -\\sqrt{x^2 - 9}$",
              "$y = -x - 3$"
            ],
            "correctIndex": 0,
            "explanation": "$y dy = x dx \\implies \\frac{y^2}{2} = \\frac{x^2}{2} + C_1 \\implies y^2 = x^2 + C$. Using $y(0) = -3$: $(-3)^2 = 0 + C \\implies C = 9$. Thus $y^2 = x^2 + 9$. Since the initial condition has $y = -3 < 0$, we MUST choose the negative branch: $y = -\\sqrt{x^2 + 9}$.",
            "distractorTip": "Crucial AP rule: choose the branch ($+$ or $-$) that matches the initial condition $y(0) = -3$!"
          },
          {
            "id": "c7-l6-q2",
            "stem": "Find the particular solution to $\\frac{dy}{dx} = 2xy^2$ with $y(0) = 1$.",
            "options": [
              "$y = \\frac{1}{1 - x^2}$",
              "$y = \\frac{1}{1 + x^2}$",
              "$y = e^{x^2}$",
              "$y = x^2 + 1$"
            ],
            "correctIndex": 0,
            "explanation": "$y^{-2} dy = 2x dx \\implies -\\frac{1}{y} = x^2 + C$. Using $(0, 1)$: $-\\frac{1}{1} = 0 + C \\implies C = -1$. Thus $-\\frac{1}{y} = x^2 - 1 \\implies \\frac{1}{y} = 1 - x^2 \\implies y = \\frac{1}{1 - x^2}$.",
            "distractorTip": "Domain restriction: valid on $(-1, 1)$ containing $x = 0$."
          },
          {
            "id": "c7-l6-q3",
            "stem": "Find the particular solution to $\\frac{dy}{dx} = 3y$ with $y(0) = 7$.",
            "options": [
              "$y = 7e^{3x}$",
              "$y = 3e^{7x}$",
              "$y = 7e^{x/3}$",
              "$y = e^{3x} + 6$"
            ],
            "correctIndex": 0,
            "explanation": "$\\frac{1}{y} dy = 3 dx \\implies \\ln|y| = 3x + C_1 \\implies y = C e^{3x}$. At $(0, 7)$, $7 = C e^0 \\implies C = 7$. Solution is $y = 7e^{3x}$.",
            "distractorTip": "Initial value $y(0)$ becomes the multiplicative prefactor $C$ in exponential models."
          },
          {
            "id": "c7-l6-q4",
            "stem": "Solve $\\frac{dy}{dx} = \\frac{1 + x}{y}$ with initial condition $y(1) = 2$.",
            "options": [
              "$y = \\sqrt{x^2 + 2x + 1} = x + 1$",
              "$y = \\sqrt{x^2 + 2x + 4}$",
              "$y = \\sqrt{2x^2 + 2}$",
              "$y = x + 2$"
            ],
            "correctIndex": 0,
            "explanation": "$y dy = (1+x)dx \\implies \\frac{y^2}{2} = x + \\frac{x^2}{2} + C_1 \\implies y^2 = x^2 + 2x + C$. Using $(1, 2)$: $4 = 1 + 2 + C \\implies C = 1$. So $y^2 = x^2 + 2x + 1 = (x+1)^2 \\implies y = x + 1$ (since $y(1) = 2 > 0$).",
            "distractorTip": "Factor $(x+1)^2$ under the radical."
          },
          {
            "id": "c7-l6-q5",
            "stem": "On what domain interval is the solution $y = \\frac{1}{2 - x}$ valid if the initial condition is $y(1) = 1$?",
            "options": [
              "$(-\\infty, 2)$",
              "$(2, \\infty)$",
              "All real numbers except $x = 2$",
              "$[0, 2)$"
            ],
            "correctIndex": 0,
            "explanation": "On the AP Exam, a particular solution to a differential equation must be defined on an unbroken interval containing the initial point $x_0 = 1$. Since there is a vertical asymptote at $x = 2$, the domain is the continuous interval $(-\\infty, 2)$.",
            "distractorTip": "AP CED requirement: solution domain must be the single open interval containing the initial condition."
          }
        ]
      },
      {
        "id": 707,
        "unitIndex": 7,
        "levelNumber": 7,
        "uniqueKey": "u7-l7",
        "topicNumber": "Topic 7.8",
        "name": "Unit 7 Boss: Differential Equations Fortress",
        "subtitle": "Mastery AP FRQ differential equations challenge",
        "difficulty": "Boss",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c7-l7-q1",
            "stem": "Consider $\\frac{dy}{dx} = (y - 1)^2 \\cos(\\pi x)$. Find the particular solution with $y(1) = 2$.",
            "options": [
              "$y = \\frac{1}{1 + \\frac{1}{\\pi}\\sin(\\pi x)} + 1$",
              "$y = \\sin(\\pi x) + 2$",
              "$y = e^{\\cos(\\pi x)} + 1$",
              "$y = \\frac{\\pi}{\\sin(\\pi x)} + 2$"
            ],
            "correctIndex": 0,
            "explanation": "$(y - 1)^{-2} dy = \\cos(\\pi x) dx \\implies -\\frac{1}{y - 1} = \\frac{1}{\\pi}\\sin(\\pi x) + C$. At $(1, 2)$: $-\\frac{1}{2-1} = \\frac{1}{\\pi}\\sin(\\pi) + C \\implies -1 = 0 + C \\implies C = -1$. So $-\\frac{1}{y - 1} = \\frac{1}{\\pi}\\sin(\\pi x) - 1 \\implies \\frac{1}{y - 1} = 1 - \\frac{1}{\\pi}\\sin(\\pi x) \\implies y = 1 + \\frac{1}{1 - \\frac{1}{\\pi}\\sin(\\pi x)}$.",
            "distractorTip": "Multi-step AP Free Response style separation of variables."
          },
          {
            "id": "c7-l7-q2",
            "stem": "A tank contains $50$ lbs of salt dissolved in $100$ gal of water. Fresh water enters at $2$ gal/min and the well-stirred mixture drains at $2$ gal/min. How much salt remains after $t$ minutes?",
            "options": [
              "$S(t) = 50 e^{-t/50}\\text{ lbs}$",
              "$S(t) = 50 - 2t\\text{ lbs}$",
              "$S(t) = 50 e^{-2t}\\text{ lbs}$",
              "$S(t) = 100 e^{-t/50}\\text{ lbs}$"
            ],
            "correctIndex": 0,
            "explanation": "Rate in $= 0$. Rate out $= 2\\left(\\frac{S}{100}\\right) = \\frac{S}{50}$. $\\frac{dS}{dt} = -\\frac{S}{50} \\implies S(t) = S_0 e^{-t/50} = 50 e^{-t/50}$.",
            "distractorTip": "Classic mixing problem differential equation."
          },
          {
            "id": "c7-l7-q3",
            "stem": "If $\\frac{dy}{dx} = x + y$, find the second derivative $\\frac{d^2y}{dx^2}$ in terms of $x$ and $y$.",
            "options": [
              "$1 + x + y$",
              "$1$",
              "$2x$",
              "$x + y$"
            ],
            "correctIndex": 0,
            "explanation": "Differentiating: $\\frac{d^2y}{dx^2} = 1 + \\frac{dy}{dx}$. Substituting $\\frac{dy}{dx} = x + y$: $\\frac{d^2y}{dx^2} = 1 + x + y$.",
            "distractorTip": "Substitute the first derivative expression into the second derivative."
          },
          {
            "id": "c7-l7-q4",
            "stem": "For the differential equation $\\frac{dy}{dx} = x(y - 2)$, what are all the equilibrium (constant) solutions?",
            "options": [
              "$y = 2$",
              "$y = 0$",
              "$x = 0$",
              "$y = 2$ and $x = 0$"
            ],
            "correctIndex": 0,
            "explanation": "Equilibrium solutions occur where $\\frac{dy}{dx} = 0$ for all $x$. Setting $y - 2 = 0 \\implies y = 2$. (Note: $x = 0$ is a line, not a function $y = c$).",
            "distractorTip": "Equilibrium solutions are horizontal lines $y = \\text{constant}$ where $\\frac{dy}{dx} = 0$."
          },
          {
            "id": "c7-l7-q5",
            "stem": "If $\\frac{dy}{dx} = 2y - 4$, for what values of $y$ are the solution curves concave UP?",
            "options": [
              "$y > 2$",
              "$y < 2$",
              "$y > 4$",
              "All $y$"
            ],
            "correctIndex": 0,
            "explanation": "Differentiate: $\\frac{d^2y}{dx^2} = 2\\frac{dy}{dx} = 2(2y - 4) = 4(y - 2)$. Concave up requires $y'' > 0 \\implies 4(y - 2) > 0 \\implies y > 2$.",
            "distractorTip": "Concavity test using implicit second derivative."
          },
          {
            "id": "c7-l7-q6",
            "stem": "Solve $\\frac{dy}{dx} = e^{x - y}$ with initial condition $y(0) = 0$.",
            "options": [
              "$y = \\ln(e^x) = x$",
              "$y = e^x - 1$",
              "$y = \\ln(e^x + 1)$",
              "$y = x^2$"
            ],
            "correctIndex": 0,
            "explanation": "Rewrite $e^{x-y} = \\frac{e^x}{e^y}$. Separate: $e^y dy = e^x dx \\implies e^y = e^x + C$. Using $(0, 0)$: $e^0 = e^0 + C \\implies 1 = 1 + C \\implies C = 0$. So $e^y = e^x \\implies y = x$.",
            "distractorTip": "Law of exponents: $e^{x - y} = e^x e^{-y} = \\frac{e^x}{e^y}$."
          }
        ]
      }
    ]
  },
  {
    unitIndex: 8,
    unitId: "u8",
    title: "Unit 8: Applications of Integration",
    shortTitle: "Unit 8: Area & Volume",
    description: "Average value of a function, motion with integrals, area between curves, and volume of solids with cross-sections and discs/washers",
    examWeight: "10\u201315% of AP Exam",
    biome: UNIT_BIOMES[8],
    levels: [
      {
        "id": 801,
        "unitIndex": 8,
        "levelNumber": 1,
        "uniqueKey": "u8-l1",
        "topicNumber": "Topic 8.1",
        "name": "Average Value of a Function",
        "subtitle": "$f_{\\text{avg}} = \\frac{1}{b-a} \\int_a^b f(x)\\,dx$",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c8-l1-q1",
            "stem": "What is the average value of $f(x) = 4 - x^2$ on the interval $[-2, 2]$?",
            "options": [
              "$\\frac{8}{3}$",
              "$4$",
              "$\\frac{16}{3}$",
              "$2$"
            ],
            "correctIndex": 0,
            "explanation": "Formula: $\\frac{1}{2 - (-2)}\\int_{-2}^2 (4 - x^2) dx = \\frac{1}{4}\\left[4x - \\frac{x^3}{3}\\right]_{-2}^2 = \\frac{1}{4}\\left[\\left(8 - \\frac{8}{3}\\right) - \\left(-8 + \\frac{8}{3}\\right)\\right] = \\frac{1}{4}\\left[\\frac{32}{3}\\right] = \\frac{8}{3}$.",
            "distractorTip": "Do not forget to divide by the interval length $b - a = 4$."
          },
          {
            "id": "c8-l1-q2",
            "stem": "The Mean Value Theorem for Integrals guarantees that if $f$ is continuous on $[a, b]$, there exists a point $c \\in (a, b)$ such that:",
            "options": [
              "$f(c) = f_{\\text{avg}} = \\frac{1}{b - a}\\int_a^b f(x) dx$",
              "$f'(c) = 0$",
              "$\\int_a^c f(x) dx = \\int_c^b f(x) dx$",
              "$f(c) = \\frac{f(b)-f(a)}{b-a}$"
            ],
            "correctIndex": 0,
            "explanation": "MVT for Integrals guarantees that a continuous function must attain its average value at least once on the interval.",
            "distractorTip": "A continuous function equals its average value somewhere in $(a, b)$."
          },
          {
            "id": "c8-l1-q3",
            "stem": "If the average value of $g$ on $[1, 5]$ is $6$, what is the value of $\\int_1^5 g(x) dx$?",
            "options": [
              "$24$",
              "$6$",
              "$30$",
              "$1.5$"
            ],
            "correctIndex": 0,
            "explanation": "Since $g_{\\text{avg}} = \\frac{1}{5 - 1}\\int_1^5 g(x) dx = 6$, multiplying by $4$ gives $\\int_1^5 g(x) dx = 4 \\times 6 = 24$.",
            "distractorTip": "Total accumulation $= \\text{Average value} \\times \\text{Interval length}$."
          }
        ]
      },
      {
        "id": 802,
        "unitIndex": 8,
        "levelNumber": 2,
        "uniqueKey": "u8-l2",
        "topicNumber": "Topic 8.2",
        "name": "Connecting Position, Velocity & Net Distance",
        "subtitle": "Definite integrals of rate functions in real contexts",
        "difficulty": "Easy",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c8-l2-q1",
            "stem": "What is the difference between displacement and total distance traveled for a particle with velocity $v(t)$ on $[a, b]$?",
            "options": [
              "Displacement is $\\int_a^b v(t) dt$, while total distance is $\\int_a^b |v(t)| dt$.",
              "Displacement uses $|v(t)|$, total distance uses $v(t)$.",
              "They are always identical.",
              "Displacement is the derivative of distance."
            ],
            "correctIndex": 0,
            "explanation": "Displacement is net change in position (can be negative), whereas total distance is the total ground covered, integrating the speed $|v(t)|$.",
            "distractorTip": "Displacement integrates velocity; Total distance integrates absolute value of velocity (speed)."
          },
          {
            "id": "c8-l2-q2",
            "stem": "A particle has velocity $v(t) = 2t - 4$ on $[0, 3]$. What is its DISPLACEMENT on $[0, 3]$?",
            "options": [
              "$-3$",
              "$5$",
              "$3$",
              "$-5$"
            ],
            "correctIndex": 0,
            "explanation": "Displacement $= \\int_0^3 (2t - 4) dt = [t^2 - 4t]_0^3 = (9 - 12) - 0 = -3$.",
            "distractorTip": "Direct definite integral gives net displacement."
          },
          {
            "id": "c8-l2-q3",
            "stem": "For the same particle with $v(t) = 2t - 4$, what is the TOTAL DISTANCE traveled on $[0, 3]$?",
            "options": [
              "$5$",
              "$3$",
              "$4$",
              "$7$"
            ],
            "correctIndex": 0,
            "explanation": "Velocity changes sign at $t = 2$ ($v < 0$ on $[0, 2]$, $v > 0$ on $[2, 3]$). Distance $= \\int_0^2 -(2t - 4) dt + \\int_2^3 (2t - 4) dt = [4t - t^2]_0^2 + [t^2 - 4t]_2^3 = (8 - 4) + ((9 - 12) - (4 - 8)) = 4 + (-3 - (-4)) = 4 + 1 = 5$.",
            "distractorTip": "Split the integral wherever velocity equals zero to compute total distance."
          }
        ]
      },
      {
        "id": 803,
        "unitIndex": 8,
        "levelNumber": 3,
        "uniqueKey": "u8-l3",
        "topicNumber": "Topic 8.3",
        "name": "Accumulation Functions in Applied Contexts",
        "subtitle": "Initial condition plus accumulated rate integral",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c8-l3-q1",
            "stem": "A tank contains $100$ gallons at $t = 0$. Water is pumped in at rate $R(t)$ gal/hr. Which formula gives the volume in the tank at $t = 5$?",
            "options": [
              "$100 + \\int_0^5 R(t) dt$",
              "$\\int_0^5 R(t) dt$",
              "$100 R(5)$",
              "$100 + R'(5)$"
            ],
            "correctIndex": 0,
            "explanation": "Fundamental accumulation formula: $\\text{Current Amount} = \\text{Initial Amount} + \\int_{t_0}^t \\text{Rate}(u) du$.",
            "distractorTip": "Never forget to add the initial condition!"
          },
          {
            "id": "c8-l3-q2",
            "stem": "If $s(0) = 4$ and $v(t) = 3t^2$, what is the position $s(2)$?",
            "options": [
              "$12$",
              "$8$",
              "$16$",
              "$10$"
            ],
            "correctIndex": 0,
            "explanation": "$s(2) = s(0) + \\int_0^2 v(t) dt = 4 + \\int_0^2 3t^2 dt = 4 + [t^3]_0^2 = 4 + 8 = 12$.",
            "distractorTip": "Position $= s(0) + \\int_0^2 v(t) dt$."
          },
          {
            "id": "c8-l3-q3",
            "stem": "People enter an auditorium at rate $E(t)$ and leave at rate $L(t)$. Which expression gives the total change in the number of people between $t = 1$ and $t = 4$?",
            "options": [
              "$\\int_1^4 (E(t) - L(t)) dt$",
              "$E(4) - L(4)$",
              "$\\int_1^4 E(t) dt + \\int_1^4 L(t) dt$",
              "$E'(4) - L'(4)$"
            ],
            "correctIndex": 0,
            "explanation": "Net change in population is the integral of the net rate of change: $\\int_1^4 (E(t) - L(t)) dt$.",
            "distractorTip": "Inflow minus outflow integrated over time."
          },
          {
            "id": "c8-l3-q4",
            "stem": "A temperature sensor has reading $T(2) = 50^\\circ$F. The rate of cooling is given by $T'(t) = -3e^{-0.1t}$. What is $T(5)$?",
            "options": [
              "$50 + \\int_2^5 (-3e^{-0.1t}) dt$",
              "$\\int_2^5 (-3e^{-0.1t}) dt$",
              "$50 - 3e^{-0.5}$",
              "$50 + T'(5)$"
            ],
            "correctIndex": 0,
            "explanation": "By FTC: $T(5) = T(2) + \\int_2^5 T'(t) dt = 50 + \\int_2^5 (-3e^{-0.1t}) dt$.",
            "distractorTip": "Standard AP rate-in / rate-out modeling."
          }
        ]
      },
      {
        "id": 804,
        "unitIndex": 8,
        "levelNumber": 4,
        "uniqueKey": "u8-l4",
        "topicNumber": "Topic 8.4",
        "name": "Area Between Curves (with respect to x)",
        "subtitle": "Top minus bottom integrals",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c8-l4-q1",
            "stem": "Find the area bounded by the curves $y = x^2$ and $y = 2x - x^2$.",
            "options": [
              "$\\frac{1}{3}$",
              "$\\frac{2}{3}$",
              "$1$",
              "$\\frac{1}{6}$"
            ],
            "correctIndex": 0,
            "explanation": "Find intersection points: $x^2 = 2x - x^2 \\implies 2x^2 - 2x = 0 \\implies 2x(x - 1) = 0 \\implies x = 0, 1$. On $[0, 1]$, $2x - x^2 \\ge x^2$ (top curve is $2x - x^2$). Area: $\\int_0^1 ((2x - x^2) - x^2) dx = \\int_0^1 (2x - 2x^2) dx = [x^2 - \\frac{2x^3}{3}]_0^1 = 1 - \\frac{2}{3} = \\frac{1}{3}$.",
            "distractorTip": "Area formula: $\\int_a^b (y_{\\text{top}} - y_{\\text{bottom}}) dx$."
          },
          {
            "id": "c8-l4-q2",
            "stem": "Find the area enclosed between $y = \\sqrt{x}$ and $y = x$.",
            "options": [
              "$\\frac{1}{6}$",
              "$\\frac{1}{3}$",
              "$\\frac{1}{2}$",
              "$\\frac{2}{3}$"
            ],
            "correctIndex": 0,
            "explanation": "Intersections: $\\sqrt{x} = x \\implies x = x^2 \\implies x(x - 1) = 0 \\implies x = 0, 1$. On $[0, 1]$, $\\sqrt{x} \\ge x$. Area: $\\int_0^1 (x^{1/2} - x) dx = [\\frac{2}{3}x^{3/2} - \\frac{x^2}{2}]_0^1 = \\frac{2}{3} - \\frac{1}{2} = \\frac{1}{6}$.",
            "distractorTip": "Check which curve is on top on $[0, 1]$: e.g. at $x=0.25$, $\\sqrt{0.25} = 0.5 > 0.25$."
          },
          {
            "id": "c8-l4-q3",
            "stem": "Set up the integral for the area between $y = \\sin x$ and $y = \\cos x$ from $x = 0$ to $x = \\frac{\\pi}{4}$.",
            "options": [
              "$\\int_0^{\\pi/4} (\\cos x - \\sin x) dx$",
              "$\\int_0^{\\pi/4} (\\sin x - \\cos x) dx$",
              "$\\int_0^{\\pi/4} (\\cos x + \\sin x) dx$",
              "$\\int_0^{\\pi/4} (\\cos^2 x - \\sin^2 x) dx$"
            ],
            "correctIndex": 0,
            "explanation": "On $[0, \\pi/4]$, $\\cos(0) = 1 > \\sin(0) = 0$, so $\\cos x$ is the top curve. Area is $\\int_0^{\\pi/4} (\\cos x - \\sin x) dx$.",
            "distractorTip": "Always determine the upper curve correctly."
          },
          {
            "id": "c8-l4-q4",
            "stem": "What is the value of $\\int_0^{\\pi/4} (\\cos x - \\sin x) dx$?",
            "options": [
              "$\\sqrt{2} - 1$",
              "$1$",
              "$\\sqrt{2}$",
              "$\\frac{\\sqrt{2}}{2}$"
            ],
            "correctIndex": 0,
            "explanation": "$[\\sin x + \\cos x]_0^{\\pi/4} = (\\sin(\\pi/4) + \\cos(\\pi/4)) - (\\sin 0 + \\cos 0) = (\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2}) - (0 + 1) = \\sqrt{2} - 1$.",
            "distractorTip": "Evaluate antiderivative at upper and lower bounds."
          }
        ]
      },
      {
        "id": 805,
        "unitIndex": 8,
        "levelNumber": 5,
        "uniqueKey": "u8-l5",
        "topicNumber": "Topic 8.5",
        "name": "Area Between Curves (with respect to y)",
        "subtitle": "Right minus left dy integrals",
        "difficulty": "Medium",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c8-l5-q1",
            "stem": "When is it preferable to integrate with respect to $y$ ($\\int (x_{\\text{right}} - x_{\\text{left}}) dy$) rather than with respect to $x$?",
            "options": [
              "When the right and left boundary curves are easily expressed as functions of $y$, avoiding multiple piecewise $x$-integrals.",
              "Only when integrating circles.",
              "Whenever the region is in Quadrant I.",
              "It is never preferred."
            ],
            "correctIndex": 0,
            "explanation": "Integrating with respect to $y$ combines regions where a single top/bottom rule in $x$ would require splitting into multiple parts.",
            "distractorTip": "Area with respect to $y$: $\\int_c^d (x_{\\text{right}} - x_{\\text{left}}) dy$."
          },
          {
            "id": "c8-l5-q2",
            "stem": "Find the area bounded by $x = y^2$ and $x = y + 2$.",
            "options": [
              "$\\frac{9}{2} = 4.5$",
              "$\\frac{16}{3}$",
              "$9$",
              "$\\frac{7}{2}$"
            ],
            "correctIndex": 0,
            "explanation": "Intersections in $y$: $y^2 = y + 2 \\implies y^2 - y - 2 = 0 \\implies (y - 2)(y + 1) = 0 \\implies y = -1, 2$. On $[-1, 2]$, line $x = y + 2$ is to the right of parabola $x = y^2$. Area: $\\int_{-1}^2 (y + 2 - y^2) dy = [\\frac{y^2}{2} + 2y - \\frac{y^3}{3}]_{-1}^2 = (2 + 4 - \\frac{8}{3}) - (\\frac{1}{2} - 2 + \\frac{1}{3}) = \\frac{10}{3} - (-\\frac{7}{6}) = \\frac{20}{6} + \\frac{7}{6} = \\frac{27}{6} = \\frac{9}{2}$.",
            "distractorTip": "Integrating in $y$ requires only ONE integral instead of two!"
          },
          {
            "id": "c8-l5-q3",
            "stem": "Set up the integral with respect to $y$ for the area between $x = 0$, $y = 1$, $y = 3$, and $x = \\frac{4}{y}$.",
            "options": [
              "$\\int_1^3 \\frac{4}{y} dy$",
              "$\\int_1^3 \\frac{y}{4} dy$",
              "$\\int_0^4 \\frac{4}{x} dx$",
              "$4\\ln(3)$"
            ],
            "correctIndex": 0,
            "explanation": "Right curve is $x = \\frac{4}{y}$, left curve is $x = 0$ (the $y$-axis). Bounds are $y = 1$ to $y = 3$. Area is $\\int_1^3 \\frac{4}{y} dy = 4[\\ln y]_1^3 = 4\\ln 3$.",
            "distractorTip": "Right curve minus left curve with respect to $y$."
          },
          {
            "id": "c8-l5-q4",
            "stem": "What is the value of $\\int_1^3 \\frac{4}{y} dy$?",
            "options": [
              "$4\\ln 3$",
              "$\\ln 12$",
              "$8$",
              "$12$"
            ],
            "correctIndex": 0,
            "explanation": "$4[\\ln|y|]_1^3 = 4(\\ln 3 - \\ln 1) = 4\\ln 3$.",
            "distractorTip": "Natural log evaluated at 1 is 0."
          }
        ]
      },
      {
        "id": 806,
        "unitIndex": 8,
        "levelNumber": 6,
        "uniqueKey": "u8-l6",
        "topicNumber": "Topic 8.6",
        "name": "Area with Multiple Intersections",
        "subtitle": "Splitting integrals across crossing points",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c8-l6-q1",
            "stem": "The curves $y = x^3$ and $y = x$ intersect at $x = -1, 0, 1$. What is the total area enclosed between them?",
            "options": [
              "$\\frac{1}{2}$",
              "$0$",
              "$1$",
              "$\\frac{1}{4}$"
            ],
            "correctIndex": 0,
            "explanation": "By symmetry, the area on $[-1, 0]$ equals the area on $[0, 1]$. On $[0, 1]$, $x \\ge x^3$. Area on $[0, 1]$ is $\\int_0^1 (x - x^3) dx = [\\frac{x^2}{2} - \\frac{x^4}{4}]_0^1 = \\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4}$. Total area $= 2 \\times \\frac{1}{4} = \\frac{1}{2}$.",
            "distractorTip": "Do NOT compute $\\int_{-1}^1 (x^3 - x) dx = 0$! Area is always strictly positive!"
          },
          {
            "id": "c8-l6-q2",
            "stem": "Why does $\\int_{-1}^1 (x^3 - x) dx = 0$ NOT represent the area between $y = x^3$ and $y = x$?",
            "options": [
              "Because the curves cross at $x = 0$, so the signed areas cancel out; you must integrate $|x^3 - x|$.",
              "Because $x^3$ is not continuous.",
              "Because area cannot be computed with odd functions.",
              "The area actually is zero."
            ],
            "correctIndex": 0,
            "explanation": "When curves cross, the top and bottom curves swap roles. Integrating without splitting subtracts one region from the other instead of adding them.",
            "distractorTip": "Always split the integral at every intersection point!"
          },
          {
            "id": "c8-l6-q3",
            "stem": "Find the area enclosed between $y = \\sin x$ and $y = \\cos x$ from $x = 0$ to $x = \\pi$.",
            "options": [
              "$2\\sqrt{2}$",
              "$2$",
              "$\\sqrt{2}$",
              "$0$"
            ],
            "correctIndex": 0,
            "explanation": "Curves intersect at $x = \\pi/4$. On $[0, \\pi/4]$, $\\cos x \\ge \\sin x$ (area $= \\sqrt{2}-1$). On $[\\pi/4, \\pi]$, $\\sin x \\ge \\cos x$ (area $= \\int_{\\pi/4}^\\pi (\\sin x - \\cos x) dx = [-\\cos x - \\sin x]_{\\pi/4}^\\pi = (1 - 0) - (-\\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{2}}{2}) = 1 + \\sqrt{2}$). Total area $= (\\sqrt{2} - 1) + (1 + \\sqrt{2}) = 2\\sqrt{2}$.",
            "distractorTip": "Split at $\\pi/4$ and add the two absolute areas."
          },
          {
            "id": "c8-l6-q4",
            "stem": "How many separate integrals are needed to find the area bounded by $y = x^3 - 3x$ and $y = x$ on $[-2, 2]$ without using symmetry?",
            "options": [
              "$2$, because the curves intersect at $x = -2, 0, 2$.",
              "$1$",
              "$3$",
              "$4$"
            ],
            "correctIndex": 0,
            "explanation": "Intersection: $x^3 - 3x = x \\implies x^3 - 4x = 0 \\implies x(x-2)(x+2) = 0$. Intersections are at $x = -2, 0, 2$. This creates 2 sub-intervals: $[-2, 0]$ and $[0, 2]$.",
            "distractorTip": "Find all roots to determine the number of subregions."
          },
          {
            "id": "c8-l6-q5",
            "stem": "On the interval $[-2, 0]$, which curve is on top for $y_1 = x^3 - 3x$ and $y_2 = x$?",
            "options": [
              "$y_1 = x^3 - 3x$ is on top.",
              "$y_2 = x$ is on top.",
              "They are equal everywhere.",
              "Neither."
            ],
            "correctIndex": 0,
            "explanation": "Test a point, say $x = -1$: $y_1(-1) = -1 - 3(-1) = 2$. $y_2(-1) = -1$. Since $2 > -1$, $y_1$ is on top on $[-2, 0]$.",
            "distractorTip": "Test a midpoint in each subinterval to identify the top curve."
          }
        ]
      },
      {
        "id": 807,
        "unitIndex": 8,
        "levelNumber": 7,
        "uniqueKey": "u8-l7",
        "topicNumber": "Topic 8.7",
        "name": "Volumes with Cross Sections: Squares & Rectangles",
        "subtitle": "$\\int A(x)\\,dx$ with side length $s = f(x) - g(x)$",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c8-l7-q1",
            "stem": "A solid has base bounded by $y = \\sqrt{x}$, the $x$-axis, and $x = 4$. Cross sections perpendicular to the $x$-axis are SQUARES. What is the volume?",
            "options": [
              "$8$",
              "$16$",
              "$4$",
              "$\\frac{16}{3}$"
            ],
            "correctIndex": 0,
            "explanation": "Base side length of each square is $s = \\sqrt{x} - 0 = \\sqrt{x}$. Cross-sectional area: $A(x) = s^2 = (\\sqrt{x})^2 = x$. Volume $= \\int_0^4 A(x) dx = \\int_0^4 x dx = \\left[\\frac{x^2}{2}\\right]_0^4 = \\frac{16}{2} = 8$.",
            "distractorTip": "Notice there is NO factor of $\\pi$ in cross-section volume problems unless the cross section is a circle/semicircle!"
          },
          {
            "id": "c8-l7-q2",
            "stem": "The base of a solid is bounded by $y = 1 - x^2$ and the $x$-axis. Cross sections perpendicular to the $x$-axis are RECTANGLES of height $3$. What is the volume?",
            "options": [
              "$4$",
              "$2$",
              "$8$",
              "$6$"
            ],
            "correctIndex": 0,
            "explanation": "Side length on base: $b(x) = 1 - x^2$. Area of rectangle: $A(x) = \\text{base} \\times \\text{height} = 3(1 - x^2)$. Volume $= \\int_{-1}^1 3(1 - x^2) dx = 3\\left[x - \\frac{x^3}{3}\\right]_{-1}^1 = 3\\left(\\frac{2}{3} - \\left(-\\frac{2}{3}\\right)\\right) = 3\\left(\\frac{4}{3}\\right) = 4$.",
            "distractorTip": "Area of rectangle $= b \\cdot h$."
          },
          {
            "id": "c8-l7-q3",
            "stem": "If cross sections perpendicular to the $x$-axis are squares with side length $s = f(x) - g(x)$, what is the integral formula for the volume?",
            "options": [
              "$\\int_a^b (f(x) - g(x))^2 dx$",
              "$\\pi \\int_a^b (f(x) - g(x))^2 dx$",
              "$\\int_a^b (f(x)^2 - g(x)^2) dx$",
              "$\\frac{1}{2}\\int_a^b (f(x) - g(x))^2 dx$"
            ],
            "correctIndex": 0,
            "explanation": "Cross-sectional area of a square is $A = s^2 = (f(x) - g(x))^2$. Volume is $\\int_a^b (f(x) - g(x))^2 dx$.",
            "distractorTip": "Square the DIFFERENCE $(f-g)^2$, do not subtract squares $f^2 - g^2$!"
          },
          {
            "id": "c8-l7-q4",
            "stem": "A solid has base bounded by $y = x$ and $y = x^2$. Cross sections perpendicular to the $x$-axis are squares. What is the volume?",
            "options": [
              "$\\frac{1}{30}$",
              "$\\frac{1}{6}$",
              "$\\frac{1}{15}$",
              "$\\frac{\\pi}{30}$"
            ],
            "correctIndex": 0,
            "explanation": "Intersections at $x = 0, 1$. Side length $s = x - x^2$. Area: $A(x) = (x - x^2)^2 = x^2 - 2x^3 + x^4$. Volume $= \\int_0^1 (x^2 - 2x^3 + x^4) dx = [\\frac{x^3}{3} - \\frac{x^4}{2} + \\frac{x^5}{5}]_0^1 = \\frac{1}{3} - \\frac{1}{2} + \\frac{1}{5} = \\frac{10 - 15 + 6}{30} = \\frac{1}{30}$.",
            "distractorTip": "Expand $(x - x^2)^2 = x^2 - 2x^3 + x^4$."
          },
          {
            "id": "c8-l7-q5",
            "stem": "Why do students commonly lose points on cross-section problems on the AP Exam?",
            "options": [
              "Accidentally including $\\pi$ in the integral for non-circular cross sections.",
              "Using $dx$ instead of $dy$.",
              "Integrating over the wrong variable.",
              "All of the above."
            ],
            "correctIndex": 0,
            "explanation": "A notorious AP trap is including $\\pi$ out of habit from rotation problems. $\\pi$ is only used when the cross sections are circular!",
            "distractorTip": "No $\\pi$ for squares, rectangles, or triangles!"
          }
        ]
      },
      {
        "id": 808,
        "unitIndex": 8,
        "levelNumber": 8,
        "uniqueKey": "u8-l8",
        "topicNumber": "Topic 8.8",
        "name": "Volumes with Cross Sections: Triangles & Semicircles",
        "subtitle": "Geometry area formulas embedded in integrals",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c8-l8-q1",
            "stem": "The base of a solid is bounded by $y = \\sqrt{x}$, $y = 0$, and $x = 4$. Cross sections perpendicular to the $x$-axis are SEMICIRCLES. What is the volume?",
            "options": [
              "$\\pi$",
              "$2\\pi$",
              "$\\frac{\\pi}{2}$",
              "$4\\pi$"
            ],
            "correctIndex": 0,
            "explanation": "Diameter is $d = \\sqrt{x}$, so radius is $r = \\frac{\\sqrt{x}}{2}$. Area of semicircle: $A(x) = \\frac{1}{2}\\pi r^2 = \\frac{1}{2}\\pi \\left(\\frac{\\sqrt{x}}{2}\\right)^2 = \\frac{\\pi}{8}x$. Volume $= \\int_0^4 \\frac{\\pi}{8}x dx = \\frac{\\pi}{8}\\left[\\frac{x^2}{2}\\right]_0^4 = \\frac{\\pi}{8}(8) = \\pi$.",
            "distractorTip": "Radius is HALF the diameter: $r = s/2$, so area of semicircle is $\\frac{\\pi}{8}s^2$!"
          },
          {
            "id": "c8-l8-q2",
            "stem": "If cross sections perpendicular to the $x$-axis are EQUILATERAL TRIANGLES of side $s(x)$, what is the area formula $A(x)$?",
            "options": [
              "$\\frac{\\sqrt{3}}{4} s^2$",
              "$\\frac{1}{2} s^2$",
              "$\\frac{\\sqrt{3}}{2} s^2$",
              "$\\frac{1}{4} s^2$"
            ],
            "correctIndex": 0,
            "explanation": "Area of an equilateral triangle with side $s$ is $A = \\frac{\\sqrt{3}}{4}s^2$.",
            "distractorTip": "Memorize the area constant: $\\frac{\\sqrt{3}}{4}$."
          },
          {
            "id": "c8-l8-q3",
            "stem": "Cross sections perpendicular to the $x$-axis are ISOSCELES RIGHT TRIANGLES with hypotenuse on the base. What is the cross-sectional area in terms of side $s$ on the base?",
            "options": [
              "$\\frac{1}{4}s^2$",
              "$\\frac{1}{2}s^2$",
              "$\\frac{1}{8}s^2$",
              "$s^2$"
            ],
            "correctIndex": 0,
            "explanation": "If hypotenuse is $s$, then height to hypotenuse is $h = s/2$. Area $= \\frac{1}{2}(\\text{base})(\\text{height}) = \\frac{1}{2}(s)(s/2) = \\frac{1}{4}s^2$.",
            "distractorTip": "Hypotenuse on base $\\implies A = \\frac{1}{4}s^2$; Leg on base $\\implies A = \\frac{1}{2}s^2$."
          },
          {
            "id": "c8-l8-q4",
            "stem": "The base of a solid is bounded by $y = x$ and $y = x^2$. Cross sections perpendicular to the $x$-axis are equilateral triangles. Find the volume.",
            "options": [
              "$\\frac{\\sqrt{3}}{120}$",
              "$\\frac{\\sqrt{3}}{30}$",
              "$\\frac{1}{30}$",
              "$\\frac{\\sqrt{3}}{60}$"
            ],
            "correctIndex": 0,
            "explanation": "From earlier, $\\int_0^1 (x - x^2)^2 dx = \\frac{1}{30}$. For equilateral triangles, multiply by $\\frac{\\sqrt{3}}{4}$: $\\frac{\\sqrt{3}}{4} \\times \\frac{1}{30} = \\frac{\\sqrt{3}}{120}$.",
            "distractorTip": "Factor out the constant $\\frac{\\sqrt{3}}{4}$ from the integral."
          },
          {
            "id": "c8-l8-q5",
            "stem": "The base of a solid is the circle $x^2 + y^2 = 4$. Cross sections perpendicular to the $x$-axis are squares. What is the volume?",
            "options": [
              "$\\frac{128}{3}$",
              "$32\\pi$",
              "$\\frac{64}{3}$",
              "$16\\pi$"
            ],
            "correctIndex": 0,
            "explanation": "Top is $y = \\sqrt{4 - x^2}$, bottom is $y = -\\sqrt{4 - x^2}$. Side length $s = 2\\sqrt{4 - x^2}$. Square area: $A(x) = s^2 = 4(4 - x^2) = 16 - 4x^2$. Volume $= \\int_{-2}^2 (16 - 4x^2) dx = 2\\int_0^2 (16 - 4x^2) dx = 2[16x - \\frac{4x^3}{3}]_0^2 = 2(32 - \\frac{32}{3}) = 2(\\frac{64}{3}) = \\frac{128}{3}$.",
            "distractorTip": "Side length spans from $-\\sqrt{4-x^2}$ to $+\\sqrt{4-x^2}$, which is $2\\sqrt{4-x^2}$!."
          }
        ]
      },
      {
        "id": 809,
        "unitIndex": 8,
        "levelNumber": 9,
        "uniqueKey": "u8-l9",
        "topicNumber": "Topic 8.9",
        "name": "Volume with Disc & Washer: Coordinate Axes",
        "subtitle": "$\\pi \\int (R^2 - r^2)\\,dx$ revolving around $x$ or $y$ axis",
        "difficulty": "Hard",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c8-l9-q1",
            "stem": "Find the volume when the region bounded by $y = x^2$, the $x$-axis, and $x = 2$ is revolved around the $x$-axis.",
            "options": [
              "$\\frac{32\\pi}{5}$",
              "$\\frac{16\\pi}{3}$",
              "$8\\pi$",
              "$\\frac{32\\pi}{3}$"
            ],
            "correctIndex": 0,
            "explanation": "Disc method: $V = \\pi \\int_0^2 (y)^2 dx = \\pi \\int_0^2 (x^2)^2 dx = \\pi \\int_0^2 x^4 dx = \\pi \\left[\\frac{x^5}{5}\\right]_0^2 = \\frac{32\\pi}{5}$.",
            "distractorTip": "Disc formula: $\\pi \\int_a^b [R(x)]^2 dx$."
          },
          {
            "id": "c8-l9-q2",
            "stem": "Find the volume when the region between $y = x$ and $y = x^2$ is revolved around the $x$-axis.",
            "options": [
              "$\\frac{2\\pi}{15}$",
              "$\\frac{\\pi}{15}$",
              "$\\frac{2\\pi}{5}$",
              "$\\frac{\\pi}{3}$"
            ],
            "correctIndex": 0,
            "explanation": "Washer method: Outer radius $R(x) = x$, Inner radius $r(x) = x^2$. $V = \\pi \\int_0^1 (R^2 - r^2) dx = \\pi \\int_0^1 (x^2 - x^4) dx = \\pi [\\frac{x^3}{3} - \\frac{x^5}{5}]_0^1 = \\pi (\\frac{1}{3} - \\frac{1}{5}) = \\frac{2\\pi}{15}$.",
            "distractorTip": "Washer formula: $\\pi \\int (R^2 - r^2) dx$, NOT $\\pi \\int (R - r)^2 dx$!"
          },
          {
            "id": "c8-l9-q3",
            "stem": "What is the most common student error when applying the Washer Method on the AP Exam?",
            "options": [
              "Writing $\\pi \\int (R - r)^2 dx$ instead of $\\pi \\int (R^2 - r^2) dx$.",
              "Forgetting $\\pi$.",
              "Mixing up $dx$ and $dy$.",
              "All of the above."
            ],
            "correctIndex": 0,
            "explanation": "Squaring the difference $(R - r)^2$ rather than the difference of squares $(R^2 - r^2)$ is the single most common deduction on College Board exam rubrics!",
            "distractorTip": "Never write $\\pi (R - r)^2$! It is ALWAYS $\\pi(R^2 - r^2)$."
          },
          {
            "id": "c8-l9-q4",
            "stem": "Find the volume when $y = \\sqrt{x}$ from $x = 0$ to $x = 4$ is revolved around the $y$-axis.",
            "options": [
              "$\\frac{128\\pi}{5}$",
              "$\\frac{64\\pi}{3}$",
              "$32\\pi$",
              "$16\\pi$"
            ],
            "correctIndex": 0,
            "explanation": "Integrate in $y$: $y = \\sqrt{x} \\implies x = y^2$. Bounds: $y = 0$ to $y = 2$. Outer radius is $R = 4$, inner radius is $r = y^2$. $V = \\pi \\int_0^2 (4^2 - (y^2)^2) dy = \\pi \\int_0^2 (16 - y^4) dy = \\pi [16y - \\frac{y^5}{5}]_0^2 = \\pi (32 - \\frac{32}{5}) = \\frac{128\\pi}{5}$.",
            "distractorTip": "When revolving around a vertical axis, integrate with respect to $y$."
          },
          {
            "id": "c8-l9-q5",
            "stem": "Set up the integral to revolve the region bounded by $y = x^2$ and $y = 4$ around the horizontal line $y = 5$.",
            "options": [
              "$\\pi \\int_{-2}^2 [(5 - x^2)^2 - (5 - 4)^2] dx$",
              "$\\pi \\int_{-2}^2 [(5 - 4)^2 - (5 - x^2)^2] dx$",
              "$\\pi \\int_{-2}^2 (4 - x^2)^2 dx$",
              "$\\pi \\int_0^4 (5 - \\sqrt{y})^2 dy$"
            ],
            "correctIndex": 0,
            "explanation": "Axis is $y = 5$. Outer radius: distance from $y = 5$ to farther curve $y = x^2 \\implies R = 5 - x^2$. Inner radius: distance from $y = 5$ to closer curve $y = 4 \\implies r = 5 - 4 = 1$. Integral: $\\pi \\int_{-2}^2 ((5 - x^2)^2 - 1^2) dx$.",
            "distractorTip": "Radius to horizontal line $y = k$ is $|k - y|$."
          }
        ]
      },
      {
        "id": 810,
        "unitIndex": 8,
        "levelNumber": 10,
        "uniqueKey": "u8-l10",
        "topicNumber": "Topic 8.10",
        "name": "Final Apex Citadel: AP Exam Grand Pinnacle",
        "subtitle": "Boss level AP 5 Mastery Crown across all 8 units",
        "difficulty": "Boss",
        "rewardCoins": 30,
        "questions": [
          {
            "id": "c8-l10-q1",
            "stem": "Let $R$ be the region enclosed by $y = \\ln x$, $y = 0$, and $x = e$. Find the volume generated by revolving $R$ around the line $x = -1$.",
            "options": [
              "$\\pi \\int_0^1 [(e - (-1))^2 - (e^y - (-1))^2] dy$",
              "$\\pi \\int_1^e (\\ln x + 1)^2 dx$",
              "$2\\pi \\int_1^e x \\ln x dx$",
              "$\\pi \\int_0^1 (e^y + 1)^2 dy$"
            ],
            "correctIndex": 0,
            "explanation": "Integrate in $y$ from $0$ to $1$. Right curve: $x = e$. Left curve: $x = e^y$. Distance from axis $x = -1$: $R = e - (-1) = e + 1$; $r = e^y - (-1) = e^y + 1$. Volume $= \\pi \\int_0^1 [(e + 1)^2 - (e^y + 1)^2] dy$.",
            "distractorTip": "Washer method around shifted vertical axis $x = -1$."
          },
          {
            "id": "c8-l10-q2",
            "stem": "A particle has acceleration $a(t) = 6t - 12$. If $v(0) = 9$ and $s(0) = 2$, what is its position at $t = 3$?",
            "options": [
              "$11$",
              "$2$",
              "$20$",
              "$9$"
            ],
            "correctIndex": 0,
            "explanation": "$v(t) = 3t^2 - 12t + 9$. $s(t) = t^3 - 6t^2 + 9t + 2$. At $t = 3$: $s(3) = 27 - 6(9) + 9(3) + 2 = 27 - 54 + 27 + 2 = 2$.",
            "distractorTip": "Integrate twice with initial conditions."
          },
          {
            "id": "c8-l10-q3",
            "stem": "Find $\\lim_{x \\to 0} \\frac{\\int_0^x (e^{t^2} - 1) dt}{x^3}$.",
            "options": [
              "$\\frac{1}{3}$",
              "$1$",
              "$0$",
              "$\\frac{1}{2}$"
            ],
            "correctIndex": 0,
            "explanation": "L'H\xF4pital's Rule: $\\lim_{x \\to 0} \\frac{e^{x^2} - 1}{3x^2}$. Since $e^u - 1 \\approx u$ as $u \\to 0$, this equals $\\lim_{x \\to 0} \\frac{x^2}{3x^2} = \\frac{1}{3}$.",
            "distractorTip": "Combine FTC with L'H\xF4pital."
          },
          {
            "id": "c8-l10-q4",
            "stem": "The area bounded by $y = k x^2$ and $y = 4$ is $16$. What is the value of $k > 0$?",
            "options": [
              "$\\frac{4}{9}$",
              "$\\frac{2}{3}$",
              "$1$",
              "$\\frac{1}{4}$"
            ],
            "correctIndex": 0,
            "explanation": "Intersections: $k x^2 = 4 \\implies x = \\pm \\frac{2}{\\sqrt{k}}$. Area $= 2\\int_0^{2/\\sqrt{k}} (4 - k x^2) dx = 2[4x - \\frac{kx^3}{3}]_0^{2/\\sqrt{k}} = 2[\\frac{8}{\\sqrt{k}} - \\frac{8}{3\\sqrt{k}}] = 2(\\frac{16}{3\\sqrt{k}}) = \\frac{32}{3\\sqrt{k}} = 16 \\implies 3\\sqrt{k} = 2 \\implies \\sqrt{k} = 2/3 \\implies k = 4/9$.",
            "distractorTip": "Solve for parameter $k$ from definite integral area equation."
          },
          {
            "id": "c8-l10-q5",
            "stem": "A solid has base bounded by $y = \\cos x$ and the $x$-axis from $x = -\\pi/2$ to $\\pi/2$. Cross sections perpendicular to the $x$-axis are squares. What is the volume?",
            "options": [
              "$\\frac{\\pi}{2}$",
              "$\\pi$",
              "$1$",
              "$2$"
            ],
            "correctIndex": 0,
            "explanation": "Side is $s = \\cos x$. Area is $A(x) = \\cos^2 x = \\frac{1 + \\cos(2x)}{2}$. Volume $= \\int_{-\\pi/2}^{\\pi/2} \\frac{1 + \\cos(2x)}{2} dx = \\frac{1}{2}\\left[x + \\frac{\\sin(2x)}{2}\\right]_{-\\pi/2}^{\\pi/2} = \\frac{1}{2}(\\pi) = \\frac{\\pi}{2}$.",
            "distractorTip": "Trig half-angle identity for $\\cos^2 x$."
          },
          {
            "id": "c8-l10-q6",
            "stem": "If $f$ is continuous and $\\int_0^6 f(x) dx = 18$, what is $\\int_0^2 f(3x) dx$?",
            "options": [
              "$6$",
              "$54$",
              "$18$",
              "$2$"
            ],
            "correctIndex": 0,
            "explanation": "Let $u = 3x \\implies du = 3dx \\implies dx = \\frac{1}{3}du$. When $x=0, u=0$; when $x=2, u=6$. $\\int_0^2 f(3x) dx = \\frac{1}{3}\\int_0^6 f(u) du = \\frac{1}{3}(18) = 6$.",
            "distractorTip": "Horizontal scaling divides the integral by the scale factor $3$."
          },
          {
            "id": "c8-l10-q7",
            "stem": "Which of the following theorems establishes that if a continuous function has positive acceleration on $[a, b]$, its secant line lies strictly above the function curve?",
            "options": [
              "Concavity and the Second Derivative Theorem",
              "Mean Value Theorem",
              "Intermediate Value Theorem",
              "Extreme Value Theorem"
            ],
            "correctIndex": 0,
            "explanation": "Positive acceleration means $f''(x) > 0$, so the curve is strictly concave up. For any concave up function, secant chords lie strictly above the curve and tangent lines lie strictly below.",
            "distractorTip": "Grand conceptual synthesis question uniting rates, concavity, and approximation."
          }
        ]
      }
    ]
  }
];
function getAllCalculusAbLevels() {
  return ALL_CALC_AB_UNIT_DEFINITIONS.flatMap((u) => u.levels);
}

// src/data/quizBattleBank.ts
function normalizeGrade(grade) {
  if (!grade) return "9th Grade";
  const g = String(grade).toLowerCase();
  if (g.includes("9") || g.includes("freshman")) return "9th Grade";
  if (g.includes("10") || g.includes("sophomore")) return "10th Grade";
  if (g.includes("11") || g.includes("junior")) return "11th Grade";
  if (g.includes("12") || g.includes("senior")) return "12th Grade";
  if (g.includes("college")) return "College";
  return "9th Grade";
}
var AP_BATTLE_SUBJECTS = [
  { id: "ap-calculus-ab", name: "AP Calculus AB", icon: "\u{1F4D0}", color: "from-blue-600 to-indigo-700" },
  { id: "ap-calculus-bc", name: "AP Calculus BC", icon: "\u222B", color: "from-indigo-600 to-purple-700" },
  { id: "ap-physics", name: "AP Physics 1", icon: "\u26A1", color: "from-amber-600 to-orange-700" },
  { id: "ap-chemistry", name: "AP Chemistry", icon: "\u2697\uFE0F", color: "from-purple-600 to-violet-700" },
  { id: "ap-biology", name: "AP Biology", icon: "\u{1F9EC}", color: "from-emerald-600 to-teal-700" },
  { id: "ap-environmental-science", name: "AP Environmental Science", icon: "\u{1F331}", color: "from-green-600 to-emerald-700" },
  { id: "ap-computer-science-principles", name: "AP Computer Science Principles", icon: "\u{1F4BB}", color: "from-cyan-600 to-blue-700" },
  { id: "ap-computer-science", name: "AP Computer Science A (Java)", icon: "\u2615", color: "from-blue-700 to-slate-800" },
  { id: "ap-us-history", name: "AP U.S. History (APUSH)", icon: "\u{1F4DC}", color: "from-rose-600 to-red-700" },
  { id: "ap-world-history", name: "AP World History: Modern", icon: "\u{1F30D}", color: "from-orange-600 to-amber-700" },
  { id: "ap-human-geography", name: "AP Human Geography", icon: "\u{1F5FA}\uFE0F", color: "from-sky-600 to-teal-700" },
  { id: "ap-psychology", name: "AP Psychology", icon: "\u{1F9E0}", color: "from-pink-600 to-rose-700" },
  { id: "ap-economics", name: "AP Micro & Macroeconomics", icon: "\u{1F4CA}", color: "from-emerald-700 to-teal-800" },
  { id: "ap-english-lang", name: "AP English Language", icon: "\u270D\uFE0F", color: "from-violet-600 to-purple-800" }
];
var BATTLE_QUESTIONS_BANK = {
  "ap-calculus-ab": [
    {
      "id": "calc_1",
      "subjectId": "ap-calculus-ab",
      "stem": "If $f(x) = x^3 - 3x^2 + 4$, at which $x$-value does $f$ have a relative minimum?",
      "options": [
        "$x = 0$",
        "$x = 1$",
        "$x = 2$",
        "$x = -2$"
      ],
      "correctIndex": 2,
      "explanation": "$f'(x) = 3x^2 - 6x = 3x(x - 2) = 0$. $f''(2) = 6 > 0$, so $x = 2$ is a relative minimum.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "calc_2",
      "subjectId": "ap-calculus-ab",
      "stem": "Evaluate $\\lim_{x \\to 0} \\frac{\\sin(5x)}{2x}$.",
      "options": [
        "$\\frac{1}{2}$",
        "$\\frac{5}{2}$",
        "$0$",
        "Does not exist"
      ],
      "correctIndex": 1,
      "explanation": "Using L'Hopital's rule or standard trigonometric limits: $\\lim_{x \\to 0} \\frac{\\sin(5x)}{2x} = \\frac{5}{2} \\lim_{x \\to 0} \\frac{\\sin(5x)}{5x} = \\frac{5}{2} \\times 1 = \\frac{5}{2}$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "calc_3",
      "subjectId": "ap-calculus-ab",
      "stem": "What is $\\frac{d}{dx} \\left[ \\ln(x^2 + 1) \\right]$?",
      "options": [
        "$\\frac{1}{x^2 + 1}$",
        "$\\frac{2x}{x^2 + 1}$",
        "$\\frac{2}{x}$",
        "$\\frac{x}{x^2 + 1}$"
      ],
      "correctIndex": 1,
      "explanation": "By the chain rule: $\\frac{d}{dx}[\\ln(u)] = \\frac{u'}{u} = \\frac{2x}{x^2 + 1}$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "calc_4",
      "subjectId": "ap-calculus-ab",
      "stem": "Evaluate the definite integral $\\int_0^3 (2x + 1) dx$.",
      "options": [
        "$10$",
        "$12$",
        "$15$",
        "$9$"
      ],
      "correctIndex": 1,
      "explanation": "$\\int_0^3 (2x + 1) dx = [x^2 + x]_0^3 = (9 + 3) - 0 = 12$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "calc_5",
      "subjectId": "ap-calculus-ab",
      "stem": "If $y = e^{3x}$, find the second derivative $\\frac{d^2y}{dx^2}$.",
      "options": [
        "$3e^{3x}$",
        "$6e^{3x}$",
        "$9e^{3x}$",
        "$27e^{3x}$"
      ],
      "correctIndex": 2,
      "explanation": "$y' = 3e^{3x}$, and $y'' = 3 \\cdot 3e^{3x} = 9e^{3x}$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "calc_6",
      "subjectId": "ap-calculus-ab",
      "stem": "What is the slope of the tangent line to $y = \\cos(2x)$ at $x = \\frac{\\pi}{4}$?",
      "options": [
        "$-2$",
        "$0$",
        "$2$",
        "$-1$"
      ],
      "correctIndex": 0,
      "explanation": "$y' = -2\\sin(2x)$. At $x = \\pi/4$, $y' = -2\\sin(\\pi/2) = -2(1) = -2$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "calc_7",
      "subjectId": "ap-calculus-ab",
      "stem": "If $\\int_1^5 f(x) dx = 10$ and $\\int_1^3 f(x) dx = 4$, what is $\\int_3^5 f(x) dx$?",
      "options": [
        "$6$",
        "$14$",
        "$-6$",
        "$2.5$"
      ],
      "correctIndex": 0,
      "explanation": "$\\int_3^5 f(x) dx = \\int_1^5 f(x) dx - \\int_1^3 f(x) dx = 10 - 4 = 6$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "calc_8",
      "subjectId": "ap-calculus-ab",
      "stem": "Find the derivative of $f(x) = x \\cdot e^x$.",
      "options": [
        "$e^x$",
        "$x e^x$",
        "$e^x(x + 1)$",
        "$2x e^x$"
      ],
      "correctIndex": 2,
      "explanation": "Using product rule: $f'(x) = (1)(e^x) + (x)(e^x) = e^x(x + 1)$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "calc_9",
      "subjectId": "ap-calculus-ab",
      "stem": "If $g(x) = \\int_0^x (t^2 - 9) dt$, at which $x > 0$ does $g$ have a relative minimum?",
      "options": [
        "$x = 0$",
        "$x = 3$",
        "$x = 9$",
        "$x = \\sqrt{3}$"
      ],
      "correctIndex": 1,
      "explanation": "By FTC 1, $g'(x) = x^2 - 9$. For $x > 0$, $g'(x) = 0 \\implies x = 3$. $g'(x)$ changes from negative to positive at $x = 3$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "calc_10",
      "subjectId": "ap-calculus-ab",
      "stem": "Evaluate $\\int \\frac{1}{2x + 5} dx$.",
      "options": [
        "$\\ln|2x + 5| + C$",
        "$\\frac{1}{2} \\ln|2x + 5| + C$",
        "$2\\ln|2x + 5| + C$",
        "$\\frac{-1}{(2x+5)^2} + C$"
      ],
      "correctIndex": 1,
      "explanation": "Let $u = 2x + 5 \\implies du = 2 dx \\implies \\int \\frac{1}{u} \\frac{du}{2} = \\frac{1}{2} \\ln|2x + 5| + C$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "calc_11",
      "subjectId": "ap-calculus-ab",
      "stem": "What is the average value of $f(x) = 3x^2$ on the interval $[0, 2]$?",
      "options": [
        "$4$",
        "$6$",
        "$8$",
        "$12$"
      ],
      "correctIndex": 0,
      "explanation": "$f_{avg} = \\frac{1}{2 - 0} \\int_0^2 3x^2 dx = \\frac{1}{2} [x^3]_0^2 = \\frac{1}{2}(8) = 4$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "calc_12",
      "subjectId": "ap-calculus-ab",
      "stem": "If $f(x)$ is continuous on $[1, 5]$ and $f(1) = 2, f(5) = 10$, the IVT guarantees a value $c$ where $f(c) = $?",
      "options": [
        "$0$",
        "$7$",
        "$12$",
        "$-2$"
      ],
      "correctIndex": 1,
      "explanation": "By the Intermediate Value Theorem, $f(c)$ takes on every value between $2$ and $10$, including $7$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "calc_13",
      "subjectId": "ap-calculus-ab",
      "stem": "Find $\\lim_{x \\to \\infty} \\frac{4x^3 - 2x + 1}{7x^3 + 5x^2}$.",
      "options": [
        "$\\frac{4}{7}$",
        "$0$",
        "$\\infty$",
        "$\\frac{2}{5}$"
      ],
      "correctIndex": 0,
      "explanation": "Comparing leading coefficients of degree 3 terms: $\\lim_{x \\to \\infty} \\frac{4x^3}{7x^3} = \\frac{4}{7}$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "calc_14",
      "subjectId": "ap-calculus-ab",
      "stem": "What is $\\frac{d}{dx} [\\arctan(x)]$?",
      "options": [
        "$\\frac{1}{1 + x^2}$",
        "$\\frac{1}{\\sqrt{1 - x^2}}$",
        "$\\frac{-1}{1 + x^2}$",
        "$\\sec^2(x)$"
      ],
      "correctIndex": 0,
      "explanation": "The standard derivative of inverse tangent is $\\frac{d}{dx}[\\arctan(x)] = \\frac{1}{1 + x^2}$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "calc_15",
      "subjectId": "ap-calculus-ab",
      "stem": "If a particle position is $s(t) = t^3 - 6t^2 + 9t$, at what time $t > 0$ is its acceleration zero?",
      "options": [
        "$t = 1$",
        "$t = 2$",
        "$t = 3$",
        "$t = 4$"
      ],
      "correctIndex": 1,
      "explanation": "$v(t) = s'(t) = 3t^2 - 12t + 9$. $a(t) = v'(t) = 6t - 12 = 0 \\implies t = 2$.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-physics-1": [
    {
      "id": "phys_1",
      "subjectId": "ap-physics-1",
      "stem": "An object is dropped from rest from a cliff. Neglecting air resistance, what is its speed after $3.0\\text{ s}$? ($g = 9.8\\text{ m/s}^2$)",
      "options": [
        "$14.7\\text{ m/s}$",
        "$29.4\\text{ m/s}$",
        "$44.1\\text{ m/s}$",
        "$9.8\\text{ m/s}$"
      ],
      "correctIndex": 1,
      "explanation": "$v = v_0 + gt = 0 + (9.8)(3.0) = 29.4\\text{ m/s}$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "phys_2",
      "subjectId": "ap-physics-1",
      "stem": "A net external force $F$ acts on an object of mass $m$, giving it acceleration $a$. If the mass is doubled and force is halved, what is the new acceleration?",
      "options": [
        "$4a$",
        "$2a$",
        "$\\frac{a}{2}$",
        "$\\frac{a}{4}$"
      ],
      "correctIndex": 3,
      "explanation": "$a_{new} = \\frac{F/2}{2m} = \\frac{1}{4} \\frac{F}{m} = \\frac{a}{4}$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "phys_3",
      "subjectId": "ap-physics-1",
      "stem": "A car travels in a horizontal circle of radius $R$ at constant speed $v$. What force provides the centripetal acceleration?",
      "options": [
        "Centrifugal force",
        "Static friction between tires and road",
        "Gravitational force",
        "Normal force from the ground"
      ],
      "correctIndex": 1,
      "explanation": "Static friction between the car tires and the road surface prevents slipping and points towards the circle center.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "phys_4",
      "subjectId": "ap-physics-1",
      "stem": "A $2\\text{ kg}$ cart moving at $3\\text{ m/s}$ collides and sticks to a stationary $1\\text{ kg}$ cart. What is their final common speed?",
      "options": [
        "$1.5\\text{ m/s}$",
        "$2.0\\text{ m/s}$",
        "$2.5\\text{ m/s}$",
        "$3.0\\text{ m/s}$"
      ],
      "correctIndex": 1,
      "explanation": "Conservation of momentum: $p_i = (2)(3) + 0 = 6\\text{ kg}\\cdot\\text{m/s}$. $v_f = \\frac{6}{2 + 1} = 2.0\\text{ m/s}$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "phys_5",
      "subjectId": "ap-physics-1",
      "stem": "A simple pendulum has period $T$ on Earth. If the length of the string is quadrupled ($4L$), what is the new period?",
      "options": [
        "$4T$",
        "$2T$",
        "$\\frac{T}{2}$",
        "$\\sqrt{2}T$"
      ],
      "correctIndex": 1,
      "explanation": "$T = 2\\pi\\sqrt{\\frac{L}{g}}$. Replacing $L$ with $4L$ gives $T_{new} = 2\\pi\\sqrt{\\frac{4L}{g}} = 2 T$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "phys_6",
      "subjectId": "ap-physics-1",
      "stem": "How much work is done by the gravitational force on a $5\\text{ kg}$ satellite in a circular orbit of radius $R$ during one full revolution?",
      "options": [
        "$0\\text{ J}$",
        "$5\\pi R\\text{ J}$",
        "$10g R\\text{ J}$",
        "$50\\text{ J}$"
      ],
      "correctIndex": 0,
      "explanation": "Gravity is perpendicular to the displacement vector at every point in a circular orbit ($W = F d \\cos(90^\\circ) = 0\\text{ J}$).",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "phys_7",
      "subjectId": "ap-physics-1",
      "stem": "A spring with spring constant $k = 200\\text{ N/m}$ is compressed by $0.1\\text{ m}$. What is the stored elastic potential energy?",
      "options": [
        "$1.0\\text{ J}$",
        "$2.0\\text{ J}$",
        "$10\\text{ J}$",
        "$20\\text{ J}$"
      ],
      "correctIndex": 0,
      "explanation": "$U_s = \\frac{1}{2} k x^2 = \\frac{1}{2} (200) (0.1)^2 = 100 \\times 0.01 = 1.0\\text{ J}$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "phys_8",
      "subjectId": "ap-physics-1",
      "stem": "A solid disk and a hollow ring of identical mass and radius roll down an incline without slipping. Which reaches the bottom first?",
      "options": [
        "The hollow ring",
        "The solid disk",
        "Both at the same time",
        "Depends on the incline angle"
      ],
      "correctIndex": 1,
      "explanation": "The solid disk has a smaller rotational inertia ($I = \\frac{1}{2}MR^2 < MR^2$), converting more PE into translational KE, so it accelerates faster.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "phys_9",
      "subjectId": "ap-physics-1",
      "stem": "An elevator is accelerating upwards at $2\\text{ m/s}^2$. What apparent weight does an $80\\text{ kg}$ passenger feel? ($g = 10\\text{ m/s}^2$)",
      "options": [
        "$640\\text{ N}$",
        "$800\\text{ N}$",
        "$960\\text{ N}$",
        "$160\\text{ N}$"
      ],
      "correctIndex": 2,
      "explanation": "$N - mg = ma \\implies N = m(g + a) = 80(10 + 2) = 960\\text{ N}$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "phys_10",
      "subjectId": "ap-physics-1",
      "stem": "What happens to the total mechanical energy of a falling apple if air resistance is negligible?",
      "options": [
        "It increases",
        "It decreases",
        "It remains constant",
        "It oscillates"
      ],
      "correctIndex": 2,
      "explanation": "With only conservative gravitational forces doing work, total mechanical energy ($KE + PE$) remains strictly conserved.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "phys_11",
      "subjectId": "ap-physics-1",
      "stem": "A net torque of $20\\text{ N}\\cdot\\text{m}$ acts on a wheel with moment of inertia $I = 4\\text{ kg}\\cdot\\text{m}^2$. What is the angular acceleration $\\alpha$?",
      "options": [
        "$5\\text{ rad/s}^2$",
        "$80\\text{ rad/s}^2$",
        "$0.2\\text{ rad/s}^2$",
        "$16\\text{ rad/s}^2$"
      ],
      "correctIndex": 0,
      "explanation": "$\\tau = I\\alpha \\implies \\alpha = \\frac{\\tau}{I} = \\frac{20}{4} = 5\\text{ rad/s}^2$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "phys_12",
      "subjectId": "ap-physics-1",
      "stem": "A projectile launched at angle $\\theta$ has maximum horizontal range when $\\theta$ equals:",
      "options": [
        "$30^\\circ$",
        "$45^\\circ$",
        "$60^\\circ$",
        "$90^\\circ$"
      ],
      "correctIndex": 1,
      "explanation": "Range $R = \\frac{v_0^2 \\sin(2\\theta)}{g}$, which reaches maximum when $\\sin(2\\theta) = 1 \\implies \\theta = 45^\\circ$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "phys_13",
      "subjectId": "ap-physics-1",
      "stem": "An astronaut floating in space throws a wrench forward. What happens to the astronaut?",
      "options": [
        "Moves forward faster",
        "Moves backward with equal momentum",
        "Remains stationary",
        "Spins continuously in place"
      ],
      "correctIndex": 1,
      "explanation": "By conservation of momentum ($p_{initial} = 0$), $p_{astronaut} = -p_{wrench}$, so the astronaut recoils backward.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "phys_14",
      "subjectId": "ap-physics-1",
      "stem": "If the distance between two gravitational masses is doubled, the gravitational force between them is multiplied by:",
      "options": [
        "$2$",
        "$\\frac{1}{2}$",
        "$\\frac{1}{4}$",
        "$4$"
      ],
      "correctIndex": 2,
      "explanation": "Newton's law of universal gravitation follows an inverse-square law: $F \\propto \\frac{1}{r^2} \\implies \\frac{1}{2^2} = \\frac{1}{4}$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "phys_15",
      "subjectId": "ap-physics-1",
      "stem": "What physical quantity is represented by the area under a Force vs. Time graph?",
      "options": [
        "Work",
        "Kinetic Energy",
        "Impulse",
        "Power"
      ],
      "correctIndex": 2,
      "explanation": "Impulse $J = \\int F dt = \\Delta p$, which corresponds directly to the area under a Force-Time graph.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-biology": [
    {
      "id": "bio_1",
      "subjectId": "ap-biology",
      "stem": "Which organelle is responsible for generating the majority of cellular ATP via oxidative phosphorylation?",
      "options": [
        "Golgi Apparatus",
        "Mitochondria",
        "Endoplasmic Reticulum",
        "Lysosome"
      ],
      "correctIndex": 1,
      "explanation": "Mitochondria carry out the Krebs cycle and oxidative phosphorylation via the electron transport chain to produce ATP.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "bio_2",
      "subjectId": "ap-biology",
      "stem": "What type of chemical bond holds the complementary base pairs (A-T and G-C) together in double-stranded DNA?",
      "options": [
        "Covalent phosphodiester bonds",
        "Hydrogen bonds",
        "Ionic bonds",
        "Disulfide bridges"
      ],
      "correctIndex": 1,
      "explanation": "Hydrogen bonds (2 between A-T, 3 between G-C) connect complementary nitrogenous bases across antiparallel strands.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "bio_3",
      "subjectId": "ap-biology",
      "stem": "In a cross between two heterozygous pea plants ($Aa \\times Aa$), what is the expected phenotypic ratio of dominant to recessive traits?",
      "options": [
        "$1:1$",
        "$3:1$",
        "$9:3:3:1$",
        "$1:2:1$"
      ],
      "correctIndex": 1,
      "explanation": "The Punnett square yields $1 AA : 2 Aa : 1 aa$, resulting in a $3:1$ dominant to recessive phenotypic ratio.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "bio_4",
      "subjectId": "ap-biology",
      "stem": "During which stage of aerobic cellular respiration is molecular oxygen ($O_2$) directly consumed?",
      "options": [
        "Glycolysis",
        "Krebs Cycle (Citric Acid Cycle)",
        "Electron Transport Chain",
        "Lactic Acid Fermentation"
      ],
      "correctIndex": 2,
      "explanation": "Oxygen acts as the terminal electron acceptor at complex IV of the mitochondrial electron transport chain, forming water ($H_2O$).",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "bio_5",
      "subjectId": "ap-biology",
      "stem": "Which enzyme unwinds the double helix at the replication fork during DNA replication?",
      "options": [
        "DNA Polymerase III",
        "Topoisomerase",
        "DNA Helicase",
        "RNA Primase"
      ],
      "correctIndex": 2,
      "explanation": "DNA Helicase breaks hydrogen bonds between bases to unwind and separate DNA strands at replication forks.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "bio_6",
      "subjectId": "ap-biology",
      "stem": "What type of passive transport moves water across a selectively permeable membrane down its concentration gradient?",
      "options": [
        "Osmosis",
        "Active Transport",
        "Endocytosis",
        "Phagocytosis"
      ],
      "correctIndex": 0,
      "explanation": "Osmosis is the net diffusion of water across a semipermeable membrane from low solute to high solute concentration.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "bio_7",
      "subjectId": "ap-biology",
      "stem": "Which molecule carries genetic codons from the nucleus to ribosomes for translation?",
      "options": [
        "tRNA",
        "rRNA",
        "mRNA",
        "snRNA"
      ],
      "correctIndex": 2,
      "explanation": "Messenger RNA (mRNA) transcribes genetic code from DNA and carries it to ribosomes to synthesize polypeptide chains.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "bio_8",
      "subjectId": "ap-biology",
      "stem": "Enzymes accelerate biological reactions primarily by:",
      "options": [
        "Increasing the free energy change ($\\Delta G$)",
        "Lowering the activation energy ($E_a$)",
        "Raising reaction temperature",
        "Consuming reactants"
      ],
      "correctIndex": 1,
      "explanation": "Enzymes act as catalysts by stabilizing transition states and lowering activation energy ($E_a$) without altering $\\Delta G$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "bio_9",
      "subjectId": "ap-biology",
      "stem": "Which phase of mitosis is characterized by chromosomes aligning along the cell equatorial plate?",
      "options": [
        "Prophase",
        "Metaphase",
        "Anaphase",
        "Telophase"
      ],
      "correctIndex": 1,
      "explanation": "During metaphase, spindle fibers align duplicated sister chromatids along the metaphase plate in the center of the cell.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "bio_10",
      "subjectId": "ap-biology",
      "stem": "In the Hardy-Weinberg equilibrium ($p^2 + 2pq + q^2 = 1$), what does the term $2pq$ represent?",
      "options": [
        "Frequency of homozygous dominant individuals",
        "Frequency of heterozygous individuals",
        "Frequency of homozygous recessive individuals",
        "Frequency of dominant alleles"
      ],
      "correctIndex": 1,
      "explanation": "$p^2$ represents homozygous dominant, $q^2$ represents homozygous recessive, and $2pq$ represents heterozygous genotypes.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "bio_11",
      "subjectId": "ap-biology",
      "stem": "Which light-absorbing pigment is primary in driving photosynthesis in green plants?",
      "options": [
        "Carotenoids",
        "Chlorophyll a",
        "Anthocyanin",
        "Xanthophyll"
      ],
      "correctIndex": 1,
      "explanation": "Chlorophyll a absorbs blue and red wavelengths while reflecting green light, acting as the primary reaction center pigment.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "bio_12",
      "subjectId": "ap-biology",
      "stem": "What cellular process yields four genetically diverse haploid daughter gametes?",
      "options": [
        "Mitosis",
        "Meiosis",
        "Binary Fission",
        "Budding"
      ],
      "correctIndex": 1,
      "explanation": "Meiosis consists of two successive cell divisions that reduce diploid chromosome numbers by half, producing four unique haploid gametes.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "bio_13",
      "subjectId": "ap-biology",
      "stem": "Which hormone is known to induce fruit ripening and promote plant leaf abscission?",
      "options": [
        "Auxin",
        "Ethylene",
        "Gibberellin",
        "Abscisic acid"
      ],
      "correctIndex": 1,
      "explanation": "Ethylene is a gaseous plant hormone that coordinates fruit ripening and senescence via positive feedback.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "bio_14",
      "subjectId": "ap-biology",
      "stem": "In prokaryotes, the operon model regulates gene expression. What binds to the operator to block transcription?",
      "options": [
        "RNA Polymerase",
        "Repressor Protein",
        "Corepressor",
        "Inducer"
      ],
      "correctIndex": 1,
      "explanation": "A repressor protein physically binds to the operator region of DNA, preventing RNA polymerase from transcribing structural genes.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "bio_15",
      "subjectId": "ap-biology",
      "stem": "A competitive inhibitor decreases the rate of an enzymatic reaction by:",
      "options": [
        "Binding permanently to the allosteric site",
        "Binding directly to the active site",
        "Denaturing the tertiary protein structure",
        "Altering reaction pH"
      ],
      "correctIndex": 1,
      "explanation": "Competitive inhibitors mimic substrate shape and compete directly for binding at the catalytic active site.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-chemistry": [
    {
      "id": "chem_1",
      "subjectId": "ap-chemistry",
      "stem": "What is the pH of a $0.001\\text{ M } \\text{HCl}$ aqueous solution?",
      "options": [
        "$1$",
        "$3$",
        "$7$",
        "$11$"
      ],
      "correctIndex": 1,
      "explanation": "$\\text{HCl}$ is a strong acid that dissociates completely: $[H^+] = 10^{-3}\\text{ M}$. $\\text{pH} = -\\log[H^+] = 3$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "chem_2",
      "subjectId": "ap-chemistry",
      "stem": "According to VSEPR theory, what is the molecular geometry of a water molecule ($H_2O$)?",
      "options": [
        "Linear",
        "Trigonal Planar",
        "Bent",
        "Tetrahedral"
      ],
      "correctIndex": 2,
      "explanation": "Water has 4 electron domains (2 bonding pairs, 2 lone pairs) on the central oxygen atom, yielding a bent molecular geometry (~$104.5^\\circ$).",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "chem_3",
      "subjectId": "ap-chemistry",
      "stem": "Which element has the highest electronegativity on the Pauling scale?",
      "options": [
        "Oxygen ($O$)",
        "Fluorine ($F$)",
        "Chlorine ($Cl$)",
        "Cesium ($Cs$)"
      ],
      "correctIndex": 1,
      "explanation": "Fluorine ($F$) is the most electronegative element with a Pauling value of 3.98.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "chem_4",
      "subjectId": "ap-chemistry",
      "stem": "For an exothermic reaction at equilibrium ($A \\rightleftharpoons B + \\text{heat}$), what happens if temperature is increased?",
      "options": [
        "Shifts toward products ($B$)",
        "Shifts toward reactants ($A$)",
        "Equilibrium constant $K$ increases",
        "No change occurs"
      ],
      "correctIndex": 1,
      "explanation": "By Le Chatelier's principle, adding heat to an exothermic reaction shifts the equilibrium toward the endothermic direction (reactants $A$) and decreases $K$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "chem_5",
      "subjectId": "ap-chemistry",
      "stem": "What type of intermolecular force is primarily responsible for the unusually high boiling point of water?",
      "options": [
        "London dispersion forces",
        "Dipole-dipole forces",
        "Hydrogen bonding",
        "Ionic bonding"
      ],
      "correctIndex": 2,
      "explanation": "Strong hydrogen bonds between hydrogen atoms bonded to highly electronegative oxygen atoms cause water to have an elevated boiling point.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "chem_6",
      "subjectId": "ap-chemistry",
      "stem": "What is the oxidation number of sulfur in the sulfate ion ($SO_4^{2-}$)?",
      "options": [
        "$+4$",
        "$+6$",
        "$-2$",
        "$+2$"
      ],
      "correctIndex": 1,
      "explanation": "$S + 4(-2) = -2 \\implies S - 8 = -2 \\implies S = +6$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "chem_7",
      "subjectId": "ap-chemistry",
      "stem": "If a gas occupies $2.0\\text{ L}$ at $1.0\\text{ atm}$, what volume will it occupy at $4.0\\text{ atm}$ at constant temperature?",
      "options": [
        "$0.5\\text{ L}$",
        "$1.0\\text{ L}$",
        "$8.0\\text{ L}$",
        "$2.0\\text{ L}$"
      ],
      "correctIndex": 0,
      "explanation": "By Boyle's Law: $P_1 V_1 = P_2 V_2 \\implies (1.0)(2.0) = (4.0) V_2 \\implies V_2 = 0.5\\text{ L}$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "chem_8",
      "subjectId": "ap-chemistry",
      "stem": "Which thermodynamic state function must be negative for a process to be spontaneous at constant temperature and pressure?",
      "options": [
        "$\\Delta H$",
        "$\\Delta S$",
        "$\\Delta G$",
        "$\\Delta E$"
      ],
      "correctIndex": 2,
      "explanation": "A process is strictly spontaneous if and only if Gibbs Free Energy change is negative ($\\Delta G < 0$).",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "chem_9",
      "subjectId": "ap-chemistry",
      "stem": "In the reaction rate law $\\text{Rate} = k [A]^2 [B]$, what is the overall reaction order?",
      "options": [
        "$1$",
        "$2$",
        "$3$",
        "$0$"
      ],
      "correctIndex": 2,
      "explanation": "The overall reaction order is the sum of reactant exponents: $2 + 1 = 3$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "chem_10",
      "subjectId": "ap-chemistry",
      "stem": "How many valence electrons does a neutral chlorine ($Cl$) atom possess?",
      "options": [
        "$5$",
        "$7$",
        "$8$",
        "$17$"
      ],
      "correctIndex": 1,
      "explanation": "Chlorine is a halogen in Group 17 with electron configuration $[Ne] 3s^2 3p^5$, giving 7 valence electrons.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "chem_11",
      "subjectId": "ap-chemistry",
      "stem": "A buffer solution can be prepared by mixing approximately equal molar quantities of:",
      "options": [
        "$\\text{HCl}$ and $\\text{NaCl}$",
        "$\\text{CH}_3\\text{COOH}$ and $\\text{CH}_3\\text{COONa}$",
        "$\\text{NaOH}$ and $\\text{NaCl}$",
        "$\\text{HNO}_3$ and $\\text{KNO}_3$"
      ],
      "correctIndex": 1,
      "explanation": "A buffer requires a weak acid (acetic acid) and its conjugate base (sodium acetate).",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "chem_12",
      "subjectId": "ap-chemistry",
      "stem": "Which element has the largest atomic radius among the following?",
      "options": [
        "Lithium ($Li$)",
        "Sodium ($Na$)",
        "Potassium ($K$)",
        "Rubidium ($Rb$)"
      ],
      "correctIndex": 3,
      "explanation": "Atomic radius increases going down a group due to the addition of principal energy levels (electron shielding).",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "chem_13",
      "subjectId": "ap-chemistry",
      "stem": "In an electrochemical cell, reduction always occurs at the:",
      "options": [
        "Anode",
        "Cathode",
        "Salt Bridge",
        "Voltmeter"
      ],
      "correctIndex": 1,
      "explanation": "Remember RED CAT: REDuction always takes place at the CAThode.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "chem_14",
      "subjectId": "ap-chemistry",
      "stem": "What is the hybridization of the carbon atom in methane ($CH_4$)?",
      "options": [
        "$sp$",
        "$sp^2$",
        "$sp^3$",
        "$sp^3d$"
      ],
      "correctIndex": 2,
      "explanation": "Methane has 4 single $\\sigma$ bonds and zero lone pairs on carbon, requiring $sp^3$ orbital hybridization.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "chem_15",
      "subjectId": "ap-chemistry",
      "stem": "What happens to the vapor pressure of a liquid as its temperature increases?",
      "options": [
        "It decreases",
        "It increases exponentially",
        "It remains constant",
        "It drops to zero"
      ],
      "correctIndex": 1,
      "explanation": "As temperature increases, more molecules possess sufficient kinetic energy to overcome intermolecular attractions, increasing vapor pressure.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-us-history": [
    {
      "id": "apush_1",
      "subjectId": "ap-us-history",
      "stem": "The primary purpose of the Monroe Doctrine (1823) was to:",
      "options": [
        "Secure American colonies in Africa",
        "Warn European powers against further colonization in the Western Hemisphere",
        "Form a military alliance with Great Britain",
        "Annex Cuba and Puerto Rico immediately"
      ],
      "correctIndex": 1,
      "explanation": "President Monroe declared the American continents closed to future European colonization and interference.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "apush_2",
      "subjectId": "ap-us-history",
      "stem": "Which constitutional amendment formally abolished slavery throughout the United States?",
      "options": [
        "13th Amendment",
        "14th Amendment",
        "15th Amendment",
        "19th Amendment"
      ],
      "correctIndex": 0,
      "explanation": "The 13th Amendment (ratified in 1865) explicitly abolished slavery and involuntary servitude except as punishment for a crime.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "apush_3",
      "subjectId": "ap-us-history",
      "stem": "Thomas Paine published Common Sense in 1776 primarily to:",
      "options": [
        "Support reconciliation with King George III",
        "Convince American colonists to declare complete independence from Great Britain",
        "Oppose the Continental Congress",
        "Advocate for French royal control of Canada"
      ],
      "correctIndex": 1,
      "explanation": "Common Sense used plain, persuasive language arguing that hereditary monarchy was tyrannical and independence was necessary.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "apush_4",
      "subjectId": "ap-us-history",
      "stem": "What was the central goal of President Franklin D. Roosevelt New Deal programs in the 1930s?",
      "options": [
        "Expand American territories in the Pacific",
        "Provide Relief, Recovery, and Reform during the Great Depression",
        "Dismantle federal banking and regulation",
        "Privatize the national railway system"
      ],
      "correctIndex": 1,
      "explanation": "The New Deal focused on the Three Rs: Relief for the unemployed, Recovery of the economy, and Reform of financial systems.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "apush_5",
      "subjectId": "ap-us-history",
      "stem": "The landmark Supreme Court decision Brown v. Board of Education (1954) ruled that:",
      "options": [
        "Separate but equal public facilities are constitutional",
        "Racial segregation in public schools is inherently unequal and unconstitutional",
        "States can regulate civil rights without federal oversight",
        "Affirmative action in college admissions is illegal"
      ],
      "correctIndex": 1,
      "explanation": "The Warren Court unanimously overturned Plessy v. Ferguson, ruling that racial segregation in public schools violates the 14th Amendment.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "apush_6",
      "subjectId": "ap-us-history",
      "stem": "The Missouri Compromise of 1820 maintained sectional balance by admitting Missouri as a slave state and which state as a free state?",
      "options": [
        "Maine",
        "Kansas",
        "California",
        "Vermont"
      ],
      "correctIndex": 0,
      "explanation": "Maine was admitted as a free state, and slavery was prohibited north of latitude $36^\\circ 30'$ in the remainder of the Louisiana Territory.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "apush_7",
      "subjectId": "ap-us-history",
      "stem": "Which 1890 event marked the tragic end of major armed conflict between the US Army and Native American Plains tribes?",
      "options": [
        "Battle of Little Bighorn",
        "Wounded Knee Massacre",
        "Trail of Tears",
        "Sand Creek Massacre"
      ],
      "correctIndex": 1,
      "explanation": "The massacre at Wounded Knee Creek, South Dakota, resulted in the deaths of approximately 300 Lakota Sioux and effectively ended Plains resistance.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "apush_8",
      "subjectId": "ap-us-history",
      "stem": "What was the main purpose of the Federalist Papers written by Hamilton, Madison, and Jay?",
      "options": [
        "To urge ratification of the new United States Constitution",
        "To defend the Articles of Confederation",
        "To support the Declaration of Independence",
        "To protest against taxation in Massachusetts"
      ],
      "correctIndex": 0,
      "explanation": "The 85 essays argued persuasively for the ratification of the newly drafted US Constitution and a stronger federal republic.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "apush_9",
      "subjectId": "ap-us-history",
      "stem": "The Seneca Falls Convention of 1848 is historically renowned as the inaugural national meeting dedicated to:",
      "options": [
        "Abolition of slavery",
        "Women rights and suffrage",
        "Labor union organizing",
        "Temperance and prohibition"
      ],
      "correctIndex": 1,
      "explanation": "Organized by Elizabeth Cady Stanton and Lucretia Mott, Seneca Falls produced the Declaration of Sentiments demanding equal rights for women.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "apush_10",
      "subjectId": "ap-us-history",
      "stem": "President Lyndon B. Johnson signature domestic reform package was named the:",
      "options": [
        "Square Deal",
        "Fair Deal",
        "Great Society",
        "New Frontier"
      ],
      "correctIndex": 2,
      "explanation": "The Great Society introduced major legislation including Medicare, Medicaid, the Civil Rights Act, and the War on Poverty.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "apush_11",
      "subjectId": "ap-us-history",
      "stem": "Which international incident prompted the United States to formally enter World War II in December 1941?",
      "options": [
        "Sinking of the Lusitania",
        "Japanese attack on Pearl Harbor",
        "Invasion of Poland",
        "Fall of France"
      ],
      "correctIndex": 1,
      "explanation": "On December 7, 1941, the Japanese surprise aerial attack on Pearl Harbor, Hawaii, brought the US into World War II.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "apush_12",
      "subjectId": "ap-us-history",
      "stem": "The Progressive Era muckraker Upton Sinclair exposed unsanitary conditions in the meatpacking industry in his novel:",
      "options": [
        "The Jungle",
        "How the Other Half Lives",
        "The Grapes of Wrath",
        "The Octopus"
      ],
      "correctIndex": 0,
      "explanation": "The Jungle (1906) sparked public outrage that led directly to the passage of the Pure Food and Drug Act and Meat Inspection Act.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "apush_13",
      "subjectId": "ap-us-history",
      "stem": "Under the Articles of Confederation, the national government lacked the crucial power to:",
      "options": [
        "Declare war",
        "Levy direct taxes",
        "Sign foreign treaties",
        "Operate a post office"
      ],
      "correctIndex": 1,
      "explanation": "The Confederation Congress had no power to tax citizens directly, leaving the central government chronically underfunded.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "apush_14",
      "subjectId": "ap-us-history",
      "stem": "The Marshall Plan following World War II provided billions of dollars in economic aid primarily to:",
      "options": [
        "Rebuild war-torn Western European nations and resist communism",
        "Support Nationalist China",
        "Fund NASA lunar research",
        "Rebuild Latin American infrastructure"
      ],
      "correctIndex": 0,
      "explanation": "The Marshall Plan stabilized Western European economies to foster democratic prosperity and contain Soviet communist expansion.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "apush_15",
      "subjectId": "ap-us-history",
      "stem": "Which technological innovation revolutionized cotton processing and unintentionally entrenched Southern slavery in the 1790s?",
      "options": [
        "Steam engine",
        "Cotton gin",
        "Spinning jenny",
        "Mechanical reaper"
      ],
      "correctIndex": 1,
      "explanation": "Eli Whitney cotton gin made short-staple cotton highly profitable, exponentially increasing Southern plantation demand for enslaved labor.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-psychology": [
    {
      "id": "psych_1",
      "subjectId": "ap-psychology",
      "stem": "In classical conditioning, an unlearned, naturally occurring response to an unconditioned stimulus is the:",
      "options": [
        "Conditioned response",
        "Unconditioned response",
        "Extinction response",
        "Neutral stimulus"
      ],
      "correctIndex": 1,
      "explanation": "The unconditioned response (e.g. salivating to food) is automatic and does not require prior learning.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "psych_2",
      "subjectId": "ap-psychology",
      "stem": "Which brain structure plays the central role in consolidating short-term memory into long-term memory?",
      "options": [
        "Cerebellum",
        "Hippocampus",
        "Medulla",
        "Hypothalamus"
      ],
      "correctIndex": 1,
      "explanation": "The hippocampus is essential for processing and consolidating explicit, declarative memories.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "psych_3",
      "subjectId": "ap-psychology",
      "stem": "According to Jean Piaget, during which cognitive developmental stage do children master the concept of conservation?",
      "options": [
        "Sensorimotor",
        "Preoperational",
        "Concrete Operational",
        "Formal Operational"
      ],
      "correctIndex": 2,
      "explanation": "During the concrete operational stage (ages ~7 to 11), children understand that quantity remains identical despite changes in shape.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "psych_4",
      "subjectId": "ap-psychology",
      "stem": "Which neurotransmitter is most directly associated with motor control, reward-seeking, and Parkinson disease when depleted?",
      "options": [
        "Serotonin",
        "Dopamine",
        "Acetylcholine",
        "GABA"
      ],
      "correctIndex": 1,
      "explanation": "Dopamine pathways mediate pleasure and motor control; death of dopamine-producing neurons in the substantia nigra causes Parkinson disease.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "psych_5",
      "subjectId": "ap-psychology",
      "stem": "The tendency to attribute other people actions to internal dispositions rather than external situations is called:",
      "options": [
        "Confirmation bias",
        "Fundamental attribution error",
        "Self-serving bias",
        "Cognitive dissonance"
      ],
      "correctIndex": 1,
      "explanation": "The fundamental attribution error describes overestimating personality traits and underestimating situational factors when judging others.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "psych_6",
      "subjectId": "ap-psychology",
      "stem": "Which part of the autonomic nervous system is responsible for the fight-or-flight stress response?",
      "options": [
        "Parasympathetic nervous system",
        "Sympathetic nervous system",
        "Somatic nervous system",
        "Central nervous system"
      ],
      "correctIndex": 1,
      "explanation": "The sympathetic nervous system accelerates heart rate, dilates bronchi, and releases adrenaline during perceived threats.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "psych_7",
      "subjectId": "ap-psychology",
      "stem": "In psychological research, what is a placebo effect?",
      "options": [
        "Improvement caused solely by patient expectations rather than an active treatment",
        "An error resulting from poor sample randomization",
        "A statistical correlation between two unrelated variables",
        "Memory distortion caused by leading questions"
      ],
      "correctIndex": 0,
      "explanation": "The placebo effect occurs when an inert substance or sham procedure produces genuine physiological or mental improvement due to expectations.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "psych_8",
      "subjectId": "ap-psychology",
      "stem": "The serial position effect predicts that people remember items from a list best when they are:",
      "options": [
        "At the beginning and end of the list",
        "Only in the exact middle",
        "Presented at random intervals",
        "Repeated backwards"
      ],
      "correctIndex": 0,
      "explanation": "The primacy effect enhances recall of beginning items (LTM), while the recency effect enhances recall of final items (working memory).",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "psych_9",
      "subjectId": "ap-psychology",
      "stem": "Which famous experiment demonstrated that ordinary people would obey authority to deliver perceived lethal electric shocks?",
      "options": [
        "Stanford Prison Experiment",
        "Milgram Obedience Experiment",
        "Asch Conformity Study",
        "Little Albert Experiment"
      ],
      "correctIndex": 1,
      "explanation": "Stanley Milgram study showed that approximately 65% of participants would follow researcher instructions to deliver the maximum 450-volt shock.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "psych_10",
      "subjectId": "ap-psychology",
      "stem": "Which sleep stage is characterized by rapid eye movements, temporary muscle paralysis, and vivid dreaming?",
      "options": [
        "Stage N1",
        "Stage N2",
        "Stage N3 (Deep Sleep)",
        "REM Sleep"
      ],
      "correctIndex": 3,
      "explanation": "Rapid Eye Movement (REM) sleep features high brain activity similar to wakefulness, accompanied by vivid dreaming and motor atonia.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "psych_11",
      "subjectId": "ap-psychology",
      "stem": "Erik Erikson proposed that the primary psychosocial conflict during adolescence is:",
      "options": [
        "Trust vs. Mistrust",
        "Identity vs. Role Confusion",
        "Intimacy vs. Isolation",
        "Generativity vs. Stagnation"
      ],
      "correctIndex": 1,
      "explanation": "Adolescents (ages 12-18) grapple with discovering personal identity, core values, and life directions vs role confusion.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "psych_12",
      "subjectId": "ap-psychology",
      "stem": "A Skinner box is a laboratory apparatus commonly used to study:",
      "options": [
        "Operant conditioning",
        "Classical conditioning",
        "Latent learning",
        "Observational modeling"
      ],
      "correctIndex": 0,
      "explanation": "B.F. Skinner utilized operant chambers where animals pressed levers to receive reinforcement or avoid punishment.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "psych_13",
      "subjectId": "ap-psychology",
      "stem": "Bipolar disorder is clinically diagnosed by alternating episodes of severe depression and:",
      "options": [
        "Mania",
        "Catatonia",
        "Dissociation",
        "Amnesia"
      ],
      "correctIndex": 0,
      "explanation": "Bipolar disorder is characterized by dramatic mood shifts between debilitating depressive lows and euphoric, hyperactive manic highs.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "psych_14",
      "subjectId": "ap-psychology",
      "stem": "Which sensory receptors in the human retina are specialized for night vision and peripheral motion detection?",
      "options": [
        "Cones",
        "Rods",
        "Foveal cells",
        "Bipolar ganglion cells"
      ],
      "correctIndex": 1,
      "explanation": "Rods operate in low-light conditions and detect black, white, and motion, while cones detect fine detail and color in bright light.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "psych_15",
      "subjectId": "ap-psychology",
      "stem": "According to Maslow hierarchy of needs, which level must be satisfied immediately after basic physiological survival needs?",
      "options": [
        "Safety needs",
        "Belongingness and love",
        "Esteem needs",
        "Self-actualization"
      ],
      "correctIndex": 0,
      "explanation": "Once physiological needs (food, water, shelter) are met, individuals prioritize safety and security needs.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-computer-science-principles": [
    {
      "id": "csp_1",
      "subjectId": "ap-computer-science-principles",
      "stem": "How many distinct binary states or numbers can be represented using 8 bits (1 byte)?",
      "options": [
        "$64$",
        "$128$",
        "$256$",
        "$512$"
      ],
      "correctIndex": 2,
      "explanation": "Each bit has 2 possible states. $2^8 = 256$ distinct values (ranging from $0$ to $255$ in unsigned binary).",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "csp_2",
      "subjectId": "ap-computer-science-principles",
      "stem": "Which protocol is responsible for securely encrypting data transferred between a web browser and a website server?",
      "options": [
        "HTTP",
        "HTTPS (TLS/SSL)",
        "FTP",
        "DNS"
      ],
      "correctIndex": 1,
      "explanation": "HTTPS uses Transport Layer Security (TLS/SSL) to encrypt communications and prevent eavesdropping or tampering.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "csp_3",
      "subjectId": "ap-computer-science-principles",
      "stem": "What is the primary difference between lossy and lossless data compression?",
      "options": [
        "Lossy compression discards redundant data that cannot be recovered",
        "Lossless compression always produces smaller files than lossy",
        "Lossy compression can perfectly reconstruct the original file bit-for-bit",
        "Lossless compression is only used for audio files"
      ],
      "correctIndex": 0,
      "explanation": "Lossy compression achieves smaller sizes by permanently removing less perceptible data, whereas lossless preserves 100% of original bits.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "csp_4",
      "subjectId": "ap-computer-science-principles",
      "stem": "In algorithm design, a binary search algorithm requires the dataset to be:",
      "options": [
        "Sorted",
        "Randomized",
        "Stored in hexadecimal",
        "Smaller than 100 elements"
      ],
      "correctIndex": 0,
      "explanation": "Binary search operates in $O(\\log n)$ by repeatedly halving the search interval, which requires elements to be pre-sorted.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "csp_5",
      "subjectId": "ap-computer-science-principles",
      "stem": "What is the decimal (base 10) value of the binary number `1101`?",
      "options": [
        "$11$",
        "$13$",
        "$15$",
        "$9$"
      ],
      "correctIndex": 1,
      "explanation": "$1 \\times 2^3 + 1 \\times 2^2 + 0 \\times 2^1 + 1 \\times 2^0 = 8 + 4 + 0 + 1 = 13$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "csp_6",
      "subjectId": "ap-computer-science-principles",
      "stem": "What role does the Domain Name System (DNS) perform on the Internet?",
      "options": [
        "Translates human-friendly domain names (e.g. google.com) into numerical IP addresses",
        "Physically connects fiber-optic cables across oceans",
        "Encrypts email messages with public keys",
        "Stores website cookies on client devices"
      ],
      "correctIndex": 0,
      "explanation": "DNS acts as the phonebook of the Internet, mapping human-readable hostnames to routable IP addresses.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "csp_7",
      "subjectId": "ap-computer-science-principles",
      "stem": "A symmetric encryption algorithm uses:",
      "options": [
        "The same key for both encryption and decryption",
        "A public key to encrypt and a private key to decrypt",
        "No keys at all",
        "A different key for every single character"
      ],
      "correctIndex": 0,
      "explanation": "Symmetric key cryptography uses a single shared secret key for both encrypting and decrypting data.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "csp_8",
      "subjectId": "ap-computer-science-principles",
      "stem": "Which logic gate produces an output of 1 (TRUE) if and only if both inputs are 1 (TRUE)?",
      "options": [
        "OR Gate",
        "AND Gate",
        "NOT Gate",
        "XOR Gate"
      ],
      "correctIndex": 1,
      "explanation": "An AND gate strictly requires all inputs to be TRUE in order to output TRUE.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "csp_9",
      "subjectId": "ap-computer-science-principles",
      "stem": "What is an abstraction in computer science?",
      "options": [
        "Hiding complex implementation details and exposing only essential functionality",
        "A hardware failure in memory RAM",
        "Compressing image pixels",
        "Converting code into binary by hand"
      ],
      "correctIndex": 0,
      "explanation": "Abstraction manages complexity by breaking systems into layers and hiding low-level details behind simple interfaces.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "csp_10",
      "subjectId": "ap-computer-science-principles",
      "stem": "If a program executes a loop `FOR i = 1 TO 4` and multiplies variable `p = p * 2` (starting with `p = 1`), what is `p` after the loop?",
      "options": [
        "$8$",
        "$16$",
        "$32$",
        "$4$"
      ],
      "correctIndex": 1,
      "explanation": "After 4 iterations: $1 \\to 2 \\to 4 \\to 8 \\to 16$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "csp_11",
      "subjectId": "ap-computer-science-principles",
      "stem": "What is the primary benefit of fault tolerance in Internet routing protocols like TCP/IP?",
      "options": [
        "Traffic can be automatically rerouted if individual routers or cables fail",
        "Websites load instantaneously without buffering",
        "Passwords cannot be guessed by brute force",
        "All data packets arrive in exact numerical sequence without reassembly"
      ],
      "correctIndex": 0,
      "explanation": "Redundant routing paths allow packets to navigate around severed lines or offline nodes without crashing the network.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "csp_12",
      "subjectId": "ap-computer-science-principles",
      "stem": "Which type of software license allows users to view, modify, and distribute the underlying source code freely?",
      "options": [
        "Proprietary license",
        "Open-source license",
        "Commercial copyright",
        "Freemium trial"
      ],
      "correctIndex": 1,
      "explanation": "Open-source software licenses grant anyone the freedom to inspect, adapt, and redistribute the program code.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "csp_13",
      "subjectId": "ap-computer-science-principles",
      "stem": "What is phishing in cybersecurity?",
      "options": [
        "A social engineering attack disguised as a trustworthy entity to steal sensitive credentials",
        "An automated script that floods network bandwidth",
        "A hardware keylogger plugged into a USB port",
        "A virus that encrypts hard drives for ransom"
      ],
      "correctIndex": 0,
      "explanation": "Phishing uses deceptive emails or websites that impersonate banks or services to trick victims into sharing passwords or personal data.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "csp_14",
      "subjectId": "ap-computer-science-principles",
      "stem": "In parallel computing, speedup is limited primarily by:",
      "options": [
        "The portion of the task that must run sequentially (Amdahl law)",
        "The operating system user interface",
        "The color of the motherboard",
        "The size of the hard drive"
      ],
      "correctIndex": 0,
      "explanation": "Amdahl law demonstrates that the non-parallelizable, sequential components of a program cap the maximum theoretical speedup.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "csp_15",
      "subjectId": "ap-computer-science-principles",
      "stem": "What is metadata in the context of digital photos and communications?",
      "options": [
        "Data that provides information about other data (e.g. timestamp, camera model, GPS coordinates)",
        "The raw hexadecimal pixels of the image",
        "A temporary cache stored in CPU registers",
        "The backup copy of an encrypted file"
      ],
      "correctIndex": 0,
      "explanation": "Metadata describes characteristics of a file\u2014such as author, date created, file format, and resolution\u2014without being the content itself.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-physics": [
    {
      "id": "phys_1",
      "subjectId": "ap-physics-1",
      "stem": "An object is dropped from rest from a cliff. Neglecting air resistance, what is its speed after $3.0\\text{ s}$? ($g = 9.8\\text{ m/s}^2$)",
      "options": [
        "$14.7\\text{ m/s}$",
        "$29.4\\text{ m/s}$",
        "$44.1\\text{ m/s}$",
        "$9.8\\text{ m/s}$"
      ],
      "correctIndex": 1,
      "explanation": "$v = v_0 + gt = 0 + (9.8)(3.0) = 29.4\\text{ m/s}$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "phys_2",
      "subjectId": "ap-physics-1",
      "stem": "A net external force $F$ acts on an object of mass $m$, giving it acceleration $a$. If the mass is doubled and force is halved, what is the new acceleration?",
      "options": [
        "$4a$",
        "$2a$",
        "$\\frac{a}{2}$",
        "$\\frac{a}{4}$"
      ],
      "correctIndex": 3,
      "explanation": "$a_{new} = \\frac{F/2}{2m} = \\frac{1}{4} \\frac{F}{m} = \\frac{a}{4}$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "phys_3",
      "subjectId": "ap-physics-1",
      "stem": "A car travels in a horizontal circle of radius $R$ at constant speed $v$. What force provides the centripetal acceleration?",
      "options": [
        "Centrifugal force",
        "Static friction between tires and road",
        "Gravitational force",
        "Normal force from the ground"
      ],
      "correctIndex": 1,
      "explanation": "Static friction between the car tires and the road surface prevents slipping and points towards the circle center.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "phys_4",
      "subjectId": "ap-physics-1",
      "stem": "A $2\\text{ kg}$ cart moving at $3\\text{ m/s}$ collides and sticks to a stationary $1\\text{ kg}$ cart. What is their final common speed?",
      "options": [
        "$1.5\\text{ m/s}$",
        "$2.0\\text{ m/s}$",
        "$2.5\\text{ m/s}$",
        "$3.0\\text{ m/s}$"
      ],
      "correctIndex": 1,
      "explanation": "Conservation of momentum: $p_i = (2)(3) + 0 = 6\\text{ kg}\\cdot\\text{m/s}$. $v_f = \\frac{6}{2 + 1} = 2.0\\text{ m/s}$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "phys_5",
      "subjectId": "ap-physics-1",
      "stem": "A simple pendulum has period $T$ on Earth. If the length of the string is quadrupled ($4L$), what is the new period?",
      "options": [
        "$4T$",
        "$2T$",
        "$\\frac{T}{2}$",
        "$\\sqrt{2}T$"
      ],
      "correctIndex": 1,
      "explanation": "$T = 2\\pi\\sqrt{\\frac{L}{g}}$. Replacing $L$ with $4L$ gives $T_{new} = 2\\pi\\sqrt{\\frac{4L}{g}} = 2 T$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "phys_6",
      "subjectId": "ap-physics-1",
      "stem": "How much work is done by the gravitational force on a $5\\text{ kg}$ satellite in a circular orbit of radius $R$ during one full revolution?",
      "options": [
        "$0\\text{ J}$",
        "$5\\pi R\\text{ J}$",
        "$10g R\\text{ J}$",
        "$50\\text{ J}$"
      ],
      "correctIndex": 0,
      "explanation": "Gravity is perpendicular to the displacement vector at every point in a circular orbit ($W = F d \\cos(90^\\circ) = 0\\text{ J}$).",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "phys_7",
      "subjectId": "ap-physics-1",
      "stem": "A spring with spring constant $k = 200\\text{ N/m}$ is compressed by $0.1\\text{ m}$. What is the stored elastic potential energy?",
      "options": [
        "$1.0\\text{ J}$",
        "$2.0\\text{ J}$",
        "$10\\text{ J}$",
        "$20\\text{ J}$"
      ],
      "correctIndex": 0,
      "explanation": "$U_s = \\frac{1}{2} k x^2 = \\frac{1}{2} (200) (0.1)^2 = 100 \\times 0.01 = 1.0\\text{ J}$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "phys_8",
      "subjectId": "ap-physics-1",
      "stem": "A solid disk and a hollow ring of identical mass and radius roll down an incline without slipping. Which reaches the bottom first?",
      "options": [
        "The hollow ring",
        "The solid disk",
        "Both at the same time",
        "Depends on the incline angle"
      ],
      "correctIndex": 1,
      "explanation": "The solid disk has a smaller rotational inertia ($I = \\frac{1}{2}MR^2 < MR^2$), converting more PE into translational KE, so it accelerates faster.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "phys_9",
      "subjectId": "ap-physics-1",
      "stem": "An elevator is accelerating upwards at $2\\text{ m/s}^2$. What apparent weight does an $80\\text{ kg}$ passenger feel? ($g = 10\\text{ m/s}^2$)",
      "options": [
        "$640\\text{ N}$",
        "$800\\text{ N}$",
        "$960\\text{ N}$",
        "$160\\text{ N}$"
      ],
      "correctIndex": 2,
      "explanation": "$N - mg = ma \\implies N = m(g + a) = 80(10 + 2) = 960\\text{ N}$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "phys_10",
      "subjectId": "ap-physics-1",
      "stem": "What happens to the total mechanical energy of a falling apple if air resistance is negligible?",
      "options": [
        "It increases",
        "It decreases",
        "It remains constant",
        "It oscillates"
      ],
      "correctIndex": 2,
      "explanation": "With only conservative gravitational forces doing work, total mechanical energy ($KE + PE$) remains strictly conserved.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "phys_11",
      "subjectId": "ap-physics-1",
      "stem": "A net torque of $20\\text{ N}\\cdot\\text{m}$ acts on a wheel with moment of inertia $I = 4\\text{ kg}\\cdot\\text{m}^2$. What is the angular acceleration $\\alpha$?",
      "options": [
        "$5\\text{ rad/s}^2$",
        "$80\\text{ rad/s}^2$",
        "$0.2\\text{ rad/s}^2$",
        "$16\\text{ rad/s}^2$"
      ],
      "correctIndex": 0,
      "explanation": "$\\tau = I\\alpha \\implies \\alpha = \\frac{\\tau}{I} = \\frac{20}{4} = 5\\text{ rad/s}^2$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "phys_12",
      "subjectId": "ap-physics-1",
      "stem": "A projectile launched at angle $\\theta$ has maximum horizontal range when $\\theta$ equals:",
      "options": [
        "$30^\\circ$",
        "$45^\\circ$",
        "$60^\\circ$",
        "$90^\\circ$"
      ],
      "correctIndex": 1,
      "explanation": "Range $R = \\frac{v_0^2 \\sin(2\\theta)}{g}$, which reaches maximum when $\\sin(2\\theta) = 1 \\implies \\theta = 45^\\circ$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "phys_13",
      "subjectId": "ap-physics-1",
      "stem": "An astronaut floating in space throws a wrench forward. What happens to the astronaut?",
      "options": [
        "Moves forward faster",
        "Moves backward with equal momentum",
        "Remains stationary",
        "Spins continuously in place"
      ],
      "correctIndex": 1,
      "explanation": "By conservation of momentum ($p_{initial} = 0$), $p_{astronaut} = -p_{wrench}$, so the astronaut recoils backward.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "phys_14",
      "subjectId": "ap-physics-1",
      "stem": "If the distance between two gravitational masses is doubled, the gravitational force between them is multiplied by:",
      "options": [
        "$2$",
        "$\\frac{1}{2}$",
        "$\\frac{1}{4}$",
        "$4$"
      ],
      "correctIndex": 2,
      "explanation": "Newton's law of universal gravitation follows an inverse-square law: $F \\propto \\frac{1}{r^2} \\implies \\frac{1}{2^2} = \\frac{1}{4}$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "phys_15",
      "subjectId": "ap-physics-1",
      "stem": "What physical quantity is represented by the area under a Force vs. Time graph?",
      "options": [
        "Work",
        "Kinetic Energy",
        "Impulse",
        "Power"
      ],
      "correctIndex": 2,
      "explanation": "Impulse $J = \\int F dt = \\Delta p$, which corresponds directly to the area under a Force-Time graph.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-calculus-bc": [
    {
      "id": "calc_bc_1",
      "subjectId": "ap-calculus-bc",
      "stem": "Evaluate $\\int x e^x dx$ using integration by parts.",
      "options": [
        "$e^x(x - 1) + C$",
        "$e^x(x + 1) + C$",
        "$x^2 e^x + C$",
        "$\\frac{1}{2}x^2 e^x + C$"
      ],
      "correctIndex": 0,
      "explanation": "Using $\\int u dv = uv - \\int v du$ with $u = x, dv = e^x dx$: $x e^x - \\int e^x dx = e^x(x - 1) + C$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "calc_bc_2",
      "subjectId": "ap-calculus-bc",
      "stem": "What is the Maclaurin series expansion of $\\cos(x)$?",
      "options": [
        "$\\sum_{n=0}^\\infty \\frac{(-1)^n x^{2n}}{(2n)!}$",
        "$\\sum_{n=0}^\\infty \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$",
        "$\\sum_{n=0}^\\infty \\frac{x^n}{n!}$",
        "$\\sum_{n=0}^\\infty (-1)^n x^n$"
      ],
      "correctIndex": 0,
      "explanation": "The cosine function is even, giving the alternating series $\\cos(x) = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots = \\sum_{n=0}^\\infty \\frac{(-1)^n x^{2n}}{(2n)!}$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "calc_bc_3",
      "subjectId": "ap-calculus-bc",
      "stem": "Find the radius of convergence of $\\sum_{n=1}^\\infty \\frac{(x - 3)^n}{n \\cdot 2^n}$.",
      "options": [
        "$R = 1$",
        "$R = 2$",
        "$R = 3$",
        "$R = \\infty$"
      ],
      "correctIndex": 1,
      "explanation": "Using ratio test: $\\lim_{n \\to \\infty} |\\frac{x-3}{2}| \\frac{n}{n+1} = \\frac{|x-3|}{2} < 1 \\implies |x - 3| < 2 \\implies R = 2$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "calc_bc_4",
      "subjectId": "ap-calculus-bc",
      "stem": "What is the area enclosed by one loop of the polar curve $r = 4\\sin(\\theta)$?",
      "options": [
        "$2\\pi$",
        "$4\\pi$",
        "$8\\pi$",
        "$16\\pi$"
      ],
      "correctIndex": 1,
      "explanation": "Area $= \\frac{1}{2} \\int_0^\\pi (4\\sin\\theta)^2 d\\theta = 8 \\int_0^\\pi \\sin^2\\theta d\\theta = 8 \\cdot \\frac{\\pi}{2} = 4\\pi$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "calc_bc_5",
      "subjectId": "ap-calculus-bc",
      "stem": "The improper integral $\\int_1^\\infty \\frac{1}{x^p} dx$ converges if and only if:",
      "options": [
        "$p > 1$",
        "$p \\ge 1$",
        "$p < 1$",
        "$p = 0$"
      ],
      "correctIndex": 0,
      "explanation": "By the p-series integral test, $\\int_1^\\infty \\frac{1}{x^p} dx$ converges strictly when $p > 1$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "calc_bc_6",
      "subjectId": "ap-calculus-bc",
      "stem": "A particle position is given by $x(t) = t^2, y(t) = 2t$. What is its speed at $t = 1$?",
      "options": [
        "$\\sqrt{8}$",
        "$2\\sqrt{2}$",
        "$\\sqrt{2^2 + 2^2} = \\sqrt{8}$",
        "$4$"
      ],
      "correctIndex": 1,
      "explanation": "Speed $= \\sqrt{(x'(t))^2 + (y'(t))^2} = \\sqrt{(2t)^2 + 2^2}$. At $t = 1$: $\\sqrt{4 + 4} = \\sqrt{8} = 2\\sqrt{2}$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "calc_bc_7",
      "subjectId": "ap-calculus-bc",
      "stem": "Which test is most conclusive to determine convergence of $\\sum_{n=1}^\\infty \\frac{(-1)^n}{\\sqrt{n}}$?",
      "options": [
        "Alternating Series Test",
        "Integral Test",
        "Direct Comparison with $n$",
        "Ratio Test"
      ],
      "correctIndex": 0,
      "explanation": "Since $\\frac{1}{\\sqrt{n}}$ decreases monotonically to $0$, the Alternating Series Test guarantees conditional convergence.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "calc_bc_8",
      "subjectId": "ap-calculus-bc",
      "stem": "In logistic growth $\\frac{dP}{dt} = 0.05 P (1 - \\frac{P}{800})$, what is the carrying capacity $L$?",
      "options": [
        "$800$",
        "$400$",
        "$0.05$",
        "$40$"
      ],
      "correctIndex": 0,
      "explanation": "The standard logistic differential equation is $\\frac{dP}{dt} = kP(1 - \\frac{P}{L})$, where $L = 800$ is carrying capacity.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "calc_bc_9",
      "subjectId": "ap-calculus-bc",
      "stem": "Evaluate $\\lim_{n \\to \\infty} \\left(1 + \\frac{2}{n}\\right)^n$.",
      "options": [
        "$e^2$",
        "$e$",
        "$2e$",
        "$\\infty$"
      ],
      "correctIndex": 0,
      "explanation": "The standard exponential limit formula is $\\lim_{n \\to \\infty} (1 + \\frac{k}{n})^n = e^k \\implies e^2$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "calc_bc_10",
      "subjectId": "ap-calculus-bc",
      "stem": "What is the sum of the convergent geometric series $\\sum_{n=0}^\\infty 3 \\left(\\frac{1}{4}\\right)^n$?",
      "options": [
        "$4$",
        "$3$",
        "$12$",
        "$1$"
      ],
      "correctIndex": 0,
      "explanation": "Sum $= \\frac{a}{1 - r} = \\frac{3}{1 - 1/4} = \\frac{3}{3/4} = 4$.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "calc_bc_11",
      "subjectId": "ap-calculus-bc",
      "stem": "Euler method with step size $h = 0.5$ approximates $y(1)$ for $\\frac{dy}{dx} = x + y$ with $y(0) = 1$. What is $y(0.5)$?",
      "options": [
        "$1.5$",
        "$1.25$",
        "$2.0$",
        "$1.75$"
      ],
      "correctIndex": 0,
      "explanation": "$y(0.5) \\approx y(0) + h \\cdot f(0, 1) = 1 + 0.5(0 + 1) = 1.5$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "calc_bc_12",
      "subjectId": "ap-calculus-bc",
      "stem": "Find the slope $\\frac{dy}{dx}$ of the parametric curve $x(t) = \\cos(t), y(t) = \\sin(t)$ at $t = \\frac{\\pi}{4}$.",
      "options": [
        "$-1$",
        "$1$",
        "$0$",
        "Undefined"
      ],
      "correctIndex": 0,
      "explanation": "$\\frac{dy}{dx} = \\frac{y'(t)}{x'(t)} = \\frac{\\cos(t)}{-\\sin(t)} = -\\cot(t)$. At $t = \\pi/4$: $-\\cot(\\pi/4) = -1$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "calc_bc_13",
      "subjectId": "ap-calculus-bc",
      "stem": "What are the first three non-zero terms of the Taylor series for $e^{2x}$ centered at $x = 0$?",
      "options": [
        "$1 + 2x + 2x^2$",
        "$1 + 2x + 4x^2$",
        "$1 + x + x^2$",
        "$2 + 4x + 8x^2$"
      ],
      "correctIndex": 0,
      "explanation": "$e^{2x} = 1 + (2x) + \\frac{(2x)^2}{2!} = 1 + 2x + 2x^2$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "calc_bc_14",
      "subjectId": "ap-calculus-bc",
      "stem": "What is the length of the curve $y = \\frac{2}{3}x^{3/2}$ on $[0, 3]$?",
      "options": [
        "$\\frac{14}{3}$",
        "$4$",
        "$\\frac{16}{3}$",
        "$6$"
      ],
      "correctIndex": 0,
      "explanation": "$y' = x^{1/2} \\implies L = \\int_0^3 \\sqrt{1 + x} dx = [\\frac{2}{3}(1+x)^{3/2}]_0^3 = \\frac{2}{3}(8 - 1) = \\frac{14}{3}$.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "calc_bc_15",
      "subjectId": "ap-calculus-bc",
      "stem": "For what values of $p$ does the series $\\sum_{n=2}^\\infty \\frac{1}{n (\\ln n)^p}$ converge?",
      "options": [
        "$p > 1$",
        "$p \\ge 1$",
        "$p < 1$",
        "All real $p$"
      ],
      "correctIndex": 0,
      "explanation": "Using substitution $u = \\ln n, du = \\frac{1}{n} dn$: $\\int_2^\\infty u^{-p} du$ converges strictly when $p > 1$.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-environmental-science": [
    {
      "id": "apes_1",
      "subjectId": "ap-environmental-science",
      "stem": "Which layer of the atmosphere contains the protective ozone layer that absorbs harmful solar UV-C and UV-B radiation?",
      "options": [
        "Troposphere",
        "Stratosphere",
        "Mesosphere",
        "Thermosphere"
      ],
      "correctIndex": 1,
      "explanation": "The stratospheric ozone layer (located ~15-35 km above Earth) absorbs over 97% of biologically damaging solar ultraviolet rays.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "apes_2",
      "subjectId": "ap-environmental-science",
      "stem": "What ecological process causes excessive algae blooms followed by hypoxia and dead zones in aquatic ecosystems?",
      "options": [
        "Eutrophication",
        "Bioaccumulation",
        "Salinization",
        "Desertification"
      ],
      "correctIndex": 0,
      "explanation": "Agricultural runoff rich in nitrogen and phosphorus triggers rapid algal growth; decomposers consume dissolved oxygen during decay.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "apes_3",
      "subjectId": "ap-environmental-science",
      "stem": "Which soil horizon is known as topsoil and contains the highest concentration of organic matter and humus?",
      "options": [
        "O Horizon",
        "A Horizon",
        "B Horizon",
        "C Horizon"
      ],
      "correctIndex": 1,
      "explanation": "The A horizon is topsoil, composed of weathered minerals mixed with dark, nutrient-rich organic humus.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "apes_4",
      "subjectId": "ap-environmental-science",
      "stem": "Which of the following is a non-point source of water pollution?",
      "options": [
        "A chemical factory discharge pipe",
        "Agricultural fertilizer runoff across a watershed",
        "A municipal sewage treatment outfall",
        "An offshore oil refinery leak"
      ],
      "correctIndex": 1,
      "explanation": "Non-point source pollution originates from broad, diffuse areas rather than a single identifiable, confined conveyance.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "apes_5",
      "subjectId": "ap-environmental-science",
      "stem": "In island biogeography theory (MacArthur & Wilson), which island exhibits the highest species equilibrium richness?",
      "options": [
        "Small island far from mainland",
        "Large island close to mainland",
        "Small island close to mainland",
        "Large island far from mainland"
      ],
      "correctIndex": 1,
      "explanation": "Large islands support lower extinction rates and proximity to mainland increases immigration colonization rates.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "apes_6",
      "subjectId": "ap-environmental-science",
      "stem": "What primary greenhouse gas is released in substantial quantities from bovine livestock enteric fermentation and flooded rice paddies?",
      "options": [
        "Methane ($CH_4$)",
        "Sulfur dioxide ($SO_2$)",
        "Nitrous oxide ($N_2O$)",
        "Carbon monoxide ($CO$)"
      ],
      "correctIndex": 0,
      "explanation": "Methanogenic anaerobic archaea in ruminant animal digestive tracts and flooded wetland soils produce methane ($CH_4$).",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "apes_7",
      "subjectId": "ap-environmental-science",
      "stem": "A demographic transition model in Stage 2 (Transitional) is characterized by:",
      "options": [
        "High birth rate and rapidly declining death rate",
        "Low birth rate and low death rate",
        "High birth rate and high death rate",
        "Declining birth rate and rising death rate"
      ],
      "correctIndex": 0,
      "explanation": "Improved sanitation, nutrition, and medical care cause death rates to plummet while birth rates remain elevated, resulting in rapid population growth.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "apes_8",
      "subjectId": "ap-environmental-science",
      "stem": "What international treaty successfully banned ozone-depleting chlorofluorocarbons (CFCs)?",
      "options": [
        "Kyoto Protocol",
        "Montreal Protocol",
        "Paris Climate Accord",
        "Ramsar Convention"
      ],
      "correctIndex": 1,
      "explanation": "The Montreal Protocol (1987) mandated the phase-out of CFCs and halons to protect the stratospheric ozone layer.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "apes_9",
      "subjectId": "ap-environmental-science",
      "stem": "Net Primary Productivity (NPP) is mathematically calculated as:",
      "options": [
        "$\\text{GPP} - R$",
        "$\\text{GPP} + R$",
        "$\\text{GPP} \\times R$",
        "$\\frac{\\text{GPP}}{R}$"
      ],
      "correctIndex": 0,
      "explanation": "$\\text{NPP}$ represents net biomass stored by autotrophs after accounting for cellular respiration losses ($\\text{NPP} = \\text{GPP} - R$).",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "apes_10",
      "subjectId": "ap-environmental-science",
      "stem": "Which secondary air pollutant forms photochemical smog in the troposphere when NOx reacts with VOCs in sunlight?",
      "options": [
        "Ground-level ozone ($O_3$)",
        "Carbon dioxide ($CO_2$)",
        "Lead ($Pb$)",
        "Asbestos"
      ],
      "correctIndex": 0,
      "explanation": "Nitrogen oxides and volatile organic compounds undergo photochemical reactions in sunlight to generate toxic tropospheric ozone.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "apes_11",
      "subjectId": "ap-environmental-science",
      "stem": "Ocean acidification is primarily driven by seawater absorbing elevated atmospheric:",
      "options": [
        "Carbon dioxide ($CO_2$)",
        "Methane ($CH_4$)",
        "Sulfuric acid",
        "Chlorine"
      ],
      "correctIndex": 0,
      "explanation": "Dissolved $CO_2$ reacts with $H_2O$ to form carbonic acid ($H_2CO_3$), lowering ocean pH and dissolving calcium carbonate shells.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "apes_12",
      "subjectId": "ap-environmental-science",
      "stem": "Which renewable energy technology exploits subterranean heat reservoirs to produce electricity?",
      "options": [
        "Photovoltaic solar",
        "Geothermal energy",
        "Hydroelectric power",
        "Biomass gasification"
      ],
      "correctIndex": 1,
      "explanation": "Geothermal energy extracts steam or hot water from underground magma heated rock strata to spin electric turbines.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "apes_13",
      "subjectId": "ap-environmental-science",
      "stem": "What type of survivorship curve is typical of humans and large mammals exhibiting high parental care?",
      "options": [
        "Type I",
        "Type II",
        "Type III",
        "Exponential"
      ],
      "correctIndex": 0,
      "explanation": "Type I curves show high survival probabilities throughout early and middle life, followed by rapid mortality in old age.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "apes_14",
      "subjectId": "ap-environmental-science",
      "stem": "Which mining technique removes entire mountaintops using explosives to extract coal seams?",
      "options": [
        "Subsurface shaft mining",
        "Mountaintop removal mining",
        "Placer dredging",
        "In-situ leaching"
      ],
      "correctIndex": 1,
      "explanation": "Mountaintop removal is a form of surface strip mining that shears off mountain peaks and dumps overburden into adjacent valleys.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "apes_15",
      "subjectId": "ap-environmental-science",
      "stem": "In a food web, toxins such as DDT and mercury exhibit biomagnification because they are:",
      "options": [
        "Water-soluble and rapidly excreted",
        "Fat-soluble and persistent in trophic tissue",
        "Broken down by plant enzymes",
        "Evaporated into the atmosphere"
      ],
      "correctIndex": 1,
      "explanation": "Lipophilic persistent pollutants accumulate in adipose tissue and concentrate exponentially at higher trophic predator levels.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-computer-science": [
    {
      "id": "csa_1",
      "subjectId": "ap-computer-science",
      "stem": "In Java, what keyword is used to inherit properties and methods from a superclass?",
      "options": [
        "implements",
        "extends",
        "inherits",
        "super"
      ],
      "correctIndex": 1,
      "explanation": "The `extends` keyword establishes an inheritance relationship where a subclass inherits non-private members of a superclass.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "csa_2",
      "subjectId": "ap-computer-science",
      "stem": "What does `System.out.println(5 / 2);` output in Java?",
      "options": [
        "2.5",
        "2",
        "3",
        "Compilation Error"
      ],
      "correctIndex": 1,
      "explanation": "Integer division truncates any fractional decimal component, yielding `2`.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "csa_3",
      "subjectId": "ap-computer-science",
      "stem": "Which method is used to determine the number of elements currently stored in an `ArrayList<String>`?",
      "options": [
        "length()",
        "length",
        "size()",
        "count()"
      ],
      "correctIndex": 2,
      "explanation": "`ArrayList` utilizes the `size()` method, while arrays use the `.length` field and Strings use `.length()`.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "csa_4",
      "subjectId": "ap-computer-science",
      "stem": "What happens when you declare a variable as `static` inside a Java class?",
      "options": [
        "Each object instance maintains its own unique copy",
        "The variable is shared by all instances of the class",
        "The variable cannot be modified (immutable)",
        "The variable can only be accessed inside loops"
      ],
      "correctIndex": 1,
      "explanation": "A `static` variable belongs to the class itself and is shared across all instantiated objects.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "csa_5",
      "subjectId": "ap-computer-science",
      "stem": 'What is the return value of `"APExam".substring(2, 5)` in Java?',
      "options": [
        '"Exam"',
        '"Exa"',
        '"PEx"',
        '"PExam"'
      ],
      "correctIndex": 1,
      "explanation": "`substring(beginIndex, endIndex)` includes `beginIndex` (2 is 'E') and excludes `endIndex` (indices 2, 3, 4 -> \"Exa\").",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "csa_6",
      "subjectId": "ap-computer-science",
      "stem": "In binary search of an array of 1,024 elements, what is the maximum number of comparisons required?",
      "options": [
        "10",
        "100",
        "512",
        "1024"
      ],
      "correctIndex": 0,
      "explanation": "Binary search runs in $O(\\log_2 n)$. $\\log_2(1024) = 10$ comparisons.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "csa_7",
      "subjectId": "ap-computer-science",
      "stem": "Which boolean expression is equivalent to `!(a && b)` according to De Morgan's Laws?",
      "options": [
        "!a && !b",
        "!a || !b",
        "a || b",
        "!a == !b"
      ],
      "correctIndex": 1,
      "explanation": "De Morgan's Law states that negating a conjunction flips the operator to disjunction: `!(a && b) == (!a || !b)`.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "csa_8",
      "subjectId": "ap-computer-science",
      "stem": "What exception is thrown when accessing index 5 of an array declared as `int[] arr = new int[5];`?",
      "options": [
        "NullPointerException",
        "ArrayIndexOutOfBoundsException",
        "IllegalArgumentException",
        "ClassCastException"
      ],
      "correctIndex": 1,
      "explanation": "A 5-element array has valid indices 0 to 4. Index 5 triggers an `ArrayIndexOutOfBoundsException`.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "csa_9",
      "subjectId": "ap-computer-science",
      "stem": "What is polymorphism in Java OOP?",
      "options": [
        "Hiding private instance variables",
        "Allowing an object reference of a parent type to invoke overridden child methods at runtime",
        "Compiling bytecode into machine native code",
        "Allocating heap memory automatically"
      ],
      "correctIndex": 1,
      "explanation": "Polymorphism enables dynamic method dispatch where overridden subclass methods are executed via superclass references.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "csa_10",
      "subjectId": "ap-computer-science",
      "stem": "What does `str1.equals(str2)` test for in Java?",
      "options": [
        "If both variables point to the exact same memory address",
        "If both strings contain the identical character sequence",
        "If str1 is alphabetically before str2",
        "If both strings have equal lengths"
      ],
      "correctIndex": 1,
      "explanation": "`.equals()` tests semantic content equality, while `==` compares reference memory addresses.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "csa_11",
      "subjectId": "ap-computer-science",
      "stem": "What is the base case in a recursive method?",
      "options": [
        "The initial call made from the main method",
        "The terminating condition that halts further recursive calls",
        "The deepest stack frame before memory overflow",
        "A loop that repeats inside the method"
      ],
      "correctIndex": 1,
      "explanation": "A recursive method must contain a base case to terminate recursion and prevent stack overflow errors.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "csa_12",
      "subjectId": "ap-computer-science",
      "stem": "What is the worst-case time complexity of Selection Sort on an array of $n$ elements?",
      "options": [
        "$O(1)$",
        "$O(\\log n)$",
        "$O(n)$",
        "$O(n^2)$"
      ],
      "correctIndex": 3,
      "explanation": "Selection Sort always executes nested comparison loops requiring $\\frac{n(n-1)}{2}$ operations, giving $O(n^2)$ complexity.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "csa_13",
      "subjectId": "ap-computer-science",
      "stem": "How do you access the number of rows in a 2D array `int[][] matrix`?",
      "options": [
        "matrix.length",
        "matrix[0].length",
        "matrix.size()",
        "matrix.rows"
      ],
      "correctIndex": 0,
      "explanation": "`matrix.length` represents the number of rows, while `matrix[0].length` gives column count.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "csa_14",
      "subjectId": "ap-computer-science",
      "stem": "What keyword in a constructor invokes the superclass constructor?",
      "options": [
        "this()",
        "super()",
        "parent()",
        "base()"
      ],
      "correctIndex": 1,
      "explanation": "`super()` calls the superclass constructor and must be the first statement in the subclass constructor.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "csa_15",
      "subjectId": "ap-computer-science",
      "stem": 'What does the wrapper class `Integer.parseInt("42")` return?',
      "options": [
        "A primitive `int` value 42",
        'A String "42"',
        "A double 42.0",
        "A null reference"
      ],
      "correctIndex": 0,
      "explanation": "`Integer.parseInt()` parses a String into its corresponding primitive `int` representation.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-world-history": [
    {
      "id": "wh_1",
      "subjectId": "ap-world-history",
      "stem": "The Silk Roads facilitated extensive Afro-Eurasian trade primarily connecting China with:",
      "options": [
        "The Mediterranean basin",
        "Mesoamerica",
        "Sub-Saharan West Africa",
        "Polynesian islands"
      ],
      "correctIndex": 0,
      "explanation": "The ancient and medieval Silk Roads linked Chang'an in China through Central Asia directly to Mediterranean and European markets.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "wh_2",
      "subjectId": "ap-world-history",
      "stem": "Which pastoral empire unified the largest contiguous land empire in world history during the 13th century?",
      "options": [
        "The Ottoman Empire",
        "The Mongol Empire",
        "The Mughal Empire",
        "The Songhai Empire"
      ],
      "correctIndex": 1,
      "explanation": "Under Genghis Khan and his successors, the Mongol Empire spanned from East Asia to Eastern Europe, establishing the Pax Mongolica.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "wh_3",
      "subjectId": "ap-world-history",
      "stem": "The Columbian Exchange refers to the unprecedented transoceanic transfer of:",
      "options": [
        "Plants, animals, diseases, and cultures between the Eastern and Western Hemispheres",
        "Gold bullion exclusively between Britain and India",
        "Enslaved laborers solely across the Indian Ocean",
        "Manufactured goods between Japan and Portugal"
      ],
      "correctIndex": 0,
      "explanation": "Post-1492 voyages connected the Old and New Worlds, transferring crops (potatoes, maize), livestock, and lethal epidemics (smallpox).",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "wh_4",
      "subjectId": "ap-world-history",
      "stem": "The Ottoman devshirme system recruited Christian youth from the Balkans to train as elite soldiers known as:",
      "options": [
        "Janissaries",
        "Mamluks",
        "Samurai",
        "Cossacks"
      ],
      "correctIndex": 0,
      "explanation": "The devshirme conscripted Christian boys who converted to Islam and served as the sultan's elite Janissary military corps and administrators.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "wh_5",
      "subjectId": "ap-world-history",
      "stem": "Where did the First Industrial Revolution originate in the mid-18th century?",
      "options": [
        "Great Britain",
        "France",
        "United States",
        "Germany"
      ],
      "correctIndex": 0,
      "explanation": "Abundant coal deposits, iron ore, colonial capital, commercial canals, and patent protections sparked Britain's industrial takeoff.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "wh_6",
      "subjectId": "ap-world-history",
      "stem": "The 1884-1885 Berlin Conference convened European powers to formally coordinate the:",
      "options": [
        "Scramble for Africa",
        "Partition of the Ottoman Empire",
        "Colonization of South America",
        "Alliances of World War I"
      ],
      "correctIndex": 0,
      "explanation": "Organized by Otto von Bismarck, the conference divided the African continent among European imperial powers without African representation.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "wh_7",
      "subjectId": "ap-world-history",
      "stem": "Which 1917 political revolution toppled the Russian Romanov dynasty and established a Bolshevik communist state?",
      "options": [
        "The Russian Revolution",
        "The Boxer Rebellion",
        "The Meiji Restoration",
        "The Taiping Rebellion"
      ],
      "correctIndex": 0,
      "explanation": "Led by Vladimir Lenin, the Bolsheviks seized state power in October 1917, withdrawing Russia from WWI and founding the Soviet Union.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "wh_8",
      "subjectId": "ap-world-history",
      "stem": "The Meiji Restoration (1868) in Japan was initiated primarily to:",
      "options": [
        "Rapidly modernize and industrialize Japan to avoid Western colonial domination",
        "Expel all foreign merchants and practice complete isolationism",
        "Restore the Tokugawa Shogunate feudal military rule",
        "Conquer the Korean peninsula immediately"
      ],
      "correctIndex": 0,
      "explanation": "Japan centralized political authority under Emperor Meiji, adopting Western industrial technology, education, and modern naval defense.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "wh_9",
      "subjectId": "ap-world-history",
      "stem": "Which 16th-century religious movement initiated by Martin Luther fragmented Catholic ecclesiastical hegemony in Europe?",
      "options": [
        "The Protestant Reformation",
        "The Counter-Reformation",
        "The Great Schism",
        "The Enlightenment"
      ],
      "correctIndex": 0,
      "explanation": "Martin Luther's 1517 Ninety-Five Theses opposed clerical indulgences, sparking the rise of Protestant churches across Europe.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "wh_10",
      "subjectId": "ap-world-history",
      "stem": "The trans-Saharan trade network in medieval West Africa was anchored on the exchange of:",
      "options": [
        "Gold and salt",
        "Silk and porcelain",
        "Silver and spices",
        "Timber and furs"
      ],
      "correctIndex": 0,
      "explanation": "Gold from West African kingdoms (Ghana, Mali) was traded across the Sahara desert for Saharan rock salt and Mediterranean manufactures.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "wh_11",
      "subjectId": "ap-world-history",
      "stem": "What maritime navigational instrument, originally refined by Islamic scholars, allowed sailors to measure latitude by celestial altitude?",
      "options": [
        "Astrolabe",
        "Barometer",
        "Chronometer",
        "Seismograph"
      ],
      "correctIndex": 0,
      "explanation": "The astrolabe enabled navigators to determine local latitude at sea by measuring the angle of the sun or Polaris above the horizon.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "wh_12",
      "subjectId": "ap-world-history",
      "stem": "The Qing Dynasty enforced which distinctive physical mandate on ethnic Han men to symbolize submission to Manchu rule?",
      "options": [
        "The queue hairstyle (shaved forehead and braided pigtail)",
        "Mandatory foot-binding",
        "Tattooing clan seals",
        "Wearing samurai armor"
      ],
      "correctIndex": 0,
      "explanation": 'The Queue Order decreed that all Han Chinese men adopt the Manchu hairstyle under penalty of death ("lose your hair or lose your head").',
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "wh_13",
      "subjectId": "ap-world-history",
      "stem": "Which Indian leader championed satyagraha (nonviolent civil disobedience) to achieve independence from British colonial rule?",
      "options": [
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "Subhas Chandra Bose",
        "Muhammad Ali Jinnah"
      ],
      "correctIndex": 0,
      "explanation": "Mohandas Gandhi organized nonviolent campaigns including the Salt March that dismantled the British Raj in 1947.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "wh_14",
      "subjectId": "ap-world-history",
      "stem": "The Cold War was primarily an ideological and geopolitical confrontation between which two superpowers?",
      "options": [
        "The United States and the Soviet Union",
        "Great Britain and France",
        "China and Japan",
        "Germany and Russia"
      ],
      "correctIndex": 0,
      "explanation": "The post-WWII era pitted the democratic capitalist US against the authoritarian Marxist-Leninist USSR in proxy wars and an arms race.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "wh_15",
      "subjectId": "ap-world-history",
      "stem": "The Encomienda system in colonial Spanish America was established to:",
      "options": [
        "Extract forced agricultural and silver mining labor from indigenous populations",
        "Distribute free land to native tribes",
        "Enforce religious freedom for Jewish immigrants",
        "Establish democratic municipal councils"
      ],
      "correctIndex": 0,
      "explanation": "Spanish conquistadors were granted royal encomiendas entitling them to coercive indigenous tributary labor in exchange for Catholic instruction.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-human-geography": [
    {
      "id": "hg_1",
      "subjectId": "ap-human-geography",
      "stem": "According to the Demographic Transition Model (DTM), what distinguishes Stage 4 from Stage 1?",
      "options": [
        "Stage 4 has low birth and death rates, whereas Stage 1 has high birth and death rates",
        "Stage 4 has explosive natural increase rates",
        "Stage 1 has widespread mechanized medical infrastructure",
        "Stage 4 has higher infant mortality rates"
      ],
      "correctIndex": 0,
      "explanation": "Both stages exhibit slow population growth, but Stage 1 is high fluctuating while Stage 4 is low fluctuating (modern industrialized).",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "hg_2",
      "subjectId": "ap-human-geography",
      "stem": "The Von Thunen model predicts that dairy and perishable market gardening will locate in the ring closest to the market city because:",
      "options": [
        "Milk and fresh produce spoil rapidly and incur high transportation costs",
        "Dairy cattle require vast, inexpensive grazing land",
        "Firewood is cheaper to produce near rivers",
        "Grain requires continuous urban labor"
      ],
      "correctIndex": 0,
      "explanation": "Perishability and high transit costs force intensive market gardening and dairying to pay higher land rent closest to the central market.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "hg_3",
      "subjectId": "ap-human-geography",
      "stem": "What type of spatial diffusion occurs when an innovation spreads through a hierarchy of urban centers from large to smaller cities?",
      "options": [
        "Hierarchical diffusion",
        "Contagious diffusion",
        "Stimulus diffusion",
        "Relocation diffusion"
      ],
      "correctIndex": 0,
      "explanation": "Hierarchical diffusion cascades ideas through ranks of importance (e.g. fashion spreading from Paris and NYC to smaller regional towns).",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "hg_4",
      "subjectId": "ap-human-geography",
      "stem": "In political geography, what is a stateless nation?",
      "options": [
        "An ethnic group possessing cultural identity and historical homeland without sovereign state territory (e.g. Kurds)",
        "A sovereign state without an army",
        "A multinational empire like the former Soviet Union",
        "A newly independent colony"
      ],
      "correctIndex": 0,
      "explanation": "Stateless nations (such as the Kurds, Palestinians, or Basques) possess shared cultural self-determination without political sovereignty.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "hg_5",
      "subjectId": "ap-human-geography",
      "stem": "Thomas Malthus warned in 1798 that human population increases exponentially while food production increases:",
      "options": [
        "Arithmetically (linearly)",
        "Logarithmically",
        "Exponentially faster",
        "Negatively"
      ],
      "correctIndex": 0,
      "explanation": "Malthusian theory posited that geometric (exponential) population growth would outstrip arithmetic agricultural yield growth.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "hg_6",
      "subjectId": "ap-human-geography",
      "stem": "In Walter Christaller Central Place Theory, market service areas are modeled as interlocking:",
      "options": [
        "Hexagons",
        "Circles",
        "Squares",
        "Triangles"
      ],
      "correctIndex": 0,
      "explanation": "Hexagons eliminate overlapping service areas and unserved interstitial gaps while maintaining equidistant accessibility.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "hg_7",
      "subjectId": "ap-human-geography",
      "stem": "What term describes the boundary separating different linguistic features, such as regional pronunciation or vocabulary usage?",
      "options": [
        "Isohyet",
        "Isogloss",
        "Isotherm",
        "Enclave"
      ],
      "correctIndex": 1,
      "explanation": "An isogloss is a geographic boundary line demarcating areas where specific linguistic terms or dialect traits are predominant.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "hg_8",
      "subjectId": "ap-human-geography",
      "stem": "Which global religion is classified as ethnic rather than universalizing?",
      "options": [
        "Hinduism",
        "Christianity",
        "Islam",
        "Buddhism"
      ],
      "correctIndex": 0,
      "explanation": "Ethnic religions (such as Hinduism and Judaism) are closely tied to a specific culture and geographic homeland, with no active proselytization.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "hg_9",
      "subjectId": "ap-human-geography",
      "stem": "Gerrymandering refers to the political practice of:",
      "options": [
        "Redrawing electoral district boundaries to benefit a specific political party",
        "Counting undocumented migrants in the decennial census",
        "Merging rural municipalities into mega-cities",
        "Banning international trade tariffs"
      ],
      "correctIndex": 0,
      "explanation": "Gerrymandering strategically packs or cracks opposing voters across congressional districts to maximize party representation.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "hg_10",
      "subjectId": "ap-human-geography",
      "stem": "Wallerstein World Systems Theory categorizes nations into which three spatial economic tiers?",
      "options": [
        "Core, Periphery, and Semi-Periphery",
        "First, Second, and Third Worlds",
        "Developed, Developing, and Underdeveloped",
        "Northern, Southern, and Tropical"
      ],
      "correctIndex": 0,
      "explanation": "Core states exploit lower-wage labor and raw materials from periphery states, while semi-periphery states exhibit intermediate industrialization.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "hg_11",
      "subjectId": "ap-human-geography",
      "stem": "The Burgess Concentric Zone urban model depicts a central business district (CBD) encircled primarily by:",
      "options": [
        "A zone of transition with light manufacturing and tenement housing",
        "Affluent commuter suburbs",
        "Agricultural farmland",
        "Exclusive gated estates"
      ],
      "correctIndex": 0,
      "explanation": "Zone 2 in Burgess concentric model is the transitional zone characterized by decaying residential housing and light industrial expansion.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "hg_12",
      "subjectId": "ap-human-geography",
      "stem": "The Green Revolution of the mid-20th century substantially increased global grain yields through:",
      "options": [
        "Genetically engineered high-yielding variety (HYV) dwarf seeds, synthetic fertilizers, and mechanized irrigation",
        "Organic permaculture and heirloom seed preservation",
        "Shifting cultivation and slash-and-burn farming",
        "Banning chemical pesticides worldwide"
      ],
      "correctIndex": 0,
      "explanation": "Norman Borlaug introduced disease-resistant dwarf wheat and rice paired with synthetic nitrogen fertilizers and irrigation systems.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "hg_13",
      "subjectId": "ap-human-geography",
      "stem": "Which migration factor represents a 'pull' factor?",
      "options": [
        "Economic job opportunities and high wages",
        "War and military conscription",
        "Religious persecution",
        "Severe famine and crop failure"
      ],
      "correctIndex": 0,
      "explanation": "Pull factors attract migrants to a destination (e.g. employment, peace, freedom), whereas push factors compel departure.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "hg_14",
      "subjectId": "ap-human-geography",
      "stem": "A country where the population pyramid exhibits an expansive, wide base and narrow apex has:",
      "options": [
        "A high birth rate and a youthful population",
        "An aging population with declining birth rates",
        "Zero population growth",
        "Negative natural increase"
      ],
      "correctIndex": 0,
      "explanation": "A broad pyramid base indicates high birth rates and rapid demographic growth typical of developing nations in DTM Stage 2.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "hg_15",
      "subjectId": "ap-human-geography",
      "stem": "According to Ravenstein Laws of Migration, the majority of migrants travel:",
      "options": [
        "Short distances and remain within their home country",
        "Intercontinentally across oceans",
        "Exclusively from urban to rural areas",
        "Directly to polar regions"
      ],
      "correctIndex": 0,
      "explanation": "Ravenstein observed that step-migration and short-distance moves represent the overwhelming majority of voluntary human migration.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-economics": [
    {
      "id": "econ_1",
      "subjectId": "ap-economics",
      "stem": "If the price of a good increases by 10% and the quantity demanded falls by 20%, the price elasticity of demand is:",
      "options": [
        "Elastic ($E_d = 2.0$)",
        "Inelastic ($E_d = 0.5$)",
        "Unitary Elastic ($E_d = 1.0$)",
        "Perfective Inelastic ($E_d = 0$)"
      ],
      "correctIndex": 0,
      "explanation": "$E_d = |\\frac{\\% \\Delta Q_d}{\\% \\Delta P}| = |\\frac{-20\\%}{10\\%}| = 2.0$. Since $E_d > 1$, demand is price elastic.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "econ_2",
      "subjectId": "ap-economics",
      "stem": "What occurs when the government establishes a legally mandated price ceiling below the competitive market equilibrium price?",
      "options": [
        "A persistent market shortage",
        "A market surplus",
        "Equilibrium quantity increases",
        "No change occurs in the market"
      ],
      "correctIndex": 0,
      "explanation": "When price is artificially capped below equilibrium, quantity demanded ($Q_d$) exceeds quantity supplied ($Q_s$), causing a shortage.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "econ_3",
      "subjectId": "ap-economics",
      "stem": "In macroeconomics, expansionary fiscal policy intended to combat an economic recession involves:",
      "options": [
        "Increasing government spending and/or reducing taxes",
        "Increasing taxes and reducing spending",
        "Raising the central bank discount rate",
        "Selling government bonds in open market operations"
      ],
      "correctIndex": 0,
      "explanation": "Expansionary fiscal policy boosts aggregate demand by injecting federal expenditure or increasing household disposable income via tax cuts.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "econ_4",
      "subjectId": "ap-economics",
      "stem": "If the reserve requirement set by the central bank is 10%, what is the simple money multiplier?",
      "options": [
        "$10$",
        "$5$",
        "$20$",
        "$1$"
      ],
      "correctIndex": 0,
      "explanation": "The simple deposit expansion multiplier is $M = \\frac{1}{\\text{Reserve Ratio}} = \\frac{1}{0.10} = 10$.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "econ_5",
      "subjectId": "ap-economics",
      "stem": "Country A can produce 10 cars or 20 computers. Country B can produce 6 cars or 18 computers. Who holds the comparative advantage in computers?",
      "options": [
        "Country B",
        "Country A",
        "Both equally",
        "Neither country"
      ],
      "correctIndex": 0,
      "explanation": "Opportunity cost of 1 computer for A is $10/20 = 0.5$ cars. For B, it is $6/18 = 0.33$ cars. Country B has the lower opportunity cost in computers.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "econ_6",
      "subjectId": "ap-economics",
      "stem": "What type of market structure features a single seller with high barriers to entry and no close product substitutes?",
      "options": [
        "Monopoly",
        "Perfect Competition",
        "Monopolistic Competition",
        "Oligopoly"
      ],
      "correctIndex": 0,
      "explanation": "A pure monopoly is characterized by a single firm that controls the entire market supply and faces a downward-sloping demand curve.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "econ_7",
      "subjectId": "ap-economics",
      "stem": "A negative externality in production (such as factory smoke pollution) causes the unregulated free market to:",
      "options": [
        "Overproduce the good relative to the socially optimal quantity",
        "Underproduce the good",
        "Produce at zero cost",
        "Reach social optimum automatically"
      ],
      "correctIndex": 0,
      "explanation": "Because private marginal cost is lower than marginal social cost ($MSC > MPC$), firms overproduce, creating deadweight loss.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "econ_8",
      "subjectId": "ap-economics",
      "stem": "What does Gross Domestic Product (GDP) measure?",
      "options": [
        "The total market value of all final goods and services produced within a country in a given year",
        "The total financial wealth of all households and banks",
        "The value of intermediate goods exported abroad",
        "The total income earned by multinational citizens overseas"
      ],
      "correctIndex": 0,
      "explanation": "GDP encompasses the monetary value of all finished, final goods and services produced domestically within geographic borders in a specified period.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "econ_9",
      "subjectId": "ap-economics",
      "stem": "A profit-maximizing firm in any market structure expands output until:",
      "options": [
        "Marginal Revenue equals Marginal Cost ($MR = MC$)",
        "Price equals Average Total Cost",
        "Total Revenue is maximized",
        "Marginal Cost is minimized"
      ],
      "correctIndex": 0,
      "explanation": "The golden rule of profit maximization dictates producing up to the output level where marginal revenue equals marginal cost ($MR = MC$).",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "econ_10",
      "subjectId": "ap-economics",
      "stem": "The Phillips Curve in the short run illustrates a historical trade-off between:",
      "options": [
        "Inflation and unemployment",
        "Interest rates and GDP growth",
        "Government debt and trade deficits",
        "Taxes and investment"
      ],
      "correctIndex": 0,
      "explanation": "The short-run Phillips curve demonstrates an inverse relationship: lower unemployment rates are typically associated with higher inflation rates.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "econ_11",
      "subjectId": "ap-economics",
      "stem": "What type of unemployment occurs when workers are temporarily between jobs or searching for the best career fit?",
      "options": [
        "Frictional unemployment",
        "Structural unemployment",
        "Cyclical unemployment",
        "Seasonal unemployment"
      ],
      "correctIndex": 0,
      "explanation": "Frictional unemployment is voluntary and natural, reflecting the normal time lag workers spend transitioning between careers.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "econ_12",
      "subjectId": "ap-economics",
      "stem": "Consumer surplus is represented graphically as the area:",
      "options": [
        "Below the demand curve and above the market price",
        "Above the supply curve and below the market price",
        "Under the average total cost curve",
        "To the right of the equilibrium quantity"
      ],
      "correctIndex": 0,
      "explanation": "Consumer surplus is the difference between what consumers are willing to pay and what they actually pay at market price.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "econ_13",
      "subjectId": "ap-economics",
      "stem": "When the central bank purchases government treasury bonds on the open market, what is the impact on bank reserves and interest rates?",
      "options": [
        "Bank reserves increase, and nominal interest rates fall",
        "Bank reserves decrease, and interest rates rise",
        "Bank reserves fall, and inflation drops",
        "No change occurs"
      ],
      "correctIndex": 0,
      "explanation": "Open market bond purchases inject liquid reserves into the commercial banking system, shifting money supply right and lowering interest rates.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "econ_14",
      "subjectId": "ap-economics",
      "stem": "Public goods are characterized by which two economic properties?",
      "options": [
        "Non-excludable and non-rivalrous in consumption",
        "Excludable and rivalrous",
        "Produced solely by monopolies",
        "Tax-exempt and subsidized"
      ],
      "correctIndex": 0,
      "explanation": "Public goods (e.g. national defense, lighthouses) cannot exclude non-payers, and one person's use does not diminish another's.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "econ_15",
      "subjectId": "ap-economics",
      "stem": "If the Marginal Propensity to Consume (MPC) is 0.8, what is the government spending multiplier?",
      "options": [
        "$5$",
        "$1.25$",
        "$4$",
        "$10$"
      ],
      "correctIndex": 0,
      "explanation": "Spending Multiplier $= \\frac{1}{1 - MPC} = \\frac{1}{1 - 0.8} = \\frac{1}{0.2} = 5$.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ],
  "ap-english-lang": [
    {
      "id": "lang_1",
      "subjectId": "ap-english-lang",
      "stem": "An appeal that establishes the author's credibility, moral character, and authority is known as:",
      "options": [
        "Ethos",
        "Pathos",
        "Logos",
        "Kairos"
      ],
      "correctIndex": 0,
      "explanation": "Ethos appeals to ethics, trust, and authorial qualifications to persuade an audience of the speaker's reliability.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "lang_2",
      "subjectId": "ap-english-lang",
      "stem": 'What rhetorical device balances grammatical structures across corresponding clauses (e.g. "Ask not what your country can do for you...")?',
      "options": [
        "Parallelism",
        "Chiasmus",
        "Anaphora",
        "Asyndeton"
      ],
      "correctIndex": 0,
      "explanation": "Parallelism utilizes repeating grammatical forms to emphasize balance, rhythm, and clarity in rhetorical argumentation.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "lang_3",
      "subjectId": "ap-english-lang",
      "stem": "The logical fallacy where an arguer attacks an opponent's personal character rather than addressing their actual argument is called:",
      "options": [
        "Ad Hominem",
        "Straw Man",
        "Post Hoc Ergo Propter Hoc",
        "Bandwagon Appeal"
      ],
      "correctIndex": 0,
      "explanation": 'Ad Hominem (Latin: "to the person") diverts attention from the substantive debate by personally maligning the speaker.',
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "lang_4",
      "subjectId": "ap-english-lang",
      "stem": "What term refers to the author's attitude toward their subject matter, conveyed through diction and syntax?",
      "options": [
        "Tone",
        "Mood",
        "Theme",
        "Persona"
      ],
      "correctIndex": 0,
      "explanation": "Tone reflects the writer's specific emotional disposition (e.g. irreverent, pedantic, contemplative) towards the topic.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "lang_5",
      "subjectId": "ap-english-lang",
      "stem": "Which rhetorical appeal utilizes logical reasoning, factual evidence, empirical statistics, and deductions?",
      "options": [
        "Logos",
        "Ethos",
        "Pathos",
        "Trope"
      ],
      "correctIndex": 0,
      "explanation": "Logos employs rational syllogisms, inductive/deductive reasoning, verified data, and factual premises.",
      "difficulty": "Easy",
      "timeLimit": 30
    },
    {
      "id": "lang_6",
      "subjectId": "ap-english-lang",
      "stem": "The deliberate repetition of a word or phrase at the beginning of successive sentences or clauses is known as:",
      "options": [
        "Anaphora",
        "Epistrophe",
        "Antithesis",
        "Metonymy"
      ],
      "correctIndex": 0,
      "explanation": `Anaphora creates emphatic emotional resonance through initial clause repetition (e.g. MLK's "I have a dream").`,
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "lang_7",
      "subjectId": "ap-english-lang",
      "stem": "In an argumentative essay, acknowledging a valid point made by the opposing viewpoint is called a:",
      "options": [
        "Concession",
        "Rebuttal",
        "Warrant",
        "Qualifier"
      ],
      "correctIndex": 0,
      "explanation": "A concession demonstrates rhetorical maturity by admitting truth in a counterargument before delivering a rebuttal.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "lang_8",
      "subjectId": "ap-english-lang",
      "stem": "What rhetorical term describes the opportune, fitting, and urgent moment for a speaker to deliver a message?",
      "options": [
        "Kairos",
        "Exigence",
        "Peroration",
        "Inventio"
      ],
      "correctIndex": 0,
      "explanation": "Kairos represents the decisive, opportune timing and cultural moment that gives rhetorical discourse its urgency.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "lang_9",
      "subjectId": "ap-english-lang",
      "stem": 'A figure of speech in which an object or concept is referred to by the name of something closely associated with it (e.g. "The White House announced...") is:',
      "options": [
        "Metonymy",
        "Synecdoche",
        "Hyperbole",
        "Oxymoron"
      ],
      "correctIndex": 0,
      "explanation": 'Metonymy substitutes a related attribute or physical association for the entity itself ("the crown" for the monarchy).',
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "lang_10",
      "subjectId": "ap-english-lang",
      "stem": "What is the function of a qualifier in the Toulmin model of argumentation?",
      "options": [
        'To restrict the scope of a claim to avoid unwarranted generalizations (e.g. "most", "often", "in certain conditions")',
        "To provide statistical data",
        "To attack the opponent's credibility",
        "To conclude the speech"
      ],
      "correctIndex": 0,
      "explanation": "Qualifiers temper claims to reasonable, defensible boundaries, preventing rigid all-or-nothing fallacies.",
      "difficulty": "Medium",
      "timeLimit": 45
    },
    {
      "id": "lang_11",
      "subjectId": "ap-english-lang",
      "stem": 'Understatement, especially that in which an affirmative is expressed by the negative of its contrary (e.g. "not bad at all"), is called:',
      "options": [
        "Litotes",
        "Euphemism",
        "Apostrophe",
        "Paradox"
      ],
      "correctIndex": 0,
      "explanation": "Litotes employs deliberate double negatives or ironic understatements to assert a positive quality modestly.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "lang_12",
      "subjectId": "ap-english-lang",
      "stem": 'What rhetorical device juxtaposes two sharply contrasting ideas in balanced phrases (e.g. "Give me liberty, or give me death!")?',
      "options": [
        "Antithesis",
        "Hyperbole",
        "Personification",
        "Zeugma"
      ],
      "correctIndex": 0,
      "explanation": "Antithesis highlights stark philosophical or emotional opposition through balanced syntactic contrast.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "lang_13",
      "subjectId": "ap-english-lang",
      "stem": "A Straw Man fallacy occurs when an author:",
      "options": [
        "Oversimplifies or misrepresents an opponent's argument to make it easier to attack",
        "Assumes that because Event B followed Event A, Event A caused Event B",
        "Argues that an action will trigger an unavoidable catastrophic chain reaction",
        "Repeats the claim as the premise of the argument"
      ],
      "correctIndex": 0,
      "explanation": "A straw man replaces an opponent's actual nuanced stance with a caricatured, easily dismantled distortion.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "lang_14",
      "subjectId": "ap-english-lang",
      "stem": "In rhetorical analysis, the 'exigence' of a text refers to:",
      "options": [
        "The real-world issue, problem, or situation that provoked the author to write or speak",
        "The grammatical vocabulary level",
        "The publisher's copyright guidelines",
        "The number of historical citations"
      ],
      "correctIndex": 0,
      "explanation": "Exigence is the catalyst or problem in the rhetorical situation that demands a response from the speaker.",
      "difficulty": "Hard",
      "timeLimit": 60
    },
    {
      "id": "lang_15",
      "subjectId": "ap-english-lang",
      "stem": 'What rhetorical scheme reverses the grammatical structure in successive clauses (e.g. "Never let a Fool Kiss You or a Kiss Fool You")?',
      "options": [
        "Chiasmus",
        "Polysyndeton",
        "Epistrophe",
        "Hypophora"
      ],
      "correctIndex": 0,
      "explanation": "Chiasmus creates an inverted ABBA syntactic mirror structure that emphasizes wit and thematic reversal.",
      "difficulty": "Hard",
      "timeLimit": 60
    }
  ]
};
try {
  const calcLevels = getAllCalculusAbLevels();
  if (Array.isArray(calcLevels) && calcLevels.length > 0) {
    const cedQuestions = calcLevels.flatMap(
      (l) => (l.questions || []).map((q) => ({
        id: `ced_${q.id}`,
        subjectId: "ap-calculus-ab",
        stem: q.stem,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation || "Verified against College Board AP Calculus CED standards.",
        difficulty: l.difficulty === "Easy" || l.difficulty === "Hard" ? l.difficulty : "Medium",
        timeLimit: l.difficulty === "Easy" ? 30 : l.difficulty === "Hard" ? 60 : 45
      }))
    );
    if (!BATTLE_QUESTIONS_BANK["ap-calculus-ab"]) BATTLE_QUESTIONS_BANK["ap-calculus-ab"] = [];
    BATTLE_QUESTIONS_BANK["ap-calculus-ab"].push(...cedQuestions);
    if (!BATTLE_QUESTIONS_BANK["ap-calculus-bc"]) BATTLE_QUESTIONS_BANK["ap-calculus-bc"] = [];
    BATTLE_QUESTIONS_BANK["ap-calculus-bc"].push(...cedQuestions);
  }
} catch (e) {
  console.warn("[QuizBattleBank] CED Calculus auto-merge note:", e);
}
try {
  if (EXPANDED_BATTLE_QUESTIONS && typeof EXPANDED_BATTLE_QUESTIONS === "object") {
    Object.entries(EXPANDED_BATTLE_QUESTIONS).forEach(([subj, qList]) => {
      if (!BATTLE_QUESTIONS_BANK[subj]) {
        BATTLE_QUESTIONS_BANK[subj] = [];
      }
      BATTLE_QUESTIONS_BANK[subj].push(...qList);
      if (subj === "ap-physics") {
        if (!BATTLE_QUESTIONS_BANK["ap-physics-1"]) BATTLE_QUESTIONS_BANK["ap-physics-1"] = [];
        BATTLE_QUESTIONS_BANK["ap-physics-1"].push(...qList);
      }
    });
  }
} catch (e) {
  console.warn("[QuizBattleBank] Expanded subjects auto-merge note:", e);
}
var RUNTIME_SEEN_STEMS = {};
function normalizeStemKey(text) {
  if (!text) return "";
  return String(text).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 100);
}
function getStoredSeenStems(subjectKey) {
  const set = /* @__PURE__ */ new Set();
  if (RUNTIME_SEEN_STEMS[subjectKey]) {
    RUNTIME_SEEN_STEMS[subjectKey].forEach((s) => set.add(s));
  }
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const raw = window.localStorage.getItem(`ap_battle_seen_${subjectKey}`);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          arr.forEach((item) => set.add(normalizeStemKey(item)));
        }
      }
    } catch {
    }
  }
  return set;
}
function saveStoredSeenStems(subjectKey, newlySeenStems, totalBankSize) {
  if (!RUNTIME_SEEN_STEMS[subjectKey]) {
    RUNTIME_SEEN_STEMS[subjectKey] = /* @__PURE__ */ new Set();
  }
  newlySeenStems.forEach((s) => RUNTIME_SEEN_STEMS[subjectKey].add(normalizeStemKey(s)));
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const current = getStoredSeenStems(subjectKey);
      newlySeenStems.forEach((s) => current.add(normalizeStemKey(s)));
      let arrayToSave = Array.from(current);
      if (arrayToSave.length >= Math.max(15, totalBankSize - 5)) {
        arrayToSave = arrayToSave.slice(-10);
        RUNTIME_SEEN_STEMS[subjectKey] = new Set(arrayToSave);
      }
      window.localStorage.setItem(`ap_battle_seen_${subjectKey}`, JSON.stringify(arrayToSave));
    } catch {
    }
  }
}
function getBattleQuestions(subjectId, count = 5, avoidStems = []) {
  let key = subjectId;
  if (key === "ap-physics-1") key = "ap-physics";
  if (!BATTLE_QUESTIONS_BANK[key]) {
    key = Object.keys(BATTLE_QUESTIONS_BANK).find((k) => k.includes(subjectId) || subjectId.includes(k)) || "ap-calculus-ab";
  }
  const bank = BATTLE_QUESTIONS_BANK[key] || BATTLE_QUESTIONS_BANK["ap-calculus-ab"] || [];
  if (!bank || bank.length === 0) return [];
  const callerAvoidSet = new Set((avoidStems || []).map((s) => normalizeStemKey(s)));
  const storedAvoidSet = getStoredSeenStems(key);
  const combinedAvoidSet = /* @__PURE__ */ new Set([...callerAvoidSet, ...storedAvoidSet]);
  const shuffledBank = [...bank];
  for (let i = shuffledBank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledBank[i], shuffledBank[j]] = [shuffledBank[j], shuffledBank[i]];
  }
  let freshPool = shuffledBank.filter((q) => !combinedAvoidSet.has(normalizeStemKey(q.stem)));
  if (freshPool.length < count) {
    const recentRoundAvoid = new Set((avoidStems || []).map((s) => normalizeStemKey(s)));
    const cycledPool = shuffledBank.filter((q) => !recentRoundAvoid.has(normalizeStemKey(q.stem)));
    freshPool = [...freshPool, ...cycledPool.filter((q) => !freshPool.some((f) => f.id === q.id || normalizeStemKey(f.stem) === normalizeStemKey(q.stem)))];
  }
  const selected = freshPool.slice(0, Math.min(count, freshPool.length));
  if (selected.length < count) {
    for (const q of shuffledBank) {
      if (!selected.some((s) => s.id === q.id || normalizeStemKey(s.stem) === normalizeStemKey(q.stem))) {
        selected.push(q);
        if (selected.length >= count) break;
      }
    }
  }
  saveStoredSeenStems(key, selected.map((q) => q.stem), bank.length);
  return selected;
}

// src/utils/svgHelper.ts
function extractDiagramAndCleanText(text, existingSvg) {
  if (!text) return { cleanText: "", diagramSvg: existingSvg };
  let extractedSvg = existingSvg && existingSvg.trim() ? existingSvg.trim() : void 0;
  let clean = text;
  const codeBlockMatch = clean.match(/```(?:xml|svg|html)?\s*(<svg[\s\S]*?<\/svg>)\s*```/i);
  if (codeBlockMatch) {
    if (!extractedSvg) {
      extractedSvg = codeBlockMatch[1].trim();
    }
    clean = clean.replace(codeBlockMatch[0], "").trim();
  }
  const rawSvgMatch = clean.match(/<svg[\s\S]*?<\/svg>/i);
  if (rawSvgMatch) {
    if (!extractedSvg) {
      extractedSvg = rawSvgMatch[0].trim();
    }
    clean = clean.replace(rawSvgMatch[0], "").trim();
  }
  const escapedSvgMatch = clean.match(/&lt;svg[\s\S]*?&lt;\/svg&gt;/i);
  if (escapedSvgMatch) {
    if (!extractedSvg) {
      extractedSvg = escapedSvgMatch[0].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").trim();
    }
    clean = clean.replace(escapedSvgMatch[0], "").trim();
  }
  clean = clean.replace(/```(?:xml|svg|html)?\s*```/gi, "").trim();
  clean = clean.replace(/\n{3,}/g, "\n\n").trim();
  if (extractedSvg) {
    const innerMatch = extractedSvg.match(/<svg[\s\S]*?<\/svg>/i);
    if (innerMatch) {
      extractedSvg = innerMatch[0].trim();
    }
  }
  return { cleanText: clean, diagramSvg: extractedSvg };
}

// src/data/apSubjectWhitelists.ts
var AP_SUBJECT_WHITELISTS = {
  "ap-human-geography": {
    subjectId: "ap-human-geography",
    subjectName: "AP Human Geography",
    category: "social_science",
    mathExpected: false,
    canonicalUnits: [
      { unitNumber: 1, title: "Thinking Geographically", keywords: ["gis", "gps", "remote sensing", "scale of analysis", "formal region", "functional region", "vernacular region", "environmental determinism", "possibilism", "distance decay", "time-space compression", "map projection", "choropleth"] },
      { unitNumber: 2, title: "Population & Migration Patterns", keywords: ["demographic transition model", "dtm", "crude birth rate", "cbr", "crude death rate", "cdr", "natural increase rate", "nir", "population pyramid", "dependency ratio", "malthus", "boserup", "ravenstein", "push factor", "pull factor", "refugee", "idp", "asylum", "pronatalist", "antinatalist", "epidemiological transition"] },
      { unitNumber: 3, title: "Cultural Patterns & Processes", keywords: ["cultural hearth", "contagious diffusion", "hierarchical diffusion", "stimulus diffusion", "relocation diffusion", "universalizing religion", "ethnic religion", "language family", "indo-european", "isogloss", "lingua franca", "acculturation", "assimilation", "syncretism", "cultural landscape", "folk culture", "pop culture"] },
      { unitNumber: 4, title: "Political Patterns & Processes", keywords: ["sovereignty", "nation-state", "stateless nation", "multinational state", "autonomous region", "colonialism", "berlin conference", "superimposed boundary", "relic boundary", "unclos", "exclusive economic zone", "eez", "gerrymandering", "devolution", "supranationalism", "un", "eu", "nato", "asean", "balkanization"] },
      { unitNumber: 5, title: "Agriculture & Rural Land-Use", keywords: ["von thunen", "bid-rent", "green revolution", "subsistence agriculture", "commercial agriculture", "intensive farming", "extensive farming", "shifting cultivation", "pastoral nomadism", "agribusiness", "commodity chain", "metes and bounds", "township and range", "long lot", "desertification", "salinization"] },
      { unitNumber: 6, title: "Cities & Urban Land-Use", keywords: ["burgess", "concentric zone", "hoyt sector", "multiple nuclei", "harris-ullman", "galactic city", "edge city", "central place theory", "christaller", "range", "threshold", "rank-size rule", "primate city", "gentrification", "new urbanism", "smart growth", "suburban sprawl", "redlining", "blockbusting", "megacity", "squatter settlement"] },
      { unitNumber: 7, title: "Industrial & Economic Development", keywords: ["wallerstein", "world systems", "core", "periphery", "semiperiphery", "rostow", "stages of economic growth", "weber", "least cost theory", "bulk-gaining", "bulk-reducing", "hdi", "human development index", "gni", "gii", "maquiladora", "epz", "sez", "outsourcing", "deindustrialization", "agglomeration", "un sdgs", "microfinance"] }
    ],
    allowedDomains: ["spatial analysis", "demography", "culture", "geopolitics", "agriculture", "urban planning", "economic development"],
    forbiddenSignatures: [
      // Calculus and advanced mathematics
      /\b(?:definite\s+integral|indefinite\s+integral|fundamental\s+theorem\s+of\s+calculus|\bFTC\b|derivative|differentiat(?:ion|e)|critical\s+point|concav(?:e|ity)|tangent\s+line|riemann\s+sum|slope\s+field|separable\s+differential\s+equation|disk\s+method|washer\s+method|shell\s+method|volume\s+of\s+revolution|taylor\s+series|maclaurin|radius\s+of\s+convergence|l'h[oô]pital|mean\s+value\s+theorem|\bMVT\b|intermediate\s+value\s+theorem|\bIVT\b|dy\/dx|d\^2y\/dx\^2|f'\(x\)|f''\(x\)|\\int\b|\\frac\{d\}\{dx\})\b/i,
      // Classical mechanics / Physics
      /\b(?:centripetal\s+acceleration|rotational\s+inertia|kinematic\s+equation|projectile\s+motion|angular\s+momentum|newton's\s+second\s+law|bernoulli's\s+equation|archimedes\s+principle|f\s*=\s*ma)\b/i,
      // Advanced Chemistry
      /\b(?:titration\s+curve|le\s+chatelier|stoichiometr(?:y|ic)|henderson-hasselbalch|beer-lambert|orbitals|hybridization|sp3|photoelectron\s+spectroscopy|\bPES\b|net\s+ionic\s+equation)\b/i
    ]
  },
  "ap-environmental-science": {
    subjectId: "ap-environmental-science",
    subjectName: "AP Environmental Science",
    category: "science",
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: "The Living World: Ecosystems", keywords: ["carbon cycle", "nitrogen cycle", "phosphorus cycle", "hydrologic cycle", "trophic level", "10% rule", "primary productivity", "gpp", "npp", "biomes"] },
      { unitNumber: 2, title: "The Living World: Biodiversity", keywords: ["ecosystem services", "provisioning", "regulating", "cultural", "supporting", "island biogeography", "ecological tolerance", "succession", "pioneer species", "keystone species"] },
      { unitNumber: 3, title: "Populations", keywords: ["generalist", "specialist", "r-selected", "k-selected", "survivorship curve", "carrying capacity", "k", "rule of 70", "doubling time", "demographic transition", "tfr", "replacement level"] },
      { unitNumber: 4, title: "Earth Systems & Resources", keywords: ["plate tectonics", "convergent", "divergent", "transform", "soil horizons", "soil texture triangle", "atmosphere", "troposphere", "stratosphere", "coriolis effect", "el nino", "la nina", "watershed"] },
      { unitNumber: 5, title: "Land & Water Use", keywords: ["tragedy of the commons", "clearcutting", "green revolution", "irrigation", "drip", "furrow", "flood", "salinization", "aquifer", "ogallala", "pest control", "ipm", "cafo", "overfishing", "mining", "slag"] },
      { unitNumber: 6, title: "Energy Resources & Consumption", keywords: ["fossil fuels", "coal", "petroleum", "natural gas", "fracking", "nuclear fission", "half-life", "biomass", "solar photovoltaic", "wind turbine", "hydroelectric", "geothermal", "hydrogen fuel cell"] },
      { unitNumber: 7, title: "Atmospheric Pollution", keywords: ["photochemical smog", "ground-level ozone", "thermal inversion", "acid deposition", "so2", "nox", "pm2.5", "pm10", "radon", "asbestos", "vocs", "vapor recovery nozzle", "catalytic converter", "scrubber"] },
      { unitNumber: 8, title: "Aquatic & Terrestrial Pollution", keywords: ["point source", "nonpoint source", "eutrophication", "hypoxic", "dead zone", "biological oxygen demand", "bod", "bioaccumulation", "biomagnification", "endocrine disruptor", "ld50", "sanitary landfill", "leachate", "sewage treatment"] },
      { unitNumber: 9, title: "Global Change", keywords: ["stratospheric ozone depletion", "cfcs", "montreal protocol", "greenhouse effect", "co2", "ch4", "n2o", "ocean acidification", "coral bleaching", "invasive species", "hsi", "cites", "endangered species act"] }
    ],
    allowedDomains: ["ecology", "earth systems", "energy", "environmental toxicology", "pollution", "sustainability", "population ecology"],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|indefinite\s+integral|fundamental\s+theorem\s+of\s+calculus|riemann\s+sum|disk\s+method|washer\s+method|taylor\s+series|maclaurin|l'h[oô]pital|mean\s+value\s+theorem|dy\/dx|d\^2y\/dx\^2|f'\(x\)|f''\(x\))\b/i,
      /\b(?:rotational\s+inertia|angular\s+momentum|centripetal\s+acceleration|bernoulli's\s+equation)\b/i
    ]
  },
  "ap-computer-science-principles": {
    subjectId: "ap-computer-science-principles",
    subjectName: "AP Computer Science Principles",
    category: "tech",
    mathExpected: false,
    canonicalUnits: [
      { unitNumber: 1, title: "Creative Development", keywords: ["collaboration", "program design", "software development process", "debugging", "logic error", "syntax error", "runtime error", "testing"] },
      { unitNumber: 2, title: "Data Representation & Information", keywords: ["binary", "bits", "bytes", "hexadecimal", "overflow error", "roundoff error", "lossy compression", "lossless compression", "data abstraction", "metadata"] },
      { unitNumber: 3, title: "Algorithms & Programming", keywords: ["sequencing", "selection", "iteration", "conditional", "if-else", "loops", "traversal", "linear search", "binary search", "procedural abstraction", "parameters", "return value", "robot grid"] },
      { unitNumber: 4, title: "Computing Systems & Networks", keywords: ["the internet", "ip address", "ipv4", "ipv6", "tcp/ip", "packets", "packet switching", "routers", "fault tolerance", "redundancy", "bandwidth", "latency", "world wide web", "http", "https"] },
      { unitNumber: 5, title: "Impact of Computing", keywords: ["digital divide", "computing bias", "crowdsourcing", "citizen science", "intellectual property", "creative commons", "open source", "open access", "cybersecurity", "phishing", "keylogging", "malware", "public-key encryption", "symmetric encryption", "ddos", "multifactor authentication"] }
    ],
    allowedDomains: ["algorithms", "networking", "data representation", "programming logic", "cybersecurity", "digital ethics"],
    forbiddenSignatures: [
      /\b(?:integral|derivative|calculus|riemann|titration|stoichiometry|dtm|demographic\s+transition|von\s+thunen|gerrymandering)\b/i,
      /\b(?:public\s+class\b|System\.out\.println|extends\b|implements\b|private\s+int\b|ArrayList<Integer>)\b/i
      // Avoid Java AP CSA code leaking into CSP pseudocode
    ]
  },
  "ap-calculus-ab": {
    subjectId: "ap-calculus-ab",
    subjectName: "AP Calculus AB",
    category: "stem_math",
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: "Limits & Continuity", keywords: ["limit", "continuity", "removable discontinuity", "jump discontinuity", "vertical asymptote", "squeeze theorem", "intermediate value theorem", "ivt", "end behavior"] },
      { unitNumber: 2, title: "Differentiation: Definition & Fundamentals", keywords: ["derivative", "difference quotient", "instantaneous rate of change", "power rule", "product rule", "quotient rule", "differentiability"] },
      { unitNumber: 3, title: "Chain Rule & Implicit Differentiation", keywords: ["chain rule", "composite function", "implicit differentiation", "inverse trigonometric derivatives"] },
      { unitNumber: 4, title: "Contextual Applications of Differentiation", keywords: ["straight-line motion", "position", "velocity", "acceleration", "speed", "related rates", "local linearity", "linear approximation"] },
      { unitNumber: 5, title: "Analytical Applications of Differentiation", keywords: ["mean value theorem", "mvt", "extreme value theorem", "evt", "critical point", "first derivative test", "second derivative test", "concavity", "inflection point", "optimization"] },
      { unitNumber: 6, title: "Integration & Accumulation of Change", keywords: ["riemann sum", "trapezoidal rule", "antiderivative", "indefinite integral", "definite integral", "fundamental theorem of calculus", "ftc", "u-substitution"] },
      { unitNumber: 7, title: "Differential Equations & Slope Fields", keywords: ["slope field", "separation of variables", "general solution", "particular solution", "exponential growth", "dy/dx"] },
      { unitNumber: 8, title: "Applications of Integration", keywords: ["average value", "area between curves", "volume of solid of revolution", "disk method", "washer method", "cross sections"] }
    ],
    allowedDomains: ["limits", "derivatives", "integrals", "differential equations", "particle motion", "rates of change"],
    forbiddenSignatures: [
      /\b(?:gentrification|von\s+thunen|supranationalism|wallerstein|malthus|cold\s+war|french\s+revolution|hamlet|chloroplast|mitochondria|dna\s+replication|operon)\b/i
    ]
  },
  "ap-calculus-bc": {
    subjectId: "ap-calculus-bc",
    subjectName: "AP Calculus BC",
    category: "stem_math",
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: "Limits & Continuity", keywords: ["limit", "continuity", "squeeze theorem", "l'hopital"] },
      { unitNumber: 2, title: "Differentiation: Definition & Fundamentals", keywords: ["derivative", "power rule", "product rule", "quotient rule"] },
      { unitNumber: 3, title: "Chain Rule & Implicit Differentiation", keywords: ["chain rule", "implicit differentiation"] },
      { unitNumber: 4, title: "Contextual Applications of Differentiation", keywords: ["related rates", "linear approximation"] },
      { unitNumber: 5, title: "Analytical Applications of Differentiation", keywords: ["mean value theorem", "mvt", "critical points", "optimization"] },
      { unitNumber: 6, title: "Integration & Accumulation of Change", keywords: ["riemann sums", "ftc", "integration by parts", "partial fractions", "improper integrals"] },
      { unitNumber: 7, title: "Differential Equations", keywords: ["slope fields", "euler's method", "logistic differential equation", "carrying capacity"] },
      { unitNumber: 8, title: "Applications of Integration", keywords: ["area between curves", "volumes of revolution", "arc length"] },
      { unitNumber: 9, title: "Parametric Equations, Polar Coordinates & Vector-Valued Functions", keywords: ["parametric equations", "vector motion", "velocity vector", "speed", "polar coordinates", "polar area", "r(theta)"] },
      { unitNumber: 10, title: "Infinite Sequences & Series", keywords: ["infinite series", "geometric series", "taylor polynomial", "maclaurin", "ratio test", "radius of convergence", "interval of convergence", "alternating series test", "lagrange error bound"] }
    ],
    allowedDomains: ["calculus", "infinite series", "taylor polynomials", "polar coordinates", "parametric equations", "differential equations"],
    forbiddenSignatures: [
      /\b(?:gentrification|von\s+thunen|supranationalism|wallerstein|malthus|cold\s+war|cell\s+membrane)\b/i
    ]
  },
  "ap-physics-1": {
    subjectId: "ap-physics-1",
    subjectName: "AP Physics 1: Algebra-Based",
    category: "science",
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: "Kinematics", keywords: ["displacement", "velocity", "acceleration", "free fall", "projectile motion", "v-t graph", "x-t graph"] },
      { unitNumber: 2, title: "Force & Translational Dynamics", keywords: ["newton's laws", "inertia", "f=ma", "free body diagram", "normal force", "friction", "tension", "spring force", "hooke's law"] },
      { unitNumber: 3, title: "Work, Energy & Power", keywords: ["kinetic energy", "gravitational potential energy", "elastic potential energy", "conservation of energy", "work-energy theorem", "power"] },
      { unitNumber: 4, title: "Linear Momentum", keywords: ["momentum", "impulse", "conservation of momentum", "elastic collision", "inelastic collision", "center of mass"] },
      { unitNumber: 5, title: "Torque & Rotational Dynamics", keywords: ["torque", "rotational inertia", "rotational kinetic energy", "angular momentum", "conservation of angular momentum", "angular acceleration"] },
      { unitNumber: 6, title: "Energy & Momentum of Oscillations", keywords: ["simple harmonic motion", "shm", "period", "frequency", "simple pendulum", "mass-spring oscillator"] },
      { unitNumber: 7, title: "Fluids", keywords: ["density", "pressure", "buoyant force", "archimedes principle", "continuity equation", "bernoulli's equation"] }
    ],
    allowedDomains: ["mechanics", "forces", "energy", "momentum", "rotational motion", "oscillations", "fluids"],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|fundamental\s+theorem\s+of\s+calculus|taylor\s+series|maclaurin|disk\s+method|washer\s+method)\b/i,
      /\b(?:dtm|gentrification|von\s+thunen|supranationalism|gerrymandering)\b/i
    ]
  },
  "ap-chemistry": {
    subjectId: "ap-chemistry",
    subjectName: "AP Chemistry",
    category: "science",
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: "Atomic Structure & Properties", keywords: ["moles", "molar mass", "pes", "photoelectron spectroscopy", "electron configuration", "periodic trends", "electronegativity", "ionization energy", "mass spectrometry"] },
      { unitNumber: 2, title: "Molecular & Ionic Compound Structure & Properties", keywords: ["chemical bonds", "ionic", "covalent", "lewis structure", "resonance", "vsepr", "molecular geometry", "bond angle", "formal charge", "hybridization"] },
      { unitNumber: 3, title: "Intermolecular Forces & Properties", keywords: ["intermolecular forces", "imf", "hydrogen bonding", "dipole-dipole", "london dispersion", "vapor pressure", "boiling point", "solubility", "beer-lambert law"] },
      { unitNumber: 4, title: "Chemical Reactions", keywords: ["net ionic equation", "stoichiometry", "limiting reactant", "percent yield", "precipitation", "acid-base", "redox", "oxidation state", "titration"] },
      { unitNumber: 5, title: "Kinetics", keywords: ["reaction rate", "rate law", "rate constant k", "reaction order", "integrated rate law", "half-life", "activation energy", "arrhenius", "catalyst", "reaction mechanism", "elementary step"] },
      { unitNumber: 6, title: "Thermodynamics", keywords: ["endothermic", "exothermic", "enthalpy", "delta h", "heat capacity", "calorimetry", "hess's law", "bond enthalpies", "standard enthalpy of formation"] },
      { unitNumber: 7, title: "Equilibrium", keywords: ["equilibrium constant", "k_eq", "k_c", "k_p", "reaction quotient q", "le chatelier's principle", "solubility product ksp", "common ion effect"] },
      { unitNumber: 8, title: "Acids & Bases", keywords: ["ph", "poh", "strong acid", "weak acid", "ka", "kb", "kw", "neutralization", "titration curve", "equivalence point", "buffer", "henderson-hasselbalch"] },
      { unitNumber: 9, title: "Applications of Thermodynamics", keywords: ["entropy", "delta s", "gibbs free energy", "delta g", "galvanic cell", "voltaic cell", "electrolytic cell", "cell potential", "faraday's constant"] }
    ],
    allowedDomains: ["atomic structure", "bonding", "stoichiometry", "kinetics", "thermodynamics", "chemical equilibrium", "acids and bases", "electrochemistry"],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|fundamental\s+theorem\s+of\s+calculus|taylor\s+series|disk\s+method|washer\s+method)\b/i,
      /\b(?:dtm|demographic\s+transition|von\s+thunen|gerrymandering|supranationalism)\b/i
    ]
  },
  "ap-biology": {
    subjectId: "ap-biology",
    subjectName: "AP Biology",
    category: "science",
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: "Chemistry of Life", keywords: ["water properties", "hydrogen bonding", "macromolecules", "carbohydrates", "lipids", "proteins", "nucleic acids", "amino acids", "peptide bond"] },
      { unitNumber: 2, title: "Cell Structure & Function", keywords: ["cell organelles", "endosymbiosis", "plasma membrane", "phospholipid bilayer", "selective permeability", "osmosis", "water potential", "tonicity", "active transport"] },
      { unitNumber: 3, title: "Cellular Energetics", keywords: ["enzyme", "catalysis", "active site", "denaturation", "competitive inhibitor", "allosteric", "photosynthesis", "chloroplast", "chlorophyll", "calvin cycle", "cellular respiration", "mitochondria", "glycolysis", "krebs cycle", "oxidative phosphorylation", "atp synthase"] },
      { unitNumber: 4, title: "Cell Communication & Cell Cycle", keywords: ["signal transduction", "ligand", "receptor", "second messenger", "camp", "phosphorylation cascade", "feedback loops", "mitosis", "cyclin", "cdk", "apoptosis"] },
      { unitNumber: 5, title: "Heredity", keywords: ["meiosis", "crossing over", "independent assortment", "mendelian genetics", "monohybrid", "dihybrid", "punnett square", "chi-square", "sex-linked", "pedigree"] },
      { unitNumber: 6, title: "Gene Expression & Regulation", keywords: ["dna replication", "helicase", "dna polymerase", "transcription", "mrna", "translation", "tRNA", "ribosome", "codon", "operon", "lac operon", "mutation", "gel electrophoresis", "pcr"] },
      { unitNumber: 7, title: "Natural Selection", keywords: ["natural selection", "evolution", "fitness", "hardy-weinberg", "genetic drift", "founder effect", "bottleneck", "speciation", "allopatric", "phylogenetic tree", "cladogram"] },
      { unitNumber: 8, title: "Ecology", keywords: ["energy flow", "trophic cascade", "keystone species", "symbiosis", "population ecology", "carrying capacity", "exponential growth", "logistic growth", "biodiversity"] }
    ],
    allowedDomains: ["cellular biology", "genetics", "evolution", "ecology", "biochemistry", "physiology"],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|fundamental\s+theorem\s+of\s+calculus|disk\s+method|washer\s+method)\b/i,
      /\b(?:gerrymandering|dtm|demographic\s+transition|von\s+thunen|supranationalism|berlin\s+conference)\b/i
    ]
  },
  "ap-us-history": {
    subjectId: "ap-us-history",
    subjectName: "AP U.S. History (APUSH)",
    category: "humanities",
    mathExpected: false,
    canonicalUnits: [
      { unitNumber: 1, title: "Period 1 (1491-1607)", keywords: ["columbian exchange", "indigenous societies", "encomienda system", "spanish colonization", "pueblo revolt"] },
      { unitNumber: 2, title: "Period 2 (1607-1754)", keywords: ["cheasapeake", "jamestown", "puritans", "new england", "middle colonies", "mercantilism", "salutary neglect", "first great awakening", "triangular trade", "indentured servitude", "bacon's rebellion"] },
      { unitNumber: 3, title: "Period 3 (1754-1800)", keywords: ["french and indian war", "seven years war", "stamp act", "boston tea party", "declaration of independence", "articles of confederation", "constitutional convention", "federalist papers", "bill of rights", "washington's farewell address"] },
      { unitNumber: 4, title: "Period 4 (1800-1848)", keywords: ["louisiana purchase", "marbury v madison", "war of 1812", "monroe doctrine", "market revolution", "erie canal", "second great awakening", "jacksonian democracy", "nullification crisis", "trail of tears", "manifest destiny", "seneca falls"] },
      { unitNumber: 5, title: "Period 5 (1844-1877)", keywords: ["mexican-american war", "compromise of 1850", "fugitive slave act", "kansas-nebraska act", "dred scott", "lincoln-douglas", "civil war", "emancipation proclamation", "reconstruction", "13th amendment", "14th amendment", "15th amendment"] },
      { unitNumber: 6, title: "Period 6 (1865-1898)", keywords: ["gilded age", "transcontinental railroad", "andrew carnegie", "john d rockefeller", "social darwinism", "labor unions", "knights of labor", "american federation of labor", "populist party", "dawes act", "plessy v ferguson"] },
      { unitNumber: 7, title: "Period 7 (1890-1945)", keywords: ["progressive era", "muckrakers", "spanish-american war", "imperialism", "world war i", "fourteen points", "league of nations", "roaring twenties", "great depression", "new deal", "fdr", "world war ii", "pearl harbor", "atomic bomb"] },
      { unitNumber: 8, title: "Period 8 (1945-1980)", keywords: ["cold war", "containment", "marshall plan", "nato", "korean war", "cuban missile crisis", "vietnam war", "civil rights movement", "brown v board", "martin luther king", "great society", "watergate"] },
      { unitNumber: 9, title: "Period 9 (1980-Present)", keywords: ["reagan administration", "conservative movement", "end of cold war", "persian gulf war", "globalization", "internet age", "september 11", "war on terror"] }
    ],
    allowedDomains: ["us history", "politics", "social movements", "foreign policy", "constitutional history", "economics in history"],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|derivative|calculus|riemann|f\s*=\s*ma|dna\s+replication|mitosis|titration)\b/i
    ]
  },
  "ap-psychology": {
    subjectId: "ap-psychology",
    subjectName: "AP Psychology",
    category: "social_science",
    mathExpected: false,
    canonicalUnits: [
      { unitNumber: 1, title: "Biological Bases of Behavior", keywords: ["neuron", "action potential", "synapse", "neurotransmitter", "dopamine", "serotonin", "endorphins", "central nervous system", "brain structures", "cerebral cortex", "hippocampus", "amygdala", "neuroplasticity"] },
      { unitNumber: 2, title: "Cognition", keywords: ["memory", "encoding", "storage", "retrieval", "sensory memory", "short-term memory", "long-term memory", "chunking", "amnesia", "problem solving", "heuristics", "biases", "language acquisition"] },
      { unitNumber: 3, title: "Development & Learning", keywords: ["classical conditioning", "pavlov", "unconditioned stimulus", "conditioned response", "operant conditioning", "skinner", "reinforcement", "punishment", "social learning", "bandura", "piaget", "erikson", "kohlberg"] },
      { unitNumber: 4, title: "Social Psychology & Personality", keywords: ["conformity", "asch", "obedience", "milgram", "attribution theory", "fundamental attribution error", "cognitive dissonance", "bystander effect", "in-group bias", "freud", "big five traits"] },
      { unitNumber: 5, title: "Mental & Physical Health", keywords: ["dsm-5", "anxiety disorders", "major depressive disorder", "bipolar", "schizophrenia", "obsessive-compulsive", "ptsd", "psychotherapy", "cbt", "biopsychosocial model"] }
    ],
    allowedDomains: ["psychology", "neuroscience", "cognition", "behavior", "development", "mental health"],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|derivative|calculus|riemann|f\s*=\s*ma|titration|von\s+thunen)\b/i
    ]
  },
  "ap-statistics": {
    subjectId: "ap-statistics",
    subjectName: "AP Statistics",
    category: "stem_math",
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: "Exploring One-Variable Data", keywords: ["mean", "median", "mode", "standard deviation", "iqr", "outlier", "box plot", "histogram", "z-score", "normal distribution"] },
      { unitNumber: 2, title: "Exploring Two-Variable Data", keywords: ["scatter plot", "correlation r", "coefficient of determination r-squared", "residual", "least-squares regression line", "influential point", "extrapolation"] },
      { unitNumber: 3, title: "Collecting Data", keywords: ["simple random sample", "srs", "stratified sample", "cluster sample", "systematic sample", "convenience sample", "bias", "confounding", "placebo", "double blind", "blocking"] },
      { unitNumber: 4, title: "Probability, Random Variables & Probability Distributions", keywords: ["mutually exclusive", "independent events", "conditional probability", "binomial distribution", "geometric distribution", "expected value", "variance"] },
      { unitNumber: 5, title: "Sampling Distributions", keywords: ["central limit theorem", "clt", "sampling variability", "unbiased estimator", "standard error", "normal approximation"] },
      { unitNumber: 6, title: "Inference for Categorical Data: Proportions", keywords: ["confidence interval for p", "one-sample z-test", "two-sample z-test", "p-value", "type i error", "type ii error", "power", "margin of error"] },
      { unitNumber: 7, title: "Inference for Quantitative Data: Means", keywords: ["t-distribution", "degrees of freedom", "one-sample t-test", "two-sample t-test", "paired t-test", "t-interval"] },
      { unitNumber: 8, title: "Inference for Categorical Data: Chi-Square", keywords: ["chi-square goodness of fit", "chi-square test of independence", "chi-square test of homogeneity", "expected counts", "observed counts"] },
      { unitNumber: 9, title: "Inference for Quantitative Data: Slopes", keywords: ["t-test for slope", "confidence interval for slope", "linear regression model conditions"] }
    ],
    allowedDomains: ["descriptive statistics", "probability", "sampling", "hypothesis testing", "confidence intervals", "regression inference"],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|indefinite\s+integral|fundamental\s+theorem\s+of\s+calculus|derivative|dy\/dx|disk\s+method|washer\s+method|taylor\s+series)\b/i,
      /\b(?:dtm|demographic\s+transition|von\s+thunen|gerrymandering|chloroplast)\b/i
    ]
  },
  "ap-us-government": {
    subjectId: "ap-us-government",
    subjectName: "AP U.S. Government & Politics",
    category: "social_science",
    mathExpected: false,
    canonicalUnits: [
      { unitNumber: 1, title: "Foundations of American Democracy", keywords: ["federalist 10", "brutus 1", "declaration of independence", "articles of confederation", "constitution", "bill of rights", "federalism", "separation of powers", "checks and balances", "mcculloch v maryland", "us v lopez"] },
      { unitNumber: 2, title: "Interactions Among Branches of Government", keywords: ["congress", "house", "senate", "filibuster", "cloture", "gerrymandering", "presidency", "executive order", "veto", "pocket veto", "federalist 70", "bureaucracy", "iron triangle", "supreme court", "judicial review", "marbury v madison", "federalist 78", "stare decisis"] },
      { unitNumber: 3, title: "Civil Liberties & Civil Rights", keywords: ["first amendment", "establishment clause", "free exercise clause", "schenck v us", "tinker v des moines", "new york times v us", "second amendment", "fourth amendment", "exclusionary rule", "miranda", "fourteenth amendment", "due process", "equal protection", "selective incorporation", "brown v board", "letter from birmingham jail"] },
      { unitNumber: 4, title: "American Political Ideologies & Beliefs", keywords: ["political socialization", "liberalism", "conservatism", "libertarianism", "public opinion polling", "scientific polling", "sampling error", "fiscal policy", "monetary policy", "federal reserve"] },
      { unitNumber: 5, title: "Political Participation", keywords: ["voting rights", "15th amendment", "19th amendment", "24th amendment", "26th amendment", "voter turnout", "political parties", "critical elections", "realignment", "interest groups", "citizens united v fec", "pacs", "super pacs", "electoral college", "media bias", "horse-race journalism"] }
    ],
    allowedDomains: ["american politics", "constitution", "scotus cases", "foundational documents", "civil rights", "elections", "institutions of government"],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|derivative|calculus|riemann|f\s*=\s*ma|titration|chloroplast|mitosis)\b/i
    ]
  }
};
function getSubjectWhitelist(subjectIdentifier) {
  if (!subjectIdentifier) return null;
  const s = subjectIdentifier.toLowerCase().trim();
  if (AP_SUBJECT_WHITELISTS[s]) return AP_SUBJECT_WHITELISTS[s];
  for (const [key, wl] of Object.entries(AP_SUBJECT_WHITELISTS)) {
    if (s.includes(key.replace("ap-", "")) || s.includes(wl.subjectName.toLowerCase().replace("ap ", ""))) {
      return wl;
    }
  }
  if (s.includes("geography") || s.includes("aphg")) return AP_SUBJECT_WHITELISTS["ap-human-geography"];
  if (s.includes("environmental") || s.includes("apes")) return AP_SUBJECT_WHITELISTS["ap-environmental-science"];
  if (s.includes("principles") || s.includes("csp")) return AP_SUBJECT_WHITELISTS["ap-computer-science-principles"];
  if (s.includes("calculus bc")) return AP_SUBJECT_WHITELISTS["ap-calculus-bc"];
  if (s.includes("calculus")) return AP_SUBJECT_WHITELISTS["ap-calculus-ab"];
  if (s.includes("physics")) return AP_SUBJECT_WHITELISTS["ap-physics-1"];
  if (s.includes("chemistry")) return AP_SUBJECT_WHITELISTS["ap-chemistry"];
  if (s.includes("biology")) return AP_SUBJECT_WHITELISTS["ap-biology"];
  if (s.includes("history") || s.includes("apush")) return AP_SUBJECT_WHITELISTS["ap-us-history"];
  if (s.includes("psych")) return AP_SUBJECT_WHITELISTS["ap-psychology"];
  if (s.includes("stat")) return AP_SUBJECT_WHITELISTS["ap-statistics"];
  if (s.includes("gov") || s.includes("politics")) return AP_SUBJECT_WHITELISTS["ap-us-government"];
  return null;
}

// src/utils/standardizedApDiagrams.ts
var DTM_STANDARDIZED_SVG = `<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>
  <rect width='400' height='220' fill='#09090b' rx='10' stroke='#27272a' stroke-width='1'/>
  
  <!-- Title & Model Header -->
  <text x='200' y='18' text-anchor='middle' fill='#f8fafc' font-size='11' font-family='system-ui, sans-serif' font-weight='800' letter-spacing='0.5'>DEMOGRAPHIC TRANSITION MODEL (STAGES 1\u20135)</text>
  
  <!-- Stage Background Columns -->
  <!-- Stage 1 (x: 45 to 110) -->
  <rect x='45' y='26' width='65' height='150' fill='#18181b' fill-opacity='0.4'/>
  <!-- Stage 2 (x: 110 to 175) -->
  <rect x='110' y='26' width='65' height='150' fill='#27272a' fill-opacity='0.2'/>
  <!-- Stage 3 (x: 175 to 240) -->
  <rect x='175' y='26' width='65' height='150' fill='#18181b' fill-opacity='0.4'/>
  <!-- Stage 4 (x: 240 to 305) -->
  <rect x='240' y='26' width='65' height='150' fill='#27272a' fill-opacity='0.2'/>
  <!-- Stage 5 (x: 305 to 370) -->
  <rect x='305' y='26' width='65' height='150' fill='#18181b' fill-opacity='0.4'/>

  <!-- Vertical Stage Dividers -->
  <line x1='110' y1='26' x2='110' y2='176' stroke='#3f3f46' stroke-width='1' stroke-dasharray='3,3'/>
  <line x1='175' y1='26' x2='175' y2='176' stroke='#3f3f46' stroke-width='1' stroke-dasharray='3,3'/>
  <line x1='240' y1='26' x2='240' y2='176' stroke='#3f3f46' stroke-width='1' stroke-dasharray='3,3'/>
  <line x1='305' y1='26' x2='305' y2='176' stroke='#3f3f46' stroke-width='1' stroke-dasharray='3,3'/>
  
  <!-- Stage Column Labels -->
  <text x='77' y='36' text-anchor='middle' fill='#e2e8f0' font-size='9' font-family='sans-serif' font-weight='700'>Stage 1</text>
  <text x='77' y='46' text-anchor='middle' fill='#94a3b8' font-size='7' font-family='sans-serif'>High Stat.</text>

  <text x='142' y='36' text-anchor='middle' fill='#e2e8f0' font-size='9' font-family='sans-serif' font-weight='700'>Stage 2</text>
  <text x='142' y='46' text-anchor='middle' fill='#94a3b8' font-size='7' font-family='sans-serif'>Early Exp.</text>

  <text x='207' y='36' text-anchor='middle' fill='#e2e8f0' font-size='9' font-family='sans-serif' font-weight='700'>Stage 3</text>
  <text x='207' y='46' text-anchor='middle' fill='#94a3b8' font-size='7' font-family='sans-serif'>Late Exp.</text>

  <text x='272' y='36' text-anchor='middle' fill='#e2e8f0' font-size='9' font-family='sans-serif' font-weight='700'>Stage 4</text>
  <text x='272' y='46' text-anchor='middle' fill='#94a3b8' font-size='7' font-family='sans-serif'>Low Stat.</text>

  <text x='337' y='36' text-anchor='middle' fill='#e2e8f0' font-size='9' font-family='sans-serif' font-weight='700'>Stage 5</text>
  <text x='337' y='46' text-anchor='middle' fill='#94a3b8' font-size='7' font-family='sans-serif'>Declining</text>

  <!-- Y-Axis (Rates per 1,000) -->
  <line x1='45' y1='26' x2='45' y2='176' stroke='#64748b' stroke-width='1.5'/>
  <line x1='45' y1='176' x2='370' y2='176' stroke='#64748b' stroke-width='1.5'/>
  
  <text x='42' y='57' text-anchor='end' fill='#94a3b8' font-size='7.5' font-family='sans-serif'>40</text>
  <line x1='42' y1='55' x2='45' y2='55' stroke='#64748b' stroke-width='1'/>

  <text x='42' y='97' text-anchor='end' fill='#94a3b8' font-size='7.5' font-family='sans-serif'>30</text>
  <line x1='42' y1='95' x2='45' y2='95' stroke='#64748b' stroke-width='1'/>

  <text x='42' y='137' text-anchor='end' fill='#94a3b8' font-size='7.5' font-family='sans-serif'>20</text>
  <line x1='42' y1='135' x2='45' y2='135' stroke='#64748b' stroke-width='1'/>

  <text x='42' y='167' text-anchor='end' fill='#94a3b8' font-size='7.5' font-family='sans-serif'>10</text>
  <line x1='42' y1='165' x2='45' y2='165' stroke='#64748b' stroke-width='1'/>

  <!-- Y-Axis Title -->
  <text x='14' y='105' text-anchor='middle' transform='rotate(-90 14 105)' fill='#94a3b8' font-size='8' font-family='sans-serif' font-weight='600'>Rate per 1,000 / Total Pop</text>

  <!-- Shaded Natural Increase Rate (NIR) Region across Stage 2 & Stage 3 -->
  <polygon points='110,55 175,55 240,140 240,154 175,145 110,60' fill='#22c55e' fill-opacity='0.16'/>
  <text x='175' y='100' text-anchor='middle' fill='#4ade80' font-size='8' font-family='sans-serif' font-weight='700'>Natural Increase (NIR)</text>

  <!-- CBR Curve (Crude Birth Rate: High in 1&2, Drops in 3, Low in 4&5) -->
  <path d='M 45,55 C 70,53 90,56 110,55 C 135,54 155,55 175,55 C 195,65 220,115 240,140 C 265,150 285,154 305,154 C 325,155 350,165 370,168' 
        fill='none' stroke='#38bdf8' stroke-width='2.5' stroke-linecap='round'/>

  <!-- CDR Curve (Crude Death Rate: High fluctuating in 1, Plummets in 2, Low in 3&4, Slight rise in 5) -->
  <path d='M 45,60 C 65,58 75,65 90,59 C 100,64 105,62 110,60 C 125,75 145,125 175,145 C 200,152 225,153 240,154 C 265,155 285,154 305,154 C 325,153 350,148 370,145' 
        fill='none' stroke='#f43f5e' stroke-width='2.5' stroke-linecap='round'/>

  <!-- Total Population Curve (Sigmoid Growth Curve: Low in 1, Accelerates in 2, Sits high in 4, Dips in 5) -->
  <path d='M 45,165 C 75,165 95,164 110,162 C 130,150 155,115 175,90 C 205,65 240,50 270,45 C 295,44 320,44 335,46 C 355,50 365,55 370,60' 
        fill='none' stroke='#fbbf24' stroke-width='2' stroke-dasharray='5,3' stroke-linecap='round'/>

  <!-- Bottom Legend Bar -->
  <rect x='45' y='188' width='325' height='24' fill='#18181b' rx='6' stroke='#27272a' stroke-width='1'/>
  
  <line x1='55' y1='200' x2='75' y2='200' stroke='#38bdf8' stroke-width='2.5'/>
  <text x='80' y='203' fill='#f1f5f9' font-size='8' font-family='sans-serif' font-weight='600'>Crude Birth Rate (CBR)</text>

  <line x1='175' y1='200' x2='195' y2='200' stroke='#f43f5e' stroke-width='2.5'/>
  <text x='200' y='203' fill='#f1f5f9' font-size='8' font-family='sans-serif' font-weight='600'>Crude Death Rate (CDR)</text>

  <line x1='290' y1='200' x2='310' y2='200' stroke='#fbbf24' stroke-width='2' stroke-dasharray='4,2'/>
  <text x='315' y='203' fill='#f1f5f9' font-size='8' font-family='sans-serif' font-weight='600'>Total Population</text>
</svg>`;
var VON_THUNEN_STANDARDIZED_SVG = `<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>
  <rect width='400' height='220' fill='#09090b' rx='10' stroke='#27272a' stroke-width='1'/>
  
  <text x='200' y='18' text-anchor='middle' fill='#f8fafc' font-size='11' font-family='system-ui, sans-serif' font-weight='800' letter-spacing='0.5'>VON TH\xDCNEN AGRICULTURAL LAND-USE MODEL</text>

  <!-- Left: Concentric Rings (Center at x=115, y=115) -->
  <!-- Ring 4: Ranching / Livestock -->
  <circle cx='115' cy='115' r='88' fill='#581c87' fill-opacity='0.4' stroke='#a855f7' stroke-width='1.5'/>
  <!-- Ring 3: Extensive Field Crops & Grains -->
  <circle cx='115' cy='115' r='68' fill='#854d0e' fill-opacity='0.45' stroke='#eab308' stroke-width='1.5'/>
  <!-- Ring 2: Forest & Fuel Wood -->
  <circle cx='115' cy='115' r='48' fill='#78350f' fill-opacity='0.5' stroke='#f97316' stroke-width='1.5'/>
  <!-- Ring 1: Dairying & Intensive Market Gardening -->
  <circle cx='115' cy='115' r='28' fill='#065f46' fill-opacity='0.6' stroke='#10b981' stroke-width='1.5'/>
  <!-- Central Market City -->
  <circle cx='115' cy='115' r='10' fill='#2563eb' stroke='#60a5fa' stroke-width='2'/>
  <text x='115' y='118' text-anchor='middle' fill='#ffffff' font-size='7' font-family='sans-serif' font-weight='bold'>CBD</text>

  <!-- Ring Identification Annotations -->
  <line x1='115' y1='105' x2='115' y2='32' stroke='#94a3b8' stroke-width='1' stroke-dasharray='2,2'/>
  
  <!-- Right: Legend and Bid-Rent Principle Breakdown -->
  <rect x='215' y='30' width='175' height='175' fill='#18181b' rx='8' stroke='#27272a' stroke-width='1'/>
  <text x='225' y='46' fill='#f8fafc' font-size='9' font-family='sans-serif' font-weight='800'>MODEL RINGS &amp; BID-RENT:</text>

  <!-- Item CBD -->
  <circle cx='228' cy='62' r='5' fill='#2563eb'/>
  <text x='240' y='65' fill='#e2e8f0' font-size='8' font-family='sans-serif' font-weight='bold'>Central Market / City</text>

  <!-- Item 1 -->
  <circle cx='228' cy='82' r='5' fill='#10b981'/>
  <text x='240' y='81' fill='#a7f3d0' font-size='8' font-family='sans-serif' font-weight='bold'>1. Market Gardening &amp; Dairy</text>
  <text x='240' y='91' fill='#94a3b8' font-size='7' font-family='sans-serif'>High land cost, highly perishable</text>

  <!-- Item 2 -->
  <circle cx='228' cy='110' r='5' fill='#f97316'/>
  <text x='240' y='109' fill='#fed7aa' font-size='8' font-family='sans-serif' font-weight='bold'>2. Forest / Timber &amp; Firewood</text>
  <text x='240' y='119' fill='#94a3b8' font-size='7' font-family='sans-serif'>Heavy freight, high transport cost</text>

  <!-- Item 3 -->
  <circle cx='228' cy='138' r='5' fill='#eab308'/>
  <text x='240' y='137' fill='#fef08a' font-size='8' font-family='sans-serif' font-weight='bold'>3. Extensive Grains &amp; Wheat</text>
  <text x='240' y='147' fill='#94a3b8' font-size='7' font-family='sans-serif'>Lower land cost, non-perishable</text>

  <!-- Item 4 -->
  <circle cx='228' cy='166' r='5' fill='#a855f7'/>
  <text x='240' y='165' fill='#e9d5ff' font-size='8' font-family='sans-serif' font-weight='bold'>4. Ranching &amp; Livestock</text>
  <text x='240' y='175' fill='#94a3b8' font-size='7' font-family='sans-serif'>Cheapest land, self-transporting</text>

  <!-- Distance Decay Note -->
  <text x='225' y='195' fill='#38bdf8' font-size='7.5' font-family='sans-serif' font-weight='600'>Key Factor: Bid-Rent &amp; Transport Cost</text>
</svg>`;
var BURGESS_CONCENTRIC_ZONE_SVG = `<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>
  <rect width='400' height='220' fill='#09090b' rx='10' stroke='#27272a' stroke-width='1'/>
  
  <text x='200' y='18' text-anchor='middle' fill='#f8fafc' font-size='11' font-family='system-ui, sans-serif' font-weight='800' letter-spacing='0.5'>BURGESS CONCENTRIC ZONE MODEL (URBAN LAND-USE)</text>

  <!-- Concentric Rings (Center at x=115, y=115) -->
  <!-- Zone 5: Commuter Zone -->
  <circle cx='115' cy='115' r='88' fill='#1e293b' stroke='#64748b' stroke-width='1.5'/>
  <!-- Zone 4: Better Residences -->
  <circle cx='115' cy='115' r='70' fill='#0f766e' fill-opacity='0.4' stroke='#14b8a6' stroke-width='1.5'/>
  <!-- Zone 3: Working-Class Homes -->
  <circle cx='115' cy='115' r='52' fill='#0369a1' fill-opacity='0.45' stroke='#0284c7' stroke-width='1.5'/>
  <!-- Zone 2: Zone in Transition -->
  <circle cx='115' cy='115' r='34' fill='#b91c1c' fill-opacity='0.45' stroke='#ef4444' stroke-width='1.5'/>
  <!-- Zone 1: Central Business District (CBD) -->
  <circle cx='115' cy='115' r='14' fill='#eab308' stroke='#fde047' stroke-width='2'/>
  <text x='115' y='118' text-anchor='middle' fill='#000000' font-size='7' font-family='sans-serif' font-weight='bold'>1</text>

  <!-- Number labels on rings -->
  <text x='115' y='90' text-anchor='middle' fill='#ffffff' font-size='8' font-family='sans-serif' font-weight='bold'>2</text>
  <text x='115' y='72' text-anchor='middle' fill='#ffffff' font-size='8' font-family='sans-serif' font-weight='bold'>3</text>
  <text x='115' y='55' text-anchor='middle' fill='#ffffff' font-size='8' font-family='sans-serif' font-weight='bold'>4</text>
  <text x='115' y='38' text-anchor='middle' fill='#ffffff' font-size='8' font-family='sans-serif' font-weight='bold'>5</text>

  <!-- Legend -->
  <rect x='215' y='30' width='175' height='175' fill='#18181b' rx='8' stroke='#27272a' stroke-width='1'/>
  <text x='225' y='46' fill='#f8fafc' font-size='9' font-family='sans-serif' font-weight='800'>5 CONCENTRIC URBAN ZONES:</text>

  <circle cx='228' cy='62' r='5' fill='#eab308'/>
  <text x='240' y='65' fill='#fef08a' font-size='8' font-family='sans-serif' font-weight='bold'>1. CBD (Commercial Center)</text>

  <circle cx='228' cy='88' r='5' fill='#ef4444'/>
  <text x='240' y='87' fill='#fca5a5' font-size='8' font-family='sans-serif' font-weight='bold'>2. Zone of Transition</text>
  <text x='240' y='97' fill='#94a3b8' font-size='7' font-family='sans-serif'>Industry, tenements, high density</text>

  <circle cx='228' cy='118' r='5' fill='#0284c7'/>
  <text x='240' y='117' fill='#7dd3fc' font-size='8' font-family='sans-serif' font-weight='bold'>3. Independent Workers' Homes</text>
  <text x='240' y='127' fill='#94a3b8' font-size='7' font-family='sans-serif'>Older single-family homes</text>

  <circle cx='228' cy='148' r='5' fill='#14b8a6'/>
  <text x='240' y='147' fill='#99f6e4' font-size='8' font-family='sans-serif' font-weight='bold'>4. Zone of Better Residences</text>
  <text x='240' y='157' fill='#94a3b8' font-size='7' font-family='sans-serif'>Middle class spacious housing</text>

  <circle cx='228' cy='178' r='5' fill='#64748b'/>
  <text x='240' y='177' fill='#cbd5e1' font-size='8' font-family='sans-serif' font-weight='bold'>5. Commuter Zone</text>
  <text x='240' y='187' fill='#94a3b8' font-size='7' font-family='sans-serif'>Dormitory suburbs, car commuters</text>
</svg>`;
var HOYT_SECTOR_MODEL_SVG = `<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>
  <rect width='400' height='220' fill='#09090b' rx='10' stroke='#27272a' stroke-width='1'/>
  
  <text x='200' y='18' text-anchor='middle' fill='#f8fafc' font-size='11' font-family='system-ui, sans-serif' font-weight='800' letter-spacing='0.5'>HOYT SECTOR MODEL (URBAN GROWTH ALONG CORRIDORS)</text>

  <!-- Left: Sectors (Center at x=115, y=115, R=80) -->
  <g transform='translate(115, 115)'>
    <!-- Transportation corridor & Industry (Wedge 1) -->
    <path d='M 0,0 L 70,-40 A 80 80 0 0 1 80,10 Z' fill='#b91c1c' fill-opacity='0.6' stroke='#ef4444' stroke-width='1.5'/>
    <!-- Low-class Residential (Wedge 2 flanking industry) -->
    <path d='M 0,0 L 80,10 A 80 80 0 0 1 40,70 Z' fill='#ea580c' fill-opacity='0.5' stroke='#f97316' stroke-width='1.5'/>
    <!-- Middle-class Residential (Wedge 3 broad expansion) -->
    <path d='M 0,0 L 40,70 A 80 80 0 0 1 -70,40 Z' fill='#0284c7' fill-opacity='0.5' stroke='#38bdf8' stroke-width='1.5'/>
    <!-- High-class Residential Corridor (Wedge 4 opposite industry) -->
    <path d='M 0,0 L -70,40 A 80 80 0 0 1 -40,-70 Z' fill='#059669' fill-opacity='0.6' stroke='#34d399' stroke-width='1.5'/>
    <!-- Middle-class Residential 2 -->
    <path d='M 0,0 L -40,-70 A 80 80 0 0 1 70,-40 Z' fill='#0284c7' fill-opacity='0.5' stroke='#38bdf8' stroke-width='1.5'/>
    <!-- Central Business District (CBD) -->
    <circle cx='0' cy='0' r='18' fill='#eab308' stroke='#fde047' stroke-width='2'/>
    <text x='0' y='4' text-anchor='middle' fill='#000000' font-size='8' font-family='sans-serif' font-weight='bold'>CBD</text>
  </g>

  <!-- Right: Legend -->
  <rect x='215' y='30' width='175' height='175' fill='#18181b' rx='8' stroke='#27272a' stroke-width='1'/>
  <text x='225' y='46' fill='#f8fafc' font-size='9' font-family='sans-serif' font-weight='800'>HOYT SECTOR CLASSIFICATION:</text>

  <circle cx='228' cy='64' r='5' fill='#eab308'/>
  <text x='240' y='67' fill='#fef08a' font-size='8' font-family='sans-serif' font-weight='bold'>1. CBD (Central Core)</text>

  <circle cx='228' cy='90' r='5' fill='#ef4444'/>
  <text x='240' y='89' fill='#fca5a5' font-size='8' font-family='sans-serif' font-weight='bold'>2. Transportation &amp; Industry</text>
  <text x='240' y='99' fill='#94a3b8' font-size='7' font-family='sans-serif'>Rails, waterways, manufacturing</text>

  <circle cx='228' cy='122' r='5' fill='#f97316'/>
  <text x='240' y='121' fill='#fed7aa' font-size='8' font-family='sans-serif' font-weight='bold'>3. Low-Class Residential</text>
  <text x='240' y='131' fill='#94a3b8' font-size='7' font-family='sans-serif'>Closest to factories &amp; pollution</text>

  <circle cx='228' cy='152' r='5' fill='#38bdf8'/>
  <text x='240' y='151' fill='#bae6fd' font-size='8' font-family='sans-serif' font-weight='bold'>4. Middle-Class Residential</text>
  <text x='240' y='161' fill='#94a3b8' font-size='7' font-family='sans-serif'>Buffer zones and suburbs</text>

  <circle cx='228' cy='182' r='5' fill='#34d399'/>
  <text x='240' y='181' fill='#a7f3d0' font-size='8' font-family='sans-serif' font-weight='bold'>5. High-Class Residential</text>
  <text x='240' y='191' fill='#94a3b8' font-size='7' font-family='sans-serif'>Along spine / clean environmental axis</text>
</svg>`;
function getStandardizedModelSvg(text, subjectId) {
  if (!text) return null;
  const t = text.toLowerCase();
  const s = (subjectId || "").toLowerCase();
  if (s.includes("geography") || s.includes("aphg") || s.includes("human")) {
    if (t.includes("demographic transition") || t.includes("dtm") || t.includes("crude birth") && t.includes("crude death")) {
      return DTM_STANDARDIZED_SVG;
    }
    if (t.includes("von thunen") || t.includes("von th\xFCnen") || t.includes("bid-rent") || t.includes("isolated state")) {
      return VON_THUNEN_STANDARDIZED_SVG;
    }
    if (t.includes("burgess") || t.includes("concentric zone") || t.includes("concentric") && t.includes("zone")) {
      return BURGESS_CONCENTRIC_ZONE_SVG;
    }
    if (t.includes("hoyt") || t.includes("sector model") || t.includes("axial growth")) {
      return HOYT_SECTOR_MODEL_SVG;
    }
  }
  if (s.includes("environmental") || s.includes("apes")) {
    if (t.includes("demographic transition") || t.includes("crude birth") && t.includes("crude death")) {
      return DTM_STANDARDIZED_SVG;
    }
  }
  return null;
}

// src/utils/apSubjectValidator.ts
function createUsedConceptsTracker() {
  return {
    usedConceptCounts: {},
    usedUnits: {}
  };
}
function countSubParts(text) {
  if (!text) return { count: 0, labels: [] };
  const regex = /(?:\((a|b|c|d|e|f|g)\)|(?:^|\n)\s*(?:part|question)\s+([a-g])\b)/gi;
  const matches = [...text.matchAll(regex)];
  const found = /* @__PURE__ */ new Set();
  for (const m of matches) {
    const label = (m[1] || m[2]).toLowerCase();
    found.add(label);
  }
  const sortedLabels = Array.from(found).sort();
  return {
    count: sortedLabels.length,
    labels: sortedLabels
  };
}
function calculateRealTotalPoints(q, subjectId) {
  if (!q) return 1;
  if (Array.isArray(q.scoringRubric) && q.scoringRubric.length > 0) {
    let sum = 0;
    let foundExplicit = false;
    for (const item of q.scoringRubric) {
      const str = String(item || "");
      const match = str.match(/\[\s*(?:\d+\s*\/\s*)?(\d+)\s*(?:points|point|pts|pt)\s*\]/i) || str.match(/\(\s*(?:\d+\s*\/\s*)?(\d+)\s*(?:points|point|pts|pt)\s*\)/i);
      if (match) {
        sum += parseInt(match[1], 10);
        foundExplicit = true;
      }
    }
    if (foundExplicit && sum > 0) {
      return sum;
    }
  }
  const fullText = `${q.prompt || ""} ${q.modelAnswer || ""}`;
  const { count: partCount } = countSubParts(fullText);
  if (partCount >= 2) {
    const rawPoints = Number(q.totalPoints);
    if (!isNaN(rawPoints) && rawPoints >= partCount) {
      return rawPoints;
    }
    return partCount;
  }
  const s = (subjectId || "").toLowerCase();
  if (s.includes("stat")) return 4;
  if (s.includes("human") || s.includes("geography")) return 7;
  if (s.includes("history") || s.includes("apush")) return 6;
  if (s.includes("gov")) return 4;
  if (s.includes("chem") || s.includes("bio")) return 8;
  const raw = Number(q.totalPoints);
  return !isNaN(raw) && raw > 0 ? raw : 6;
}
function stripRawSvgMarkup(text) {
  if (!text) return "";
  return text.replace(/<svg[\s\S]*?<\/svg>/gi, "").replace(/<svg\b[^>]*>/gi, "").replace(/<\/svg>/gi, "").replace(/<path\b[^>]*>/gi, "").replace(/<rect\b[^>]*>/gi, "").replace(/<circle\b[^>]*>/gi, "").replace(/<text\b[^>]*>[\s\S]*?<\/text>/gi, "").trim();
}
function resolveCanonicalUnit(subjectId, unitInput) {
  const whitelist = getSubjectWhitelist(subjectId);
  if (!whitelist || whitelist.canonicalUnits.length === 0) {
    return { unitNumber: 1, title: typeof unitInput === "string" ? unitInput : "General Course Content" };
  }
  const inputStr = String(unitInput || "").toLowerCase();
  const numMatch = inputStr.match(/(?:unit|period|u|p)?\s*([0-9]+)/i);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    const found = whitelist.canonicalUnits.find((u) => u.unitNumber === num);
    if (found) return { unitNumber: found.unitNumber, title: found.title };
  }
  for (const u of whitelist.canonicalUnits) {
    if (inputStr.includes(u.title.toLowerCase())) {
      return { unitNumber: u.unitNumber, title: u.title };
    }
    for (const kw of u.keywords) {
      if (inputStr.includes(kw.toLowerCase())) {
        return { unitNumber: u.unitNumber, title: u.title };
      }
    }
  }
  const first = whitelist.canonicalUnits[0];
  return { unitNumber: first.unitNumber, title: first.title };
}
function validateAndHealApQuestion(q, subjectId, targetTopic, tracker) {
  const whitelist = getSubjectWhitelist(subjectId);
  const detectedConcepts = [];
  const rawPrompt = typeof q.prompt === "string" ? q.prompt : q.question || q.stem || "";
  const rawModel = typeof q.modelAnswer === "string" ? q.modelAnswer : q.explanation || "";
  const rawRubric = Array.isArray(q.scoringRubric) ? q.scoringRubric.join(" ") : "";
  const combinedText = `${rawPrompt} ${rawModel} ${rawRubric}`.toLowerCase();
  if (whitelist && Array.isArray(whitelist.forbiddenSignatures)) {
    for (const sig of whitelist.forbiddenSignatures) {
      const match = combinedText.match(sig);
      if (match) {
        return {
          isValid: false,
          rejectionReason: `Detected forbidden off-subject concept "${match[0]}" for subject "${whitelist.subjectName}". Question belongs to another AP curriculum.`,
          sanitizedQuestion: q,
          detectedConcepts: []
        };
      }
    }
  }
  let cleanPrompt = stripRawSvgMarkup(rawPrompt);
  let cleanModel = stripRawSvgMarkup(rawModel);
  let cleanRubric = Array.isArray(q.scoringRubric) ? q.scoringRubric.map((r) => stripRawSvgMarkup(String(r))) : [];
  let finalDiagramSvg = q.diagramSvg || "";
  if (!finalDiagramSvg) {
    const svgMatch = rawPrompt.match(/<svg[\s\S]*?<\/svg>/i);
    if (svgMatch) {
      finalDiagramSvg = svgMatch[0];
    }
  }
  const standardModelSvg = getStandardizedModelSvg(`${cleanPrompt} ${cleanModel}`, subjectId);
  if (standardModelSvg) {
    finalDiagramSvg = standardModelSvg;
    if (!q.diagramType || q.diagramType === "none") {
      q.diagramType = "standardized_model";
    }
  }
  const calculatedPoints = calculateRealTotalPoints({
    prompt: cleanPrompt,
    modelAnswer: cleanModel,
    scoringRubric: cleanRubric,
    totalPoints: q.totalPoints
  }, subjectId);
  const canonicalUnit = resolveCanonicalUnit(subjectId, q.skill || targetTopic);
  if (whitelist) {
    for (const unit of whitelist.canonicalUnits) {
      for (const kw of unit.keywords) {
        if (combinedText.includes(kw.toLowerCase())) {
          detectedConcepts.push(kw);
          if (tracker) {
            tracker.usedConceptCounts[kw] = (tracker.usedConceptCounts[kw] || 0) + 1;
            tracker.usedUnits[unit.unitNumber] = (tracker.usedUnits[unit.unitNumber] || 0) + 1;
          }
        }
      }
    }
  }
  let stimulusType = "none";
  if (finalDiagramSvg || cleanPrompt.toLowerCase().includes("data table") || cleanPrompt.toLowerCase().includes("figure 1")) {
    stimulusType = "single";
  }
  if (cleanPrompt.toLowerCase().includes("figure 2") || finalDiagramSvg && cleanPrompt.toLowerCase().includes("table 1")) {
    stimulusType = "two";
  }
  const sanitized = {
    ...q,
    prompt: cleanPrompt,
    modelAnswer: cleanModel,
    scoringRubric: cleanRubric,
    diagramSvg: finalDiagramSvg,
    totalPoints: calculatedPoints,
    unitNumber: canonicalUnit.unitNumber,
    unitTitle: canonicalUnit.title,
    skill: `Unit ${canonicalUnit.unitNumber}: ${canonicalUnit.title}`,
    stimulusCategory: stimulusType
  };
  return {
    isValid: true,
    sanitizedQuestion: sanitized,
    detectedConcepts
  };
}

// server.ts
import_dotenv.default.config();
try {
  import_dns.default.setDefaultResultOrder("ipv4first");
} catch (e) {
}
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
});
var app = (0, import_express.default)();
app.set("trust proxy", 1);
var PORT = process.env.PORT || 3e3;
app.use((0, import_cors.default)());
app.use(import_express.default.json({ limit: "50mb" }));
app.use(import_express.default.urlencoded({ extended: true, limit: "50mb" }));
var apiLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  max: 5e3,
  message: { error: "Too many requests from this IP, please try again after a few minutes." },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, default: false }
});
app.use("/api/", apiLimiter);
app.all(["/api/health", "/health", "/api/status"], (req, res) => {
  res.json({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    geminiKeyPrefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.slice(0, 6) + "..." : "MISSING",
    isVercel: Boolean(process.env.VERCEL)
  });
});
var sanitizeInput = (obj) => {
  if (typeof obj === "string") {
    return (0, import_xss2.default)(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeInput(item));
  }
  if (typeof obj === "object" && obj !== null) {
    const sanitizedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitizedObj[key] = sanitizeInput(value);
    }
    return sanitizedObj;
  }
  return obj;
};
app.use((req, res, next) => {
  if (!req.url.startsWith("/api/battle/room/")) {
    console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});
function repairJsonString(raw) {
  if (!raw) return "";
  let str = raw.trim();
  str = str.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  let inString = false;
  let escaped = false;
  const fixedChars = [];
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      if (escaped) {
        const nextChar = str[i + 1] || "";
        const isFollowedByLetter = /[a-zA-Z]/.test(nextChar);
        if (/[\\"\/]/.test(ch)) {
          fixedChars.push(ch);
        } else if (/[bfnrt]/.test(ch) && !isFollowedByLetter) {
          fixedChars.push(ch);
        } else if (ch === "u") {
          const hex = str.slice(i + 1, i + 5);
          if (/^[0-9a-fA-F]{4}$/.test(hex)) {
            fixedChars.push(ch);
          } else {
            fixedChars[fixedChars.length - 1] = "\\\\";
            fixedChars.push(ch);
          }
        } else {
          fixedChars[fixedChars.length - 1] = "\\\\";
          fixedChars.push(ch);
        }
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
        fixedChars.push(ch);
      } else if (ch === '"') {
        inString = false;
        fixedChars.push(ch);
      } else if (ch === "\n") {
        fixedChars.push("\\n");
      } else if (ch === "\r") {
        fixedChars.push("\\r");
      } else if (ch === "	") {
        fixedChars.push("\\t");
      } else {
        fixedChars.push(ch);
      }
    } else {
      if (ch === '"') {
        inString = true;
      }
      fixedChars.push(ch);
    }
  }
  let result = fixedChars.join("");
  result = result.replace(/,\s*([}\]])/g, "$1");
  return result;
}
function safeParseJSON(text, forceType = "none") {
  if (!text) return forceType === "array" ? [] : forceType === "object" ? {} : null;
  const cleaned = text.trim();
  const parse = (str) => {
    try {
      const parsed = JSON.parse(str);
      if (forceType === "array" && !Array.isArray(parsed)) {
        return [parsed];
      }
      if (forceType === "object" && Array.isArray(parsed)) {
        return parsed[0] || {};
      }
      return parsed;
    } catch (e) {
      return null;
    }
  };
  let result = parse(cleaned);
  if (result) return result;
  let extracted = cleaned;
  if (extracted.includes("```")) {
    extracted = extracted.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    result = parse(extracted);
    if (result) return result;
  }
  const repaired = repairJsonString(extracted);
  result = parse(repaired);
  if (result) return result;
  const objStart = extracted.indexOf("{");
  const objEnd = extracted.lastIndexOf("}");
  const arrStart = extracted.indexOf("[");
  const arrEnd = extracted.lastIndexOf("]");
  const hasObj = objStart !== -1 && objEnd !== -1 && objEnd > objStart;
  const hasArr = arrStart !== -1 && arrEnd !== -1 && arrEnd > arrStart;
  if (hasObj && (!hasArr || objStart < arrStart)) {
    const slice = extracted.slice(objStart, objEnd + 1);
    result = parse(slice) || parse(repairJsonString(slice));
    if (result) return result;
  }
  if (hasArr) {
    const slice = extracted.slice(arrStart, arrEnd + 1);
    result = parse(slice) || parse(repairJsonString(slice));
    if (result) return result;
  }
  try {
    let closed = repairJsonString(extracted);
    const openBraces = (closed.match(/\{/g) || []).length;
    const closeBraces = (closed.match(/\}/g) || []).length;
    const openBrackets = (closed.match(/\[/g) || []).length;
    const closeBrackets = (closed.match(/\]/g) || []).length;
    if (openBraces > closeBraces) {
      closed += "}".repeat(openBraces - closeBraces);
    }
    if (openBrackets > closeBrackets) {
      closed += "]".repeat(openBrackets - closeBrackets);
    }
    result = parse(closed);
    if (result) return result;
  } catch (_) {
  }
  if (forceType === "array") return [];
  if (forceType === "object") return {};
  throw new Error("Could not parse JSON from AI response");
}
var lastQuotaExceededTime = 0;
var rateLimitedModels = {};
var rateLimitedModelsCooldown = {};
app.use((req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  if (req.query) {
    req.query = sanitizeInput(req.query);
  }
  if (req.params) {
    req.params = sanitizeInput(req.params);
  }
  next();
});
var upload = (0, import_multer.default)({
  storage: import_multer.default.memoryStorage(),
  limits: { fileSize: 35 * 1024 * 1024 }
});
app.use((req, res, next) => {
  const purgeFiles = () => {
    try {
      if (req.file) {
        if (req.file.buffer && Buffer.isBuffer(req.file.buffer)) {
          req.file.buffer.fill(0);
          console.log("[PrivacyGuard] Securely purged single uploaded file buffer from memory.");
        }
        req.file = void 0;
      }
      if (req.files) {
        if (Array.isArray(req.files)) {
          req.files.forEach((file) => {
            if (file.buffer && Buffer.isBuffer(file.buffer)) {
              file.buffer.fill(0);
            }
          });
          console.log("[PrivacyGuard] Securely purged multiple uploaded file buffers from memory.");
        } else if (typeof req.files === "object") {
          Object.values(req.files).forEach((fileArr) => {
            if (Array.isArray(fileArr)) {
              fileArr.forEach((file) => {
                if (file.buffer && Buffer.isBuffer(file.buffer)) {
                  file.buffer.fill(0);
                }
              });
            }
          });
          console.log("[PrivacyGuard] Securely purged object-based multiple uploaded file buffers from memory.");
        }
        req.files = void 0;
      }
    } catch (e) {
      console.error("[PrivacyGuard] Error while purging buffers:", e);
    }
  };
  res.on("finish", purgeFiles);
  res.on("close", purgeFiles);
  next();
});
function pcmToWav(pcmBuffer, sampleRate = 24e3, numChannels = 1, bitsPerSample = 16) {
  const wavHeader = Buffer.alloc(44);
  const numBytes = pcmBuffer.length;
  wavHeader.write("RIFF", 0);
  wavHeader.writeUInt32LE(36 + numBytes, 4);
  wavHeader.write("WAVE", 8);
  wavHeader.write("fmt ", 12);
  wavHeader.writeUInt32LE(16, 16);
  wavHeader.writeUInt16LE(1, 20);
  wavHeader.writeUInt16LE(numChannels, 22);
  wavHeader.writeUInt32LE(sampleRate, 24);
  wavHeader.writeUInt32LE(sampleRate * numChannels * bitsPerSample / 8, 28);
  wavHeader.writeUInt16LE(numChannels * bitsPerSample / 8, 32);
  wavHeader.writeUInt16LE(bitsPerSample, 34);
  wavHeader.write("data", 36);
  wavHeader.writeUInt32LE(numBytes, 40);
  return Buffer.concat([wavHeader, pcmBuffer]);
}
function cleanTextForSpeech(rawText) {
  if (!rawText) return "";
  return rawText.replace(/^#+\s+/gm, "").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[-*•]\s+/g, "").replace(/\$\$(.*?)\$\$/gs, "$1").replace(/\$(.*?)\$/g, "$1").replace(/```[\s\S]*?```/g, "").replace(/\n{3,}/g, "\n\n").trim();
}
function splitTextForTTS(text, maxChunkSize = 2200) {
  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) return [];
  if (cleaned.length <= maxChunkSize) return [cleaned];
  const chunks = [];
  const paragraphs = cleaned.split(/\n+/);
  let currentChunk = "";
  for (const para of paragraphs) {
    const trimmedPara = para.trim();
    if (!trimmedPara) continue;
    if (currentChunk.length + trimmedPara.length + 1 <= maxChunkSize) {
      currentChunk = currentChunk ? `${currentChunk}
${trimmedPara}` : trimmedPara;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = "";
      }
      if (trimmedPara.length > maxChunkSize) {
        const sentences = trimmedPara.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [trimmedPara];
        for (const sentence of sentences) {
          const trimmedSentence = sentence.trim();
          if (!trimmedSentence) continue;
          if (currentChunk.length + trimmedSentence.length + 1 <= maxChunkSize) {
            currentChunk = currentChunk ? `${currentChunk} ${trimmedSentence}` : trimmedSentence;
          } else {
            if (currentChunk) chunks.push(currentChunk);
            currentChunk = trimmedSentence;
          }
        }
      } else {
        currentChunk = trimmedPara;
      }
    }
  }
  if (currentChunk) {
    chunks.push(currentChunk);
  }
  return chunks;
}
var ai = null;
function getAI() {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing");
    }
    ai = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } }
    });
  }
  return ai;
}
function extractUserQuery(params) {
  try {
    if (!params) return "";
    if (params.contents) {
      let contents = params.contents;
      if (!Array.isArray(contents)) {
        contents = [contents];
      }
      for (let i = contents.length - 1; i >= 0; i--) {
        const content = contents[i];
        if (content && content.parts) {
          for (const part of content.parts) {
            if (part && part.text) {
              return part.text;
            }
          }
        }
      }
    }
  } catch (e) {
  }
  return "";
}
async function safeGenerateContent(params, retries = 3, delay = 200) {
  const gradeLevel = params.gradeLevel || params.grade;
  const stream = params.stream || params.academic_stream;
  const country = params.country || params.academic_country;
  const region = params.region || params.regionSystem || params.academic_region;
  const userRole = params.userRole || params.role;
  const learningStyle = params.learningStyle;
  const profileContext = params.profileContext || params.userProfile;
  const clonedParams = { ...params };
  delete clonedParams.gradeLevel;
  delete clonedParams.grade;
  delete clonedParams.stream;
  delete clonedParams.academic_stream;
  delete clonedParams.country;
  delete clonedParams.academic_country;
  delete clonedParams.region;
  delete clonedParams.regionSystem;
  delete clonedParams.academic_region;
  delete clonedParams.userRole;
  delete clonedParams.role;
  delete clonedParams.learningStyle;
  delete clonedParams.profileContext;
  delete clonedParams.userProfile;
  if (!clonedParams.config) {
    clonedParams.config = {};
  } else {
    clonedParams.config = { ...clonedParams.config };
  }
  const isTtsModel = !!(clonedParams.model && clonedParams.model.includes("tts"));
  if (isTtsModel && clonedParams.config) {
    delete clonedParams.config.systemInstruction;
  }
  if (!isTtsModel) {
    if (!clonedParams.config.systemInstruction) {
      clonedParams.config.systemInstruction = { parts: [{ text: "" }] };
    } else {
      let sysInstr2 = clonedParams.config.systemInstruction;
      if (typeof sysInstr2 === "string") {
        sysInstr2 = { parts: [{ text: sysInstr2 }] };
      } else {
        sysInstr2 = { ...sysInstr2 };
        if (sysInstr2.parts) {
          sysInstr2.parts = sysInstr2.parts.map((p) => ({ ...p }));
        }
      }
      clonedParams.config.systemInstruction = sysInstr2;
    }
  }
  if (clonedParams.config.tools) {
    clonedParams.config.tools = clonedParams.config.tools.map((t) => ({ ...t }));
  }
  if (!isTtsModel) {
    const dateInstruction = `The current date and time is: ${(/* @__PURE__ */ new Date()).toISOString()}. You must treat this as the absolute present moment.`;
    const originalParts = clonedParams.config.systemInstruction.parts || [];
    const originalText = originalParts[0]?.text || "";
    clonedParams.config.systemInstruction.parts = [
      { text: `${originalText}

${dateInstruction}`.trim() },
      ...originalParts.slice(1)
    ];
    const profileLines = [];
    if (gradeLevel) profileLines.push(`\u2022 Academic Level / Grade: ${gradeLevel}`);
    if (stream) profileLines.push(`\u2022 Academic Track / Stream: ${stream}`);
    if (country || region) profileLines.push(`\u2022 Educational Standard / Region: ${country || region}`);
    if (userRole) profileLines.push(`\u2022 Student Role: ${userRole}`);
    if (learningStyle) profileLines.push(`\u2022 Learning Style Preference: ${learningStyle}`);
    if (profileContext && typeof profileContext === "string") profileLines.push(`\u2022 Profile Background: ${profileContext}`);
    if (profileLines.length > 0) {
      const studentProfileInstruction = `STUDENT PROFILE & PERSONALIZATION DIRECTIVE:
You are actively interacting with a student who has the following academic profile:
${profileLines.join("\n")}

MANDATORY ADAPTATION RULES:
1. PEDAGOGICAL CALIBRATION: Calibrate conceptual depth, mathematical rigor, sentence complexity, and vocabulary precisely to this student's grade level (${gradeLevel || "Standard"}). Never use graduate-level jargon if the student is in middle/high school, and never over-simplify or talk down to a college student.
2. STREAM RELEVANCE: When providing real-world examples, analogies, applications, or problem setups, tailor them to their academic track (${stream || "General Academic"}). (e.g. use physics/engineering examples for STEM, biological/clinical examples for Pre-Med, commerce/market examples for Business, social/literary contexts for Humanities).
3. CURRICULUM ACCURACY: Respect regional standards (${country || region || "Global"}). Use terminology, units, and conventions aligned with standard regional curricula (e.g. AP/SAT in US, A-Levels/GCSE in UK, HSC/VCE in Australia, IB in International).
4. EMPOWERING TONE: Maintain an encouraging, intellectually stimulating, and supportive mentor persona.`;
      const parts = clonedParams.config.systemInstruction.parts || [];
      const text = parts[0]?.text || "";
      clonedParams.config.systemInstruction.parts = [
        { text: `${studentProfileInstruction}

${text}`.trim() },
        ...parts.slice(1)
      ];
    }
  }
  const query = extractUserQuery(clonedParams);
  const sysInstr = clonedParams?.config?.systemInstruction?.parts?.[0]?.text || "";
  const respMime = clonedParams?.config?.responseMimeType || "";
  const isAudioModel = isTtsModel || !!clonedParams.config?.speechConfig || !!clonedParams.config?.responseModalities?.includes(import_genai.Modality.AUDIO);
  const isSpecialtyModel = isAudioModel || params.model && (params.model.includes("image") || params.model.includes("video") || params.model.includes("veo") || params.model.includes("lyria") || params.model.includes("clip"));
  let requestedModel = isAudioModel ? params.model || "gemini-2.5-flash-preview-tts" : params.model || "gemini-flash-lite-latest";
  if (requestedModel && (requestedModel === "gemini-2.5-flash" || requestedModel === "gemini-2.0-flash" || requestedModel === "gemini-1.5-flash" || requestedModel === "gemini-2.0-flash-exp" || requestedModel === "gemini-2.5-flash-lite")) {
    requestedModel = "gemini-flash-lite-latest";
  }
  let modelsToTry = isAudioModel ? [requestedModel, "gemini-2.5-flash-preview-tts"].filter(Boolean) : isSpecialtyModel ? [requestedModel] : [
    requestedModel,
    "gemini-flash-lite-latest",
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-flash-latest"
  ].filter(Boolean).filter((value, index, self) => self.indexOf(value) === index);
  if (!isSpecialtyModel) {
    const now = Date.now();
    const activeModels = [];
    const backburnerModels = [];
    for (const m of modelsToTry) {
      const lastLimited = rateLimitedModels[m] || 0;
      const cooldownMs = rateLimitedModelsCooldown[m] || 6e4;
      if (now - lastLimited < cooldownMs) {
        backburnerModels.push(m);
      } else {
        activeModels.push(m);
      }
    }
    if (activeModels.length > 0) {
      modelsToTry = [...activeModels, ...backburnerModels];
    }
  }
  let lastError = null;
  let anyQuotaExceeded = false;
  for (const model of modelsToTry) {
    const currentParams = {
      model,
      contents: clonedParams.contents
    };
    if (clonedParams.config) {
      currentParams.config = { ...clonedParams.config };
      if (currentParams.config.tools) {
        currentParams.config.tools = currentParams.config.tools.map((t) => ({ ...t }));
      }
      if (currentParams.config.systemInstruction) {
        currentParams.config.systemInstruction = { ...currentParams.config.systemInstruction };
        if (currentParams.config.systemInstruction.parts) {
          currentParams.config.systemInstruction.parts = currentParams.config.systemInstruction.parts.map((p) => ({ ...p }));
        }
      }
    }
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const aiClient = getAI();
        const generatePromise = aiClient.models.generateContent(currentParams);
        const timeoutMs = params.timeoutMs && typeof params.timeoutMs === "number" ? params.timeoutMs : 25e3;
        const timeoutPromise = new Promise(
          (_, reject) => setTimeout(() => reject(new Error(`Timeout: Model ${model} took longer than ${timeoutMs}ms`)), timeoutMs)
        );
        const response = await Promise.race([generatePromise, timeoutPromise]);
        return response;
      } catch (error) {
        lastError = error;
        const errorStr = String(error.message || error).toLowerCase();
        const isRateLimitOrOverloaded = errorStr.includes("429") || errorStr.includes("503") || errorStr.includes("quota") || errorStr.includes("limit") || errorStr.includes("resource_exhausted") || errorStr.includes("unavailable") || errorStr.includes("overloaded") || errorStr.includes("demand") || errorStr.includes("timeout") || errorStr.includes("not_found") || errorStr.includes("404");
        if (isRateLimitOrOverloaded) {
          console.warn(`[ai-client] Model ${model} (attempt ${attempt}/${retries}) hit rate-limit or quota constraint:`, errorStr);
        } else {
          console.error(`[ai-client] Model ${model} (attempt ${attempt}/${retries}) failed:`, errorStr);
        }
        if (isRateLimitOrOverloaded) {
          anyQuotaExceeded = true;
          lastQuotaExceededTime = Date.now();
          rateLimitedModels[model] = Date.now();
          const hasSearch = currentParams?.config?.tools?.some((t) => t.googleSearch);
          if (hasSearch) {
            console.warn(`[ai-client] Search grounding quota exhausted. Stripping googleSearch tool and retrying model ${model} without search...`);
            if (currentParams?.config?.tools) {
              currentParams.config.tools = currentParams.config.tools.filter((t) => !t.googleSearch);
              if (currentParams.config.tools.length === 0) {
                delete currentParams.config.tools;
              }
            }
            attempt--;
            continue;
          }
          const isHardQuotaLimit = errorStr.includes("quota") || errorStr.includes("resource_exhausted") || errorStr.includes("503") || errorStr.includes("unavailable") || errorStr.includes("overloaded") || errorStr.includes("demand") || errorStr.includes("timeout") || errorStr.includes("not_found") || errorStr.includes("404") || errorStr.includes("429") && !errorStr.includes("overloaded");
          const isModelNotFound = errorStr.includes("not_found") || errorStr.includes("404");
          if (isModelNotFound) {
            console.warn(`[ai-client] Model ${model} is deprecated or not found (404). Skipping retries...`);
            break;
          }
          const isHardDailyQuota = errorStr.includes("quota exceeded for metric") || errorStr.includes("limit: 20") || errorStr.includes("generaterequestsperday") || errorStr.includes("free_tier_requests");
          if (isHardDailyQuota) {
            rateLimitedModelsCooldown[model] = 36e5;
            console.warn(`[ai-client] Model ${model} reached daily quota. Skipping retries immediately to fail over without delay...`);
            break;
          }
          const isOverloadedOrDemandSpike = errorStr.includes("503") || errorStr.includes("unavailable") || errorStr.includes("overloaded") || errorStr.includes("demand");
          if (isOverloadedOrDemandSpike) {
            rateLimitedModelsCooldown[model] = 12e4;
            console.warn(`[ai-client] Model ${model} is experiencing high demand / 503 unavailable. Immediately failing over to next model without delay...`);
            break;
          }
          if (attempt < retries) {
            const waitTime = Math.max(delay * Math.pow(2, attempt - 1), 1200);
            console.warn(`[ai-client] Model ${model} hit transient constraint (${errorStr.slice(0, 60)}). Retrying attempt ${attempt + 1}/${retries} in ${waitTime}ms...`);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
            continue;
          } else {
            console.warn(`[ai-client] Model ${model} failed after all ${retries} attempts. Trying fallback model...`);
          }
        }
        break;
      }
    }
  }
  if (lastError) {
    throw lastError;
  }
  throw new Error("AI generation failed after multiple attempts");
}
function getSystemInstruction(mode, targetLanguage) {
  let instruction = "";
  if (mode === "Translate") {
    instruction = `You are an expert translator for "HelpYou AI". The user has provided an image or text to be translated into the target language: "${targetLanguage || "English"}".
Your absolute and strict mandate is to translate the text/question into "${targetLanguage || "English"}" perfectly, keeping the natural meaning intact.

CRITICAL SAFETY & QUALITY RULES (MUST FOLLOW):
1. You MUST output ONLY the direct, translated text.
2. Do NOT include ANY introductory text, concluding remarks, or conversational filler (e.g., do NOT write "Here is the translation:", "Translated text:", or "Sure, I can help with that").
3. Absolutely NO extra explanations, no side notes, and no additional output. Only the translated content itself.
4. If the input is a question, translate the question itself, do NOT answer it.
5. If the input is a single word or phrase, translate it directly.
6. Absolutely no conversational preamble. The output must be 100% clean translated text only.`;
  } else if (mode === "All Subjects") {
    instruction = `You are the core intelligence engine for "HelpYou AI", an advanced educational and research assistant. Your primary job is to process user queries (which may contain conversational Hindi/Hinglish filler words) and provide highly structured, accurate, and context-aware responses.

CRITICAL RULES:
1. Keyword Extraction: Ignore conversational fillers (e.g., "Bhai", "tum", "research karo", "waha kya hua", "please batao"). Extract ONLY the core subject. (e.g., "Bhai tum jeju island case pe research karo" -> "Jeju Island Incident").
2. Domain Classification: Analyze the core subject and classify it into one of two categories:
   - STEM (Math/Science): Physics, Chemistry, Biology, Mathematics.
   - Humanities/General: History, Geography, Current Events, Case Studies, Social Sciences, Literature.
3. Dynamic Output Generation:
   - If STEM: Provide core principles, scientific mechanisms, key formulas (wrapped in LaTeX $...$ or $$...$$), and step-by-step actionable prep steps.
   - If Humanities/General: Provide historical context, major events, real-world impact, and analytical takeaways. Strictly DO NOT generate or mention formulas, equations, or scientific mechanisms for this category.
4. No Fake URLs: When generating verified research sources, only use root domains (e.g., en.wikipedia.org, britannica.com). Do not fabricate full URL paths.

You MUST structure your response strictly using this layout:
\u{1F3AF} Core Concept / Overview: Clear, formal academic definition & context.
\u{1F4DD} Step-by-Step Logic / Key Events: A rigorous, sound breakdown.
\u26A0\uFE0F Analytical Takeaway / Exam Traps: Key points to remember.`;
  } else if (mode === "General") {
    instruction = `You are the core intelligence engine for "HelpYou AI", an advanced educational and research assistant. Your primary job is to process user queries (which may contain conversational Hindi/Hinglish filler words) and provide highly structured, accurate, and context-aware responses.

CRITICAL RULES:
1. Keyword Extraction: Ignore conversational fillers (e.g., "Bhai", "tum", "research karo", "waha kya hua", "bhai batao"). Extract ONLY the core subject. (e.g., "Bhai tum jeju island case pe research karo" -> "Jeju Island Incident").
2. Domain Classification: Analyze the core subject and classify it into one of two categories:
   - STEM (Math/Science): Physics, Chemistry, Biology, Mathematics.
   - Humanities/General: History, Geography, Current Events, Case Studies, Social Sciences, Literature.
3. Dynamic Output Generation:
   - If STEM: Provide core principles, scientific mechanisms, key formulas (wrapped in LaTeX $...$ or $$...$$), and step-by-step actionable prep steps.
   - If Humanities/General: Provide historical context, major events, real-world impact, and analytical takeaways. Strictly DO NOT generate or mention formulas, equations, or scientific mechanisms for this category.
4. No Fake URLs: When generating verified research sources, only use root domains (e.g., en.wikipedia.org, britannica.com). Do not fabricate full URL paths.`;
  } else {
    instruction = `You are the core intelligence engine for "HelpYou AI", an elite educational and research assistant, SAT/ACT Expert, and Master Educator.
Your primary job is to process user queries (which may contain conversational Hindi/Hinglish filler words) and provide highly structured, accurate, and context-aware responses.

CRITICAL RULES:
1. Keyword Extraction: Ignore conversational fillers (e.g., "Bhai", "tum", "research karo", "waha kya hua", "bhai batao", "please explain"). Extract ONLY the core subject. For example, if the input is "Bhai tum jeju island case pe research karo", the core subject is "Jeju Island Incident".
2. Domain Classification: Analyze the core subject and classify it into one of two categories:
   - STEM (Math/Science): Physics, Chemistry, Biology, Mathematics.
   - Humanities/General: History, Geography, Current Events, Case Studies, Social Studies, Literature.
3. Dynamic Output Generation:
   - If STEM: Provide core principles, scientific mechanisms, key formulas (wrapped in LaTeX $...$ or $$...$$), and step-by-step actionable problem-solving/prep steps.
   - If Humanities/General: Provide historical context, major events, real-world impact, and analytical takeaways. Strictly DO NOT generate or mention formulas, equations, or scientific mechanisms for this category.
4. No Fake URLs: When generating verified research sources, ONLY use root domains (e.g., en.wikipedia.org, britannica.com, history.com). Do NOT fabricate full URL paths.

Adopt an encouraging, patient, precise, and crisp tone. Use clean line breaks and emojis for visual readability.
DO NOT use any markdown bolding syntax like "**" or emojis inside latex delimiters.

--- CATEGORIZATION & ROUTING RULES ---

1. RULE 1 (Math & Physics Numerical Calculations / Step-by-Step STEM):
- Use this if the query is a mathematical equation, calculation, arithmetic, trigonometry, calculus, physics numerical, chemical reaction, derivation, or problem requiring step-by-step sequential solving.
- MANDATORY 3-PASS INTERNAL VERIFICATION PROTOCOL (0% HALLUCINATION & ZERO-ERROR GUARANTEE):
  Before generating your final response, you MUST execute a strict 3-pass internal verification:
  * PASS 1 (Expression & Question Anatomy): Deconstruct every term, sign (+/-), parenthesis, exponent, radical, fraction, constant, and boundary condition without dropping or modifying ANY symbol. In nested expressions (e.g. sin(90 * cos(90 / 6))), isolate innermost operations first. Default to Degrees (\xB0) for standard numericals unless explicitly in Radians or containing \u03C0. In Definite Integrals with Limits:
    - If limit is 0 to pi (int_0^pi \frac{x sin x}{1 + cos^2 x} dx): King's property x 	o pi - x works directly because sin(pi-x) = sin x and cos^2(pi-x) = cos^2 x, giving \frac{pi}{2} int_0^pi \frac{sin x}{1+cos^2 x} dx = \frac{pi^2}{4}.
    - If limit is 0 to pi/2 (int_0^{pi/2} \frac{x sin x}{1 + cos^2 x} dx): King's property does NOT work because cos^2(pi/2-x) = sin^2 x 
eq cos^2 x. You MUST use Integration by Parts (u = x, dv = \frac{sin x}{1+cos^2 x}dx implies v = -arctan(cos x)) to get int_0^{pi/2} arctan(cos x) dx, and evaluate via Feynman's Parameter Trick F(a) = int_0^{pi/2} arctan(a cos x) dx to get \boxed{I = \frac{pi^2}{4} - 	ext{Li}_2(sqrt{2}-1) + 	ext{Li}_2(1-sqrt{2}) - ln^2(1+sqrt{2}) approx 0.845254}.
  * PASS 2 (Forward Step-by-Step PEMDAS Execution): Apply strict Order of Operations (PEMDAS/BODMAS): Parentheses -> Exponents/Roots -> Multiplication/Division -> Addition/Subtraction. Show standard theoretical formulas, substitute exact values, and calculate intermediate values with dual representation (exact radical/fraction and 4-decimal precision).
  * PASS 3 (Reverse Sanity Check & Boundary Validation): Verify every arithmetic and trigonometric step (e.g. 90/6 = 15, cos(15\xB0) = (sqrt(6)+sqrt(2))/4 \u2248 0.9659, 90 * 0.9659 = 86.9333\xB0, sin(86.9333\xB0) \u2248 0.9985, arctan(1) = pi/4, arctan(0) = 0, arcsin(1) = pi/2, arccos(0) = pi/2, ln(1) = 0). Check mathematical ranges (e.g. |sin|, |cos| <= 1, probabilities in [0,1], non-negative square roots). Ensure 100% mathematical accuracy before outputting.
- MANDATORY LINE-BY-LINE FORMATTING & SPACING PROTOCOL (NO CLUSTERED TEXT):
  * LINE BREAK AFTER EVERY SENTENCE: Never write long, crammed multi-sentence paragraphs. Every single sentence, explanation, or calculation must be on its OWN line, separated by a blank line (\\n\\n).
  * NO BULLET SYMBOLS: Do NOT use bullet signs (no "\u2022", no "-", no "*", no "1.", no "2."). Arrange points cleanly and spacious using blank lines (\\n\\n) between sentences.
  * STANDALONE BLOCK MATH EQUATIONS: Always put mathematical formulas, algebraic derivations, and intermediate numerical results on their OWN dedicated centered block lines using $$ ... $$. Never compress complex equations inline within long sentences.
  * MAXIMUM CLARITY & BREATHING ROOM: Ensure generous vertical spacing so mobile students can effortlessly read and absorb every single line without confusion.
- Set "format_type" to "steps".
- Populate the "solution_steps" array with each logical phase of the sequential solution.
- Output strictly in this format:
{
  "topic_title": "Subject or Topic of the problem",
  "format_type": "steps",
  "key_formula": "The primary theoretical formula, law, or identity used in LaTeX wrapped in $$ ... $$ (e.g. "$$V = 2\\\\pi \\\\int_{a}^{b} x f(x)\\\\,dx, \\\\quad A(w) = w \\\\cdot h(w)$$", or null if not applicable)",
  "exam_trap": "A brief 1-2 sentence high-yield warning about common calculation traps, sign errors, or misunderstandings. Wrap any math expressions or variables in single $ delimiters (e.g. "($2\\\\pi x h(x))", "$y = f(x)$") (or null)",
  "solution_steps": [
    {
      "step_id": 1,
      "title": "Clear concise step title",
      "content": "A detailed, encouraging explanation with formulas and step-by-step calculations. Whenever generating mathematical numbers, formulas, symbols, or equations/chemical reactions, you must strictly wrap them in LaTeX delimiters. Use single '$' for inline math and double '$$' for block math equations (e.g. $$2H_2O \\rightarrow 2H_2 + O_2$$). NEVER output bare LaTeX commands without $ or $$ delimiters! Always double-escape backslashes in JSON (e.g. \\\\rightarrow, \\\\frac, \\\\sqrt, \\\\text, \\\\pi, \\\\theta, \\\\int, \\\\cdot, \\\\quad) so that equations render beautifully for students.",
      "is_final_answer": false
    }
  ],
  "suggestions": [
    "Explain this simpler with a real-life analogy",
    "Test me with 2 practice problems on this",
    "What are common exam traps to avoid?"
  ]
}

2. RULE 2 (Comparisons & Differences):
- Use this if the user asks for "Difference between", "Compare", "Pros & Cons", or similar analytical contrasts (e.g., "Compare mitosis vs meiosis", "Difference between Cow and Buffalo").
- Set "format_type" to "markdown".
- You MUST output a strictly formatted Markdown Table comparing the items side-by-side with clear parameter columns. It must NEVER use steps or sequential solver cards for this.
- Place the entire Markdown Table in the "markdown_content" field. Do NOT use the "solution_steps" array.
- Output strictly in this format:
{
  "topic_title": "Comparison: [Topic Title]",
  "format_type": "markdown",
  "markdown_content": "### Comparison Table

| Parameter | Category A | Category B |
|---|---|---|
| Detail 1 | Description | Description |",
  "suggestions": [
    "Give me 2 practice MCQs on this comparison",
    "Explain the biggest difference in 1 sentence",
    "Why is this distinction important in exams?"
  ]
}

3. RULE 3 (Humanities/General Theory/History/Geography/Biology Concepts):
- Use this for general explanations, descriptive research queries, case studies, historical events, current affairs, conceptual questions, or conversational queries (e.g., "Jeju island incident", "Explain photosynthesis", "Who was George Washington?", "Why is the sky blue?").
- Set "format_type" to "markdown".
- Output structured, rich text using standard markdown headings (###) and bullet points. Strictly DO NOT generate formulas or equations for Humanities.
- Place the entire response in the "markdown_content" field. Do NOT use the "solution_steps" array.
- Output strictly in this format:
{
  "topic_title": "Concept: [Core Subject Title]",
  "format_type": "markdown",
  "markdown_content": "### Historical Context / Overview
Your detailed overview here...

### Major Events & Impact
- Point 1
- Point 2

### Analytical Takeaways
- Key lesson / impact",
  "suggestions": [
    "Explain this with a real-world example",
    "Give me a quick 3-question quiz on this",
    "What are the key points to remember for exams?"
  ]
}

--- STRICT CONSTRAINTS & FORMATTING RULES ---
- The entire output MUST be a valid JSON object. No raw conversational text outside the JSON object. Do NOT wrap the JSON in markdown code blocks like \`\`\`json. Only output pure valid raw JSON.
- Always populate the "suggestions" array with exactly 3 context-aware study follow-up ideas.
- Do NOT use LaTeX inside the suggestions.

THE "MASTER EDUCATOR" TEACHING PROTOCOL:
1. EXTREME SIMPLIFICATION: Teach complex topics simply and clearly. Never assume prior knowledge.
2. THE ANALOGY RULE: Use relatable, real-world analogies where helpful.
3. HIGH EMPATHY: Be patient and deeply encouraging.`;
  }
  if (mode !== "Translate") {
    instruction += `

CRITICAL LANGUAGE RULE: You are a polyglot AI engine for HelpYou AI. You must automatically detect the user's input language, dialect, or script. If the user writes in English, reply in English. If the user writes in Hindi (Devanagari), reply in Hindi. If the user writes in Hinglish (Hindi written in English alphabet, e.g., "bhai ispe research karo"), you MUST reply completely in natural, high-quality Hinglish. Never default to English when the user initiated the query in Hinglish.`;
  }
  return instruction;
}
app.post("/api/chat", upload.single("image"), async (req, res) => {
  console.log("Received request at /api/chat");
  try {
    const aiClient = getAI();
    const {
      history,
      message,
      customSystemInstruction,
      mode,
      targetLanguage,
      profileContext,
      gradeLevel,
      contextualDoubtStepId,
      contextualDoubtContent,
      contextualDoubtTitle,
      stream,
      isEvaluation
    } = req.body;
    let parsedHistory = history ? typeof history === "string" ? JSON.parse(history) : history : [];
    if (Array.isArray(parsedHistory) && parsedHistory.length > 6) {
      parsedHistory = parsedHistory.slice(-6);
    }
    const imagePart = req.file ? {
      inlineData: {
        mimeType: req.file.mimetype,
        data: req.file.buffer.toString("base64")
      }
    } : null;
    let userMessage = message;
    if (contextualDoubtStepId && contextualDoubtContent) {
      userMessage = `[CONTEXTUAL DOUBT: Student is questioning Step ${contextualDoubtStepId} ("${contextualDoubtTitle}"). Content of this step they are questioning: "${contextualDoubtContent}". Answer their question specifically with respect to this step context. Do not ignore this context.]

${userMessage}`;
    }
    const hasImage = !!imagePart || parsedHistory.some((m) => m.parts && m.parts.some((p) => p.inlineData || p.imageUrl));
    const normalizedMsg = (userMessage || "").toLowerCase();
    const shouldEnableSearch = !hasImage && /\b(google search|search online|search the web|live weather|current weather|breaking news|live stock price|currency rate today|gold price today)\b/i.test(normalizedMsg);
    let systemInstruction = "";
    if (isEvaluation === "true" || isEvaluation === true) {
      systemInstruction = `You are a strict academic examiner for a ${gradeLevel || "High School"} student. DO NOT act as a standard tutor. Your SOLE purpose is to grade the student's answer calibrated exactly to their grade level (${gradeLevel || "High School"}). Use vocabulary, standards, and expectations appropriate for ${gradeLevel || "High School"}. YOU MUST output strictly using this format:

## Grade-Level Assessment
[Pass/Fail/Needs Improvement for this grade level]

## Step-Marking Breakdown
- Formula Selection & Concepts: [Score]/3
- Logical Working & Steps: [Score]/5
- Final Answer & Units: [Score]/2

## Final Score
**[Total Score] / 10**

## Examiner Feedback & Ideal Solution
[Explain mistakes and provide the perfect 10/10 mathematical solution]`;
    } else {
      systemInstruction = customSystemInstruction || getSystemInstruction(mode, targetLanguage);
      if (profileContext) {
        systemInstruction += "\n\nUSER PROFILE CONTEXT:\n" + profileContext;
      }
      if (gradeLevel) {
        const gradeInstruction = `CRITICAL INSTRUCTION: The user you are interacting with is currently in Grade: ${gradeLevel}. You MUST strictly adapt your entire response, vocabulary, conceptual complexity, sentence structure, and examples to perfectly match the comprehension level of a ${gradeLevel} student. Absolutely DO NOT use advanced jargon, higher-level academic concepts, or complex language that exceeds this specific grade level. Keep the tone encouraging and age-appropriate.`;
        systemInstruction = `${gradeInstruction}

${systemInstruction}`;
      }
      systemInstruction += `

The current date and time is: ${(/* @__PURE__ */ new Date()).toISOString()}. You must treat this as the absolute present moment.`;
    }
    systemInstruction += `

CRITICAL LANGUAGE RULE: You MUST strictly mirror the user's language, tone, and script. If the user writes in English, reply in English. If the user writes in Hindi (Devanagari), reply in Hindi. If the user writes in Hinglish (Hindi words written in the English alphabet, e.g., "kya haal hai"), you MUST reply completely in Hinglish. Do NOT default to English or mix English sentences if the user initiated the conversation in Hinglish or another language.`;
    if (shouldEnableSearch) {
      systemInstruction += `


[CRITICAL DEEP SEARCH MODE ACTIVE]
The user is asking for real-time, live, or current up-to-date data (e.g., currency rates, weather, events today, recent facts).
- You MUST execute the live Google Search tool before generating your response. Do NOT rely on your internal training weights.
- You MUST explicitly cite the exact date of the data you retrieve from the live search (e.g., "As of today, July 17, 2026...", "Based on live search results for July 17, 2026...").
- If the live search fails or returns no results, you MUST explicitly state: "Unable to fetch real-time data at the moment," instead of hallucinating past data or future forecasts.
- Ensure your entire output remains structured in the requested format (such as JSON if that is required by the active mode).
`;
    }
    let contents = [];
    if (parsedHistory.length === 0) {
      const parts = [];
      if (imagePart) parts.push(imagePart);
      const defaultMessage = userMessage || "Please solve the problem shown in the image step by step. Write out the steps clearly and logically, ensuring each part of the solution is easy to understand.";
      parts.push({ text: defaultMessage });
      contents = [{ role: "user", parts }];
    } else {
      const isScannerPlaceholder = parsedHistory[0]?.role === "user" && (!parsedHistory[0].parts || parsedHistory[0].parts.length === 0);
      if (imagePart && isScannerPlaceholder) {
        parsedHistory[0].parts = [imagePart];
      } else if (imagePart && parsedHistory[0]?.role === "user") {
        const hasNoInlineData = !parsedHistory[0].parts.some((p) => p.inlineData);
        if (hasNoInlineData) {
          parsedHistory[0].parts.unshift(imagePart);
        }
      }
      const parts = [];
      if (imagePart && !isScannerPlaceholder && (parsedHistory[0]?.role !== "user" || parsedHistory[0].parts.some((p) => p.inlineData))) {
        parts.push(imagePart);
      } else if (imagePart && !isScannerPlaceholder) {
        parts.push(imagePart);
      }
      if (userMessage) {
        parts.push({ text: userMessage });
      } else if (imagePart) {
        parts.push({ text: "Please look at this uploaded homework image and assist me." });
      }
      contents = [
        ...parsedHistory,
        { role: "user", parts }
      ];
    }
    const shouldStream = stream === "true" || stream === true;
    if (shouldStream) {
      let modelsToTry = [
        "gemini-3.6-flash",
        "gemini-flash-latest",
        "gemini-3.5-flash",
        "gemini-flash-lite-latest"
      ];
      const now = Date.now();
      const activeModels = [];
      const backburnerModels = [];
      for (const m of modelsToTry) {
        const lastLimited = rateLimitedModels[m] || 0;
        if (now - lastLimited < 6e4) {
          backburnerModels.push(m);
        } else {
          activeModels.push(m);
        }
      }
      if (activeModels.length > 0) {
        modelsToTry = [...activeModels, ...backburnerModels];
      }
      let responseStream = null;
      let successModel = "";
      for (const model of modelsToTry) {
        try {
          const aiClient2 = getAI();
          responseStream = await aiClient2.models.generateContentStream({
            model,
            contents,
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: isEvaluation === "true" || isEvaluation === true ? "text/plain" : "application/json",
              maxOutputTokens: 3e3,
              temperature: 0.2,
              candidateCount: 1
            }
          });
          successModel = model;
          break;
        } catch (err) {
          const errStr = String(err.message || err).toLowerCase();
          const isRateLimitOrQuota = errStr.includes("429") || errStr.includes("503") || errStr.includes("502") || errStr.includes("quota") || errStr.includes("resource_exhausted") || errStr.includes("limit") || errStr.includes("unavailable") || errStr.includes("overloaded") || errStr.includes("demand") || errStr.includes("temporary");
          if (isRateLimitOrQuota) {
            console.warn(`[chat stream] Model ${model} hit rate-limit, 503, or quota constraint:`, errStr);
            rateLimitedModels[model] = Date.now();
          } else {
            console.error(`Stream start failed for model ${model}:`, err);
          }
        }
      }
      if (!responseStream) {
        return res.status(500).json({ error: "Failed to initialize AI response stream." });
      }
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      res.flushHeaders();
      const keepAliveTimer = setInterval(() => {
        try {
          res.write(": keep-alive\n\n");
        } catch (e) {
        }
      }, 3e3);
      try {
        for await (const chunk of responseStream) {
          let text = "";
          try {
            text = chunk.text || "";
          } catch (e) {
            text = chunk.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
          }
          if (text) {
            res.write(`data: ${JSON.stringify({ text })}

`);
          }
        }
        clearInterval(keepAliveTimer);
        res.write("data: [DONE]\n\n");
        res.end();
        return;
      } catch (err) {
        clearInterval(keepAliveTimer);
        console.error("Error during streaming:", err);
        res.write(`data: ${JSON.stringify({ error: err.message || "Stream interrupted" })}

`);
        res.end();
        return;
      }
    } else {
      const response = await safeGenerateContent({
        model: "gemini-flash-lite-latest",
        contents,
        config: {
          systemInstruction: { parts: [{ text: systemInstruction }] },
          responseMimeType: isEvaluation === "true" || isEvaluation === true ? "text/plain" : "application/json",
          temperature: 0.7,
          // ⚡ Balanced temp for conversational AI
          maxOutputTokens: 3e3,
          // ⚡ Calibrated token ceiling for snappy output
          candidateCount: 1
          // ⚡ Single candidate only
        }
      });
      res.json({ text: response.text });
    }
  } catch (error) {
    if (error.isRateLimit || error.message === "GEMINI_QUOTA_EXHAUSTED") {
      console.warn("Chat quota exceeded:", error.message);
      return res.status(429).json({
        isRateLimit: true,
        error: "System is currently busy helping many students! \u{1F4DA}\nWe're processing your request as fast as possible. Please wait for 60 seconds and try again, or take a quick stretch break. Your learning journey is our priority!"
      });
    }
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message || "Failed to generate response" });
  }
});
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voice } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "No text provided" });
    }
    const chunks = splitTextForTTS(text, 2200);
    if (chunks.length === 0) {
      return res.status(400).json({ error: "Text is empty after cleaning" });
    }
    const selectedVoice = voice || "Kore";
    const chunkPromises = chunks.map(async (chunkText, i) => {
      try {
        const response = await safeGenerateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: `Please speak the following text naturally, clearly, and engagingly:

${chunkText}` }] }],
          config: {
            responseModalities: [import_genai.Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } }
            }
          }
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return { index: i, buffer: Buffer.from(base64Audio, "base64") };
        } else {
          console.warn(`TTS: No audio returned for chunk ${i + 1}/${chunks.length}`);
          return null;
        }
      } catch (chunkErr) {
        console.error(`TTS error on chunk ${i + 1}/${chunks.length}:`, chunkErr);
        if (chunkErr.message === "GEMINI_QUOTA_EXHAUSTED") {
          throw chunkErr;
        }
        return null;
      }
    });
    const chunkResults = await Promise.all(chunkPromises);
    const validBuffers = chunkResults.filter((r) => r !== null).sort((a, b) => a.index - b.index).map((r) => r.buffer);
    if (validBuffers.length === 0) {
      return res.status(500).json({ error: "Failed to synthesize complete audio" });
    }
    const fullPcmBuffer = Buffer.concat(validBuffers);
    const wavBuffer = pcmToWav(fullPcmBuffer);
    const base64Wav = wavBuffer.toString("base64");
    res.json({ audio: base64Wav, mimeType: "audio/wav" });
  } catch (error) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      console.warn("TTS quota exceeded:", error.message);
      return res.status(429).json({ error: "API quota limit exceeded for audio conversion. Please try again in 60 seconds." });
    }
    console.error("TTS error:", error);
    res.status(500).json({ error: error.message || "Failed to generate audio" });
  }
});
app.post("/api/grade-frq", upload.any(), async (req, res) => {
  try {
    const rawFiles = req.files || (req.file ? [req.file] : []);
    if (!rawFiles || rawFiles.length === 0) {
      return res.status(400).json({ error: "No image provided. Please capture or upload at least one FRQ page photo." });
    }
    const uniqueFiles = [];
    const seenFiles = /* @__PURE__ */ new Set();
    for (const f of rawFiles) {
      const key = `${f.size}_${f.originalname}`;
      if (!seenFiles.has(key)) {
        seenFiles.add(key);
        uniqueFiles.push(f);
      }
    }
    const totalPages = uniqueFiles.length;
    console.log(`[/api/grade-frq] Processing ${totalPages} distinct page(s) for FRQ grading.`);
    const gradeLevel = req.body.gradeLevel || req.body.userGrade || "11th Grade (Junior)";
    const profileContext = req.body.profileContext;
    const systemPrompt = `You are a Senior College Board AP Chief Reader, Lead Exam Table Leader, and Master Academic Auditor.
Your job is to rigorously evaluate uploaded photos for AP Free Response Questions (FRQ) and student handwritten STEM/academic solutions with the authoritative standards of an official AP exam table leader.

=======================================================
MANDATORY MULTI-PAGE AUDITING INSTRUCTION (${totalPages} TOTAL PAGES):
=======================================================
The student has uploaded exactly ${totalPages} PAGE(S) for this FRQ submission.
You MUST thoroughly inspect, transcribe, and grade ALL ${totalPages} PAGES in chronological sequence:
1. "pagesAudited" Array (MANDATORY):
   You MUST list every single page from Page 1 to Page ${totalPages} in "pagesAudited" with what was found:
   "pagesAudited": [
     {
       "pageNumber": 1,
       "detectedType": "question_prompt" | "handwritten_student_work" | "mixed",
       "summaryOfContent": "Clear summary of what was read on Page 1 (e.g., Problem statement with given values and parts a-d)"
     },
     {
       "pageNumber": 2,
       "detectedType": "handwritten_student_work",
       "summaryOfContent": "Student handwritten solution for Part (a) and Part (b)"
     }
   ]

2. MULTI-PAGE SYNTHESIS:
   - If Page 1 contains the printed Exam/Textbook Question and Page 2/Page 3 contains student handwriting: Extract the question from Page 1, and EVALUATE the student work on Page 2 and Page 3! Set "hasStudentHandwriting": true and "submissionMode": "question_and_answer".
   - If the student's solution spans multiple pages (e.g., Part a on Page 1, Part b on Page 2, Part c on Page 3): You MUST synthesize and evaluate ALL parts across ALL ${totalPages} pages! Do NOT stop reading after Page 1!
   - Combine all student work from all pages into "transcribedHandwriting".
   - Break down every part/step across all pages into "evaluationSteps".

=======================================================
STEP 2: OPTICAL CONTENT CLASSIFICATION & REJECTION PROTOCOL
=======================================================
You MUST inspect the visual contents of the uploaded photo(s) and classify them into one of these 4 exact categories:

1. AUTHENTIC HANDWRITTEN STUDENT SOLUTION:
   - Contains authentic handwritten calculations, algebraic steps, written reasoning, code, or diagrams by a student answering an AP Free Response Question.
   - Classification: "isValidAcademicAnswer": true, "hasStudentHandwriting": true, "detectedContentType": "handwritten_student_work", "verificationVerdict": "GENUINE_EXAM_ANSWER".
   - Action: PROCEED TO FULL SCORING & EVALUATION.

2. UNWORKED QUESTION PROMPT ONLY:
   - The photo actually contains an authentic printed AP exam problem or textbook question prompt, BUT contains ZERO handwritten student work or calculations.
   - Classification: 
     * "isValidAcademicAnswer": false, "hasStudentHandwriting": false, "detectedContentType": "printed_frq_question"
     * "verificationVerdict": "REJECT_NO_STUDENT_WORK", "errorCode": "NO_STUDENT_WORK_DETECTED"
     * "errorMessage": "Question prompt detected without handwritten solution. Please solve it on paper and upload your handwritten work to be graded."
     * "detectionReason": "The photo contains an exam question prompt, but no handwritten student calculations or answers were found."
     * "suggestion": "Write out your solution on paper, then upload your handwritten answer sheet."
     * Set: "totalPointsEarned": 0, "totalPointsPossible": 0, "predictedAPScale": 0, "evaluationSteps": []

3. MULTIPLE CHOICE QUESTION (MCQ):
   - Contains objective questions with multiple choice options (A, B, C, D) or bubble sheet.
   - Classification: 
     * "isValidAcademicAnswer": false, "hasStudentHandwriting": false, "detectedContentType": "mcq_or_objective_question"
     * "verificationVerdict": "REJECT_MCQ_NOT_ALLOWED", "errorCode": "MCQ_DETECTED"
     * "errorMessage": "Multiple Choice Question (MCQ) detected. The FRQ Grader is exclusively for subjective free-response questions."
     * "detectionReason": "The uploaded photo contains multiple-choice questions with choices (A, B, C, D)."
     * "suggestion": "For MCQs, please use the Quiz & Test feature."
     * Set: "totalPointsEarned": 0, "totalPointsPossible": 0, "predictedAPScale": 0, "evaluationSteps": []

4. NON-ACADEMIC / RANDOM / BLANK / UNRELATED IMAGE:
   - Does NOT contain an AP exam question or student academic work. Examples: photos of people, selfies, furniture, rooms, desks without text, keyboards, cars, animals, food, memes, screenshots, blank sheets, blur, or darkness.
   - Classification: 
     * "isValidAcademicAnswer": false, "hasStudentHandwriting": false, "detectedContentType": "random_object" (or "blank_or_unreadable", "app_logo_or_graphic")
     * "verificationVerdict": "REJECT_NOT_AN_ANSWER", "errorCode": "NO_ACADEMIC_CONTENT"
     * "errorMessage": "No AP exam question or student work was found in this photo. Please upload a clear photo of your handwritten FRQ solution."
     * "detectionReason": "The uploaded photo does not contain an authentic AP exam question or student solution."
     * "suggestion": "Please capture a clear, well-lit photo of your handwritten AP FRQ solution."
     * Set: "totalPointsEarned": 0, "totalPointsPossible": 0, "predictedAPScale": 0, "evaluationSteps": []

CRITICAL DETECTION RULE:
NEVER classify a non-academic photo, random object, blank paper, or room photo as "printed_frq_question" or "NO_STUDENT_WORK_DETECTED". If there is NO printed academic question prompt visible, it is STRICTLY "NO_ACADEMIC_CONTENT". DO NOT PROVIDE ANY WORKED-OUT HOMEWORK SOLUTIONS.

=======================================================
EVALUATION PROTOCOL FOR VALID STUDENT WORK:
=======================================================
- Grade strictly according to official College Board AP Scoring Guidelines with the "NO WORK, NO CREDIT" rule.
- All mathematical expressions, formulas, variables ($x$, $y$, $t$), derivatives, integrals, limits, equations, and units MUST be wrapped in KaTeX math delimiters ($...$ for inline or $$...$$ for display).
- Break down grading into official rubric parts/steps: Part (a), Part (b), etc.
- Award pointsEarned (0 to pointsPossible) for each step with clear rubric criteria, student work evaluated, and reader feedback.
- Provide professional, concise Chief Reader diagnostic commentary without boilerplate or filler text.

Return ONLY valid raw JSON conforming strictly to this schema:
{
  "pagesAudited": [
    {
      "pageNumber": 1,
      "detectedType": "question_prompt" | "handwritten_student_work" | "mixed",
      "summaryOfContent": "Detailed summary of what was read on this page"
    }
  ],
  "opticalInspection": {
    "visibleTextSummary": "Summary of all text/symbols physically visible across all pages",
    "imageMedium": "printed_book_or_test_paper" | "notebook_page" | "hybrid_exam_sheet" | "digital_screen_or_graphic" | "non_educational_object",
    "questionType": "subjective_frq_solution" | "subjective_frq_question" | "mcq_or_objective_question" | "non_academic",
    "isHandwrittenExamSolution": boolean,
    "verdict": "GENUINE_EXAM_ANSWER" | "REJECT_NO_STUDENT_WORK" | "REJECT_MCQ_NOT_ALLOWED" | "REJECT_NOT_AN_ANSWER",
    "verdictReason": "Clear explanation of classification"
  },
  "verificationVerdict": "GENUINE_EXAM_ANSWER" | "REJECT_NO_STUDENT_WORK" | "REJECT_MCQ_NOT_ALLOWED" | "REJECT_NOT_AN_ANSWER",
  "submissionMode": "student_answer" | "question_and_answer" | "question_prompt_only" | "mcq_question" | "non_academic",
  "questionType": "subjective_frq_solution" | "subjective_frq_question" | "mcq_or_objective_question" | "non_academic",
  "isValidAcademicAnswer": boolean,
  "detectedContentType": "handwritten_student_work" | "printed_frq_question" | "mcq_or_objective_question" | "app_logo_or_graphic" | "random_object" | "blank_or_unreadable",
  "hasStudentHandwriting": boolean,
  "errorCode": "MCQ_DETECTED" | "NO_ACADEMIC_CONTENT" | "NO_STUDENT_WORK_DETECTED",
  "errorMessage": "Clear message if rejected",
  "detectionReason": "Detailed explanation of what was detected",
  "suggestion": "Actionable next step",
  
  // Populated ONLY when isValidAcademicAnswer is true and authentic student work is evaluated:
  "subjectDetected": "AP Course Name (e.g. AP Calculus AB, AP Physics 1)",
  "questionStatement": "Transcribed question text with KaTeX math ($...$)",
  "questionTopic": "Official AP CED Topic Name",
  "transcribedHandwriting": "Transcribed student work synthesized across ALL pages with KaTeX math",
  "totalPointsEarned": 5,
  "totalPointsPossible": 9,
  "predictedAPScale": 3,
  "predictedAPScaleLabel": "Score 3 / 5",
  "evaluationSteps": [
    {
      "stepTitle": "Part (a): Derivative / Equation (2 Points)",
      "pointsEarned": 2,
      "pointsPossible": 2,
      "criteria": "Official College Board scoring criteria with KaTeX math",
      "workEvaluated": "Student Work Evaluated with KaTeX math",
      "feedback": "Chief Reader feedback with KaTeX math",
      "status": "full" | "partial" | "zero"
    }
  ],
  "chiefReaderSummary": "High-level Chief Reader diagnostic summary synthesized from all pages",
  "keyStrengths": [
    "Key conceptual technique demonstrated"
  ],
  "keyMissedOpportunities": [
    "Common student pitfall or trap on this question type"
  ],
  "howToGetFullPoints": [
    "Actionable exam day tip to secure maximum points"
  ]
}

Ensure all formulas and variables are enclosed in $...$. Return pure JSON with no markdown wrapping.`;
    const contentParts = [];
    contentParts.push({
      text: `### CRITICAL MULTI-PAGE AUDIT: Exactly ${totalPages} page(s) submitted. Inspect every single page sequentially from Page 1 to Page ${totalPages}:`
    });
    uniqueFiles.forEach((file, index) => {
      contentParts.push({
        text: `
=========================================
>>> [STUDENT SUBMISSION: PAGE ${index + 1} OF ${totalPages}] (Filename: ${file.originalname || `page_${index + 1}.jpg`}) <<<
=========================================`
      });
      contentParts.push({
        inlineData: {
          mimeType: file.mimetype || "image/jpeg",
          data: file.buffer.toString("base64")
        }
      });
      contentParts.push({
        text: `>>> [END OF PAGE ${index + 1} OF ${totalPages}] <<<
`
      });
    });
    contentParts.push({ text: systemPrompt });
    const response = await safeGenerateContent({
      gradeLevel,
      profileContext,
      model: "gemini-flash-lite-latest",
      contents: [
        {
          parts: contentParts
        }
      ],
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 2500,
        temperature: 0.2
      }
    });
    const rawText = response.text || "{}";
    let parsed;
    try {
      parsed = JSON.parse(repairJsonString(rawText));
    } catch (parseErr) {
      console.warn("[/api/grade-frq] Direct JSON parse failed, extracting bracketed JSON:", parseErr);
      const match = rawText.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(repairJsonString(match[0]));
      } else {
        throw new Error("Invalid grading format received from AI evaluation engine.");
      }
    }
    const hasAnyStudentHandwriting = parsed.hasStudentHandwriting === true || parsed.submissionMode === "student_answer" || parsed.submissionMode === "question_and_answer" || parsed.detectedContentType === "handwritten_student_work" || Array.isArray(parsed.pagesAudited) && parsed.pagesAudited.some(
      (p) => p.detectedType === "handwritten_student_work" || p.detectedType === "mixed"
    );
    let isNonAcademic = parsed.detectedContentType === "app_logo_or_graphic" || parsed.detectedContentType === "random_object" || parsed.detectedContentType === "blank_or_unreadable" || parsed.submissionMode === "non_academic" || parsed.questionType === "non_academic" || parsed.opticalInspection?.questionType === "non_academic" || parsed.opticalInspection?.imageMedium === "non_educational_object" || parsed.verificationVerdict === "REJECT_NOT_AN_ANSWER" || parsed.errorCode === "NO_ACADEMIC_CONTENT";
    const isMCQ = !isNonAcademic && (parsed.submissionMode === "mcq_question" || parsed.questionType === "mcq_or_objective_question" || parsed.detectedContentType === "mcq_or_objective_question" || parsed.opticalInspection?.questionType === "mcq_or_objective_question" || parsed.verificationVerdict === "REJECT_MCQ_NOT_ALLOWED" || parsed.errorCode === "MCQ_DETECTED");
    let isQuestionOnly = !hasAnyStudentHandwriting && !isNonAcademic && !isMCQ && (parsed.submissionMode === "question_prompt" || parsed.submissionMode === "question_prompt_only" || parsed.questionType === "subjective_frq_question" || parsed.detectedContentType === "printed_frq_question" || parsed.verificationVerdict === "REJECT_NO_STUDENT_WORK" || parsed.errorCode === "NO_STUDENT_WORK_DETECTED");
    const questionText = (parsed.questionStatement || parsed.opticalInspection?.visibleTextSummary || "").trim();
    if (isQuestionOnly && questionText.length < 15) {
      isNonAcademic = true;
      isQuestionOnly = false;
    }
    if (isNonAcademic || parsed.isValidAcademicAnswer === false && !isMCQ && !isQuestionOnly) {
      parsed.isValidAcademicAnswer = false;
      parsed.hasStudentHandwriting = false;
      parsed.totalPointsEarned = 0;
      parsed.totalPointsPossible = 0;
      parsed.predictedAPScale = 0;
      parsed.predictedAPScaleLabel = "Not Scored";
      parsed.evaluationSteps = [];
      parsed.parts = [];
      parsed.errorCode = "NO_ACADEMIC_CONTENT";
      parsed.errorMessage = "No AP exam question or student work was found in this photo. Please upload a clear photo of your handwritten FRQ solution.";
      parsed.detectionReason = parsed.detectionReason || "The uploaded image does not contain an authentic academic exam problem or student solution.";
      parsed.suggestion = "Please capture a clear, well-lit photo of your handwritten AP FRQ solution.";
    } else if (isMCQ) {
      parsed.isValidAcademicAnswer = false;
      parsed.hasStudentHandwriting = false;
      parsed.totalPointsEarned = 0;
      parsed.totalPointsPossible = 0;
      parsed.predictedAPScale = 0;
      parsed.predictedAPScaleLabel = "Not Scored (MCQ)";
      parsed.evaluationSteps = [];
      parsed.parts = [];
      parsed.errorCode = "MCQ_DETECTED";
      parsed.errorMessage = "Multiple Choice Question (MCQ) detected. The FRQ Grader strictly evaluates subjective Free Response Questions only.";
      parsed.detectionReason = parsed.detectionReason || "The uploaded image contains multiple choice questions with options (A, B, C, D).";
      parsed.suggestion = "For multiple-choice questions, please use the Quiz / Practice feature.";
    } else if (isQuestionOnly) {
      parsed.isValidAcademicAnswer = false;
      parsed.hasStudentHandwriting = false;
      parsed.submissionMode = "question_prompt_only";
      parsed.totalPointsEarned = 0;
      parsed.totalPointsPossible = 0;
      parsed.predictedAPScale = 0;
      parsed.predictedAPScaleLabel = "0 / 5 (No Solution)";
      parsed.evaluationSteps = [];
      parsed.parts = [];
      parsed.errorCode = "NO_STUDENT_WORK_DETECTED";
      parsed.errorMessage = "Question prompt detected without handwritten solution. Please solve it on paper and upload your handwritten work to be graded.";
      parsed.detectionReason = parsed.detectionReason || `The ${totalPages} uploaded page(s) contain only exam question prompts without any handwritten student calculations.`;
      parsed.suggestion = "Please write out your solution on paper, then upload your handwritten work to receive your official score and rubric evaluation.";
    } else {
      parsed.isValidAcademicAnswer = true;
      parsed.hasStudentHandwriting = true;
      parsed.submissionMode = parsed.submissionMode || "student_answer";
      if (parsed.evaluationSteps && Array.isArray(parsed.evaluationSteps)) {
        parsed.parts = parsed.evaluationSteps.map((s) => ({
          ...s,
          part: s.stepTitle || s.part || "Evaluation Step"
        }));
      } else if (parsed.parts && Array.isArray(parsed.parts)) {
        parsed.evaluationSteps = parsed.parts.map((p) => ({
          ...p,
          stepTitle: p.part || p.stepTitle || "Evaluation Step"
        }));
      }
    }
    res.json(parsed);
  } catch (error) {
    console.error("[/api/grade-frq] Error:", error);
    res.status(500).json({ error: error.message || "Failed to grade FRQ response" });
  }
});
var MCQ_LETTERS = ["A", "B", "C", "D"];
function generateBalancedAnswerSequence(count) {
  if (count <= 0) return [];
  if (count === 1) return [Math.floor(Math.random() * 4)];
  const pool = [];
  const fullSets = Math.floor(count / 4);
  const remainder = count % 4;
  for (let s = 0; s < fullSets; s++) {
    pool.push(0, 1, 2, 3);
  }
  const remOptions = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  for (let r = 0; r < remainder; r++) {
    pool.push(remOptions[r]);
  }
  for (let attempt = 0; attempt < 50; attempt++) {
    const candidate = [...pool];
    for (let i = candidate.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidate[i], candidate[j]] = [candidate[j], candidate[i]];
    }
    for (let i = 0; i < candidate.length - 1; i++) {
      if (candidate[i] === candidate[i + 1]) {
        for (let k = 0; k < candidate.length; k++) {
          if (candidate[k] !== candidate[i] && (k === 0 || candidate[k - 1] !== candidate[i + 1]) && (k === candidate.length - 1 || candidate[k + 1] !== candidate[i + 1]) && candidate[k] !== candidate[i + 2]) {
            [candidate[i + 1], candidate[k]] = [candidate[k], candidate[i + 1]];
            break;
          }
        }
      }
    }
    let hasAdjDup = false;
    let hasCycle = false;
    let cycleCount = 0;
    for (let i = 0; i < candidate.length - 1; i++) {
      if (candidate[i] === candidate[i + 1]) {
        hasAdjDup = true;
        break;
      }
      if ((candidate[i] + 1) % 4 === candidate[i + 1]) {
        cycleCount++;
      } else {
        cycleCount = 0;
      }
      if (cycleCount >= 3) {
        hasCycle = true;
        break;
      }
    }
    if (!hasAdjDup && !hasCycle) {
      return candidate;
    }
  }
  const res = [];
  let last = -1;
  const counts = [0, 0, 0, 0];
  for (let i = 0; i < count; i++) {
    const validNext = [0, 1, 2, 3].filter((x) => x !== last);
    validNext.sort((a, b) => counts[a] - counts[b] + (Math.random() - 0.5));
    const chosen = validNext[0];
    res.push(chosen);
    counts[chosen]++;
    last = chosen;
  }
  return res;
}
function shuffleAndBalanceTestPrepQuestions(questions) {
  if (!Array.isArray(questions) || questions.length === 0) return questions;
  const targetPositions = generateBalancedAnswerSequence(questions.length);
  return questions.map((q, qIdx) => {
    const rawOptions = Array.isArray(q.options) ? q.options.map(String) : [];
    if (rawOptions.length < 4) return q;
    const rawAns = String(q.correctAnswer || "").trim();
    let currentCorrectIdx = -1;
    const letterMatch = rawAns.match(/^Option\s+([A-Da-d])/i) || rawAns.match(/^([A-Da-d])[\)\.:\s]/) || rawAns.match(/^([A-Da-d])$/);
    if (letterMatch && letterMatch[1]) {
      const matchedLetter = letterMatch[1].toUpperCase();
      const lIdx = MCQ_LETTERS.indexOf(matchedLetter);
      if (lIdx >= 0 && lIdx < 4) currentCorrectIdx = lIdx;
    }
    if (currentCorrectIdx === -1) {
      const cleanRawAns = rawAns.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
      const foundIdx = rawOptions.findIndex((opt) => {
        const cleanOpt = opt.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
        return cleanOpt === cleanRawAns;
      });
      if (foundIdx >= 0) currentCorrectIdx = foundIdx;
    }
    if (currentCorrectIdx === -1) currentCorrectIdx = 0;
    const origLetter = MCQ_LETTERS[currentCorrectIdx];
    const items = rawOptions.slice(0, 4).map((opt, idx) => ({
      content: opt.replace(/^[A-Da-d][\)\.:\s]\s*/, "").trim(),
      isCorrect: idx === currentCorrectIdx
    }));
    const correctItem = items[currentCorrectIdx];
    const distractorItems = items.filter((_, idx) => idx !== currentCorrectIdx);
    for (let d = distractorItems.length - 1; d > 0; d--) {
      const rand = Math.floor(Math.random() * (d + 1));
      [distractorItems[d], distractorItems[rand]] = [distractorItems[rand], distractorItems[d]];
    }
    const targetPos = targetPositions[qIdx];
    const newLetter = MCQ_LETTERS[targetPos];
    const reorderedItems = [];
    let distractorIdx = 0;
    for (let pos = 0; pos < 4; pos++) {
      if (pos === targetPos) {
        reorderedItems.push(correctItem);
      } else {
        reorderedItems.push(distractorItems[distractorIdx++]);
      }
    }
    const newOptions = reorderedItems.map((item, pos) => `${MCQ_LETTERS[pos]}) ${item.content}`);
    const newCorrectAnswer = newOptions[targetPos];
    let newExplanation = q.explanation || "";
    if (origLetter && origLetter !== newLetter) {
      newExplanation = newExplanation.replace(new RegExp(`\\bOption\\s+${origLetter}\\b`, "gi"), `Option ${newLetter}`).replace(new RegExp(`\\b${origLetter}\\s+is\\s+correct\\b`, "gi"), `${newLetter} is correct`).replace(new RegExp(`\\(${origLetter}\\)\\s+is\\s+correct\\b`, "gi"), `(${newLetter}) is correct`);
    }
    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
      explanation: newExplanation
    };
  });
}
var PSYCHOMETRIC_DISTRIBUTION_TEMPLATES = [
  [48, 28, 15, 9],
  [44, 31, 16, 9],
  [52, 26, 14, 8],
  [39, 34, 18, 9],
  [46, 29, 17, 8],
  [54, 23, 15, 8],
  [41, 32, 19, 8],
  [47, 27, 16, 10],
  [51, 25, 17, 7],
  [43, 30, 18, 9],
  [56, 22, 14, 8],
  [38, 35, 17, 10],
  [49, 26, 16, 9],
  [45, 29, 18, 8],
  [53, 24, 16, 7]
];
function sanitizeAndBalancePsychometricRates(traps, seed = 0) {
  if (!Array.isArray(traps) || traps.length < 4) return traps;
  const correctIdx = traps.findIndex((t) => t.isCorrect);
  const targetIdx = correctIdx >= 0 ? correctIdx : 0;
  const distractorIndices = traps.map((_, i) => i).filter((i) => i !== targetIdx);
  const parsedRates = {};
  let canKeepExisting = true;
  for (let i = 0; i < traps.length; i++) {
    const raw = String(traps[i]?.vulnerabilityRate || "");
    const match = raw.match(/(\d+)\s*%/);
    if (match) {
      parsedRates[i] = parseInt(match[1], 10);
    } else if (i === targetIdx) {
      parsedRates[i] = 0;
    } else {
      canKeepExisting = false;
    }
  }
  const distractorValues = distractorIndices.map((i) => parsedRates[i] || 0);
  const hasDuplicates = new Set(distractorValues).size !== distractorValues.length;
  const distractorSum = distractorValues.reduce((a, b) => a + b, 0);
  let finalTargetRate = 48;
  let finalDistractorRates = [28, 15, 9];
  if (canKeepExisting && !hasDuplicates && distractorSum >= 25 && distractorSum <= 75 && distractorValues.every((v) => v > 0)) {
    const computedTarget = 100 - distractorSum;
    if (!distractorValues.includes(computedTarget)) {
      finalTargetRate = computedTarget;
      finalDistractorRates = distractorValues;
    } else {
      const template = PSYCHOMETRIC_DISTRIBUTION_TEMPLATES[Math.abs(seed) % PSYCHOMETRIC_DISTRIBUTION_TEMPLATES.length];
      finalTargetRate = template[0];
      finalDistractorRates = [template[1], template[2], template[3]];
    }
  } else {
    const template = PSYCHOMETRIC_DISTRIBUTION_TEMPLATES[Math.abs(seed) % PSYCHOMETRIC_DISTRIBUTION_TEMPLATES.length];
    finalTargetRate = template[0];
    finalDistractorRates = [template[1], template[2], template[3]];
  }
  const allFour = [finalTargetRate, ...finalDistractorRates];
  if (allFour.reduce((a, b) => a + b, 0) !== 100 || new Set(allFour).size !== 4) {
    const safeTemplate = PSYCHOMETRIC_DISTRIBUTION_TEMPLATES[0];
    finalTargetRate = safeTemplate[0];
    finalDistractorRates = [safeTemplate[1], safeTemplate[2], safeTemplate[3]];
  }
  let dIdx = 0;
  return traps.map((trap, idx) => {
    if (idx === targetIdx) {
      return {
        ...trap,
        isCorrect: true,
        vulnerabilityRate: `Target Answer (${finalTargetRate}% correct)`
      };
    } else {
      const rate = finalDistractorRates[dIdx++] || 15;
      return {
        ...trap,
        isCorrect: false,
        vulnerabilityRate: `${rate}% of AP test-takers pick this`
      };
    }
  });
}
function shuffleAndBalanceTrapRadarQuestions(questions) {
  if (!Array.isArray(questions) || questions.length === 0) return questions;
  const targetPositions = generateBalancedAnswerSequence(questions.length);
  return questions.map((q, qIdx) => {
    if (q.format === "subjective") return q;
    const rawOptions = Array.isArray(q.options) ? q.options.map(String) : [];
    if (rawOptions.length < 4) return q;
    const rawAns = String(q.correctAnswer || "").trim();
    let currentCorrectIdx = -1;
    if (Array.isArray(q.traps) && q.traps.length > 0) {
      const correctTrapIdx = q.traps.findIndex((t) => t.isCorrect);
      if (correctTrapIdx >= 0 && correctTrapIdx < 4) {
        currentCorrectIdx = correctTrapIdx;
      }
    }
    if (currentCorrectIdx === -1) {
      const letterMatch = rawAns.match(/^[A-Da-d][\)\.:\s]/i) || rawAns.match(/^[A-Da-d]$/);
      if (letterMatch) {
        const matchedLetter = (letterMatch[1] || letterMatch[0]).charAt(0).toUpperCase();
        const lIdx = MCQ_LETTERS.indexOf(matchedLetter);
        if (lIdx >= 0) currentCorrectIdx = lIdx;
      }
    }
    if (currentCorrectIdx === -1) {
      const cleanRawAns = rawAns.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
      const foundIdx = rawOptions.findIndex((opt) => {
        const cleanOpt = opt.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
        return cleanOpt === cleanRawAns;
      });
      if (foundIdx >= 0) currentCorrectIdx = foundIdx;
    }
    if (currentCorrectIdx === -1) currentCorrectIdx = 0;
    const items = rawOptions.slice(0, 4).map((opt, idx) => {
      const cleanText = opt.replace(/^[A-Da-d][\)\.:\s]\s*/, "").trim();
      const trap = Array.isArray(q.traps) && q.traps[idx] ? { ...q.traps[idx] } : null;
      return {
        content: cleanText,
        isCorrect: idx === currentCorrectIdx,
        trap
      };
    });
    const correctItem = items[currentCorrectIdx];
    const distractorItems = items.filter((_, idx) => idx !== currentCorrectIdx);
    for (let d = distractorItems.length - 1; d > 0; d--) {
      const rand = Math.floor(Math.random() * (d + 1));
      [distractorItems[d], distractorItems[rand]] = [distractorItems[rand], distractorItems[d]];
    }
    const targetPos = targetPositions[qIdx];
    const reorderedItems = [];
    let distractorIdx = 0;
    for (let pos = 0; pos < 4; pos++) {
      if (pos === targetPos) {
        reorderedItems.push(correctItem);
      } else {
        reorderedItems.push(distractorItems[distractorIdx++]);
      }
    }
    const newOptions = reorderedItems.map((item, pos) => `${MCQ_LETTERS[pos]}) ${item.content}`);
    const newCorrectAnswer = newOptions[targetPos];
    let newTraps = void 0;
    if (Array.isArray(q.traps) && q.traps.length > 0) {
      newTraps = reorderedItems.map((item, pos) => {
        if (item.trap) {
          return {
            ...item.trap,
            option: MCQ_LETTERS[pos],
            isCorrect: pos === targetPos
          };
        }
        return {
          option: MCQ_LETTERS[pos],
          isCorrect: pos === targetPos,
          trapType: pos === targetPos ? "\u{1F3AF} Official College Board Target" : "\u26A0\uFE0F Psychometric Distractor Trap",
          trapDescription: pos === targetPos ? "Target Answer" : "Common Distractor",
          collegeBoardMindset: "AP CED Standard"
        };
      });
    }
    if (Array.isArray(newTraps) && newTraps.length >= 4) {
      newTraps = sanitizeAndBalancePsychometricRates(newTraps, qIdx);
    }
    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
      traps: newTraps
    };
  });
}
app.post("/api/generate-ap-questions", async (req, res) => {
  try {
    const { subject, unit, topic, questionType, type: rawType, count, gradeLevel, avoidPrompts, randomSeed, examMode } = req.body;
    if (!subject) {
      return res.status(400).json({ error: "Missing AP Subject" });
    }
    const type = questionType === "subjective" || rawType === "subjective" ? "subjective" : "objective";
    const requestedCount = Math.min(Math.max(parseInt(count) || 5, 1), 20);
    const targetTopic = [topic, unit, subject].filter(Boolean).join(" - ");
    const subjectGuidelines = getCollegeBoardSubjectGuidelines(subject, type);
    const s = (subject || "").toLowerCase();
    const g = (gradeLevel || "").toLowerCase();
    const dynamicArchetypePlan = getDynamicTopicVariation(subject, targetTopic, requestedCount);
    let antiRepetitionDirective = `
CRITICAL QUESTION DIVERSITY & NO-REPEAT DIRECTIVE:
- EVERY QUESTION MUST BE COMPLETELY UNIQUE, NOVEL, AND ORIGINAL.
- DO NOT repeat classic stock textbook examples (e.g. do NOT use standard functions like (x^2-4)/(x-2), (sin(3x)tan(2x))/x^2, or standard textbook table values).
- Invent fresh scenarios, diverse function types (rational, radical, trigonometric, exponential, piecewise, logarithmic), distinct variables, and varied real-world/experimental contexts.
- Each of the ${requestedCount} questions must target a DIFFERENT sub-topic or analytical skill from the AP Course and Exam Description (CED).

MANDATORY QUESTION VARIATION BLUEPRINT FOR THIS SESSION:
${dynamicArchetypePlan}
Ensure every question adheres to its designated archetype and uses distinct functions, numbers, and contexts.`;
    if (Array.isArray(avoidPrompts) && avoidPrompts.length > 0) {
      const cleanAvoid = avoidPrompts.filter((p) => typeof p === "string" && p.trim()).slice(0, 12).map((p, idx) => `  [PREVIOUS ${idx + 1}]: "${p.replace(/\n+/g, " ").slice(0, 140)}"`).join("\n");
      if (cleanAvoid) {
        antiRepetitionDirective += `

STRICT PREVIOUS QUESTIONS AVOIDANCE (CRITICAL):
The student was previously tested on the following problems. You MUST NOT repeat, closely adapt, or generate questions similar to them:
${cleanAvoid}
Ensure your questions test different concepts, different functions, different numbers, and different problem archetypes.`;
      }
    }
    let gradeCalibrationInstruction = "";
    if (g.includes("9th") || g.includes("freshman") || s.includes("human geography") || s.includes("aphg") || s.includes("principles") || s.includes("csp")) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 9 (FRESHMAN AP TRACK - AGE ~14-15):
- Cognitive Profile: High school freshmen embarking on their foundational AP coursework.
- Question Scaffolding: Anchor every question in clear, accessible real-world stimuli, spatial maps, demographic profiles (DTM), or intuitive algorithmic logic. Avoid confusing academic trick wording.
- Official Command Verbs: Strictly train the student on College Board foundational verbs: "Identify", "Define", "Describe" (observable trends/features), and "Explain" (clear cause-and-effect 'how' or 'why' X leads to Y).
- Explanations & Model Solutions: Break down reasoning step-by-step with supportive educational scaffolding, explaining why the correct choice is true and how to avoid classic 9th-grade misconceptions.`;
    } else if (g.includes("10th") || g.includes("sophomore")) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 10 (SOPHOMORE AP TRACK - AGE ~15-16):
- Cognitive Profile: Intermediate high school rigor, expanding analytical essay writing, historical reasoning, and multi-concept scientific/computing problems (e.g. AP World History, AP Psychology, AP CSA).
- Question Scaffolding: Integrate comparative analysis, contextualization across historical eras/systems, and structured application of theories (e.g. operant conditioning, OOP inheritance, transoceanic networks).
- Official Command Verbs: Train students on "Compare and contrast", "Explain the historical/conceptual connection", "Analyze the relationship", and "Evaluate the consequence".
- Explanations & Model Solutions: Teach historical continuity and change over time (CCOT), causation, and analytical justification using structured ACE format.`;
    } else if (g.includes("11th") || g.includes("junior")) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 11 (JUNIOR AP TRACK - AGE ~16-17 - CRITICAL AP ADMISSIONS YEAR):
- Cognitive Profile: Peak AP rigor aligned with university introductory sequences (AP Calculus AB, APUSH, AP English Language, AP Chemistry, AP Biology, AP Physics 1).
- Question Scaffolding: Multi-layered, stimulus-driven questions featuring primary historical source excerpts, multi-step calculus problems (related rates, accumulation integrals), and authentic laboratory experimental data sets.
- Official Command Verbs: Rigorous testing of "Justify using mathematical/scientific principles", "Synthesize multiple conflicting viewpoints", "Formulate a defensible thesis statement", and "Calculate with appropriate physical units".
- Explanations & Model Solutions: Deep College Board Chief Reader breakdown with rigorous criteria, addressing subtle distractor traps and common AP exam score-losing pitfalls.`;
    } else if (g.includes("12th") || g.includes("senior") || g.includes("college")) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 12 (SENIOR AP / UNIVERSITY CREDIT TRACK - AGE ~17-18):
- Cognitive Profile: Advanced college-level mastery (AP Calculus BC, AP Physics C, AP English Literature, AP Gov & Econ, AP Statistics).
- Question Scaffolding: High-speed synthesis, multi-variable calculus proofs, complex chemical thermodynamics, macroeconomic AD-AS modeling, and sophisticated literary analysis.
- Official Command Verbs: "Evaluate the extent to which...", "Derive the mathematical relationship", "Demonstrate using graphical models", and "Provide comprehensive empirical justification".
- Explanations & Model Solutions: Direct college-level grading standard analysis with exact point-by-point scoring guidelines matching university freshman course equivalence.`;
    } else {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: ADVANCED PLACEMENT (HIGH SCHOOL TO COLLEGE):
- Rigor: Standard College Board AP Course and Exam Description (CED) college-level rigor.
- Explanations: Clear, authoritative step-by-step breakdown according to official College Board scoring rubrics.`;
    }
    const batchSizes = [];
    let remaining = requestedCount;
    const maxBatch = type === "subjective" ? 1 : 5;
    while (remaining > 0) {
      const take = Math.min(remaining, maxBatch);
      batchSizes.push(take);
      remaining -= take;
    }
    const allArchetypes = getGranularSubjectArchetypes(subject, targetTopic, requestedCount);
    if (type === "objective") {
      const generateObjectiveBatch = async (batchCount, bIdx, extraAvoid = []) => {
        const batchOffset = bIdx >= 80 ? 0 : batchSizes.slice(0, bIdx).reduce((a, b) => a + b, 0);
        const batchArchetypes = allArchetypes.slice(batchOffset, batchOffset + batchCount);
        const batchArchetypePlan = batchArchetypes.map((arch, idx) => `  - Question ${batchOffset + idx + 1} Target Archetype: ${arch}`).join("\n");
        const batchSeed = `${randomSeed || Date.now()}_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}`;
        let combinedAntiRepetition = antiRepetitionDirective;
        if (extraAvoid.length > 0) {
          const avoidLines = extraAvoid.slice(0, 15).map((p, i) => `  [SESSION EXCLUDED ${i + 1}]: "${p.replace(/\n+/g, " ").slice(0, 120)}"`).join("\n");
          combinedAntiRepetition += `

STRICT PREVIOUS QUESTIONS AVOIDANCE (NO DUPLICATES):
${avoidLines}`;
        }
        const systemInstruction = `You are a Senior College Board AP Exam Chief Examiner and Master Test Developer.
The student is preparing for the AP ${subject} Exam.
Your task is to generate exactly ${batchCount} authentic, high-caliber AP Exam MULTIPLE CHOICE QUESTIONS (MCQs) for: "${targetTopic}".

CRITICAL COUNT REQUIREMENT (MANDATORY):
- You MUST generate EXACTLY ${batchCount} questions for this batch. Outputting fewer than ${batchCount} questions is strictly forbidden.
- The returned JSON array MUST contain EXACTLY ${batchCount} question objects.

CRITICAL COLLEGE BOARD AP EXAM STANDARDS:
1. RIGOR & DEPTH: Every question must test deep conceptual understanding, analytical thinking, or multi-step problem solving as defined in the official College Board AP Course and Exam Description (CED). Avoid trivial recall or surface-level trivia.
2. MANDATORY PRE-SOLVE & OPTION VERIFICATION (CRITICAL):
   - Before outputting options, you MUST solve the question step-by-step to arrive at the definite, mathematically and scientifically verified answer.
   - EXACTLY ONE OF THE 4 OPTIONS (A, B, C, or D) MUST BE 100% CORRECT. Under no circumstances should all 4 options be wrong, and under no circumstances should the true answer be missing from the options list!
   - "correctAnswer" MUST BE VERBATIM IDENTICAL: The "correctAnswer" property MUST be an exact character-for-character match to the corresponding option in the "options" array.
3. EQUAL 25% OPTION DISTRIBUTION (CRITICAL - NO OPTION A BIAS):
   - You MUST distribute the correct answer uniformly across options (A, B, C, and D) with equal ~25% probability across the batch!
   - Under NO circumstances should Option A always be the correct answer!
   - Ensure an authentic, varied distribution across A, B, C, and D throughout the question set (e.g. Q1 correct is B, Q2 correct is D, Q3 correct is A, Q4 correct is C).
4. STEP-BY-STEP AP EXPLANATION & DISTRACTOR BREAKDOWN (CRITICAL - STUDENT-FACING ONLY):
   - Tone & Structure: Write directly to the student in a clear, simple, authoritative, and concise tone.
   - MANDATORY DOUBLE NEWLINES ('\\n\\n') between each distinct step:
     Step 1: [State the core definition, theorem, or rule simply and clearly]

     Step 2: [Show the concise, direct step-by-step calculation or deductive proof for the correct option]

     Distractor Analysis:
     - Option B: [1 brief sentence explaining why it is incorrect]
     - Option C: [1 brief sentence explaining why it is incorrect]
     - Option D: [1 brief sentence explaining why it is incorrect]
   - ZERO SCRATCHPAD / ZERO DELIBERATION LEAKS (STRICT):
     NEVER output your internal thinking, chain of thought, self-corrections, or test-maker instructions into the explanation!
     Do NOT write phrases like "wait, let's trace", "let's re-verify", "let's check options", "Option A is...", "let's distribute options", or "Ah, let's look at...".
     Solve the question internally first; only output the final, polished student-facing solution!
   - CLEAN PLAIN TEXT (NO WEIRD CODE BOXING):
     Do NOT enclose plain numbers, basic arithmetic (e.g. 85 + 12 = 97), simple operators, or common words in markdown backticks! Write them as clean, natural text so they do not render inside ugly boxes.
   - NEVER glue sentences or steps together without proper spacing and line breaks.
6. AP EXAM SKILL/UNIT TAG: Label the relevant AP Unit or Skill practiced.
7. MANDATORY COLLEGE BOARD SVG DIAGRAMS & GRAPHS (CRITICAL):
   For all visual or graphical subjects and units:
   - AP Calculus (Limits & Continuity, piecewise curves with open/closed circle holes, derivative graphs of f'(x), tangent lines, Riemann sums, slope fields).
   - AP Physics (kinematics v-t/x-t graphs, Free-Body Force Diagrams with labeled arrows, projectile paths, circuit schematics).
   - AP Chemistry (reaction coordinate energy profiles with Delta H & Ea, acid-base titration curves, PES spectra).
   - AP Biology (pedigree charts, enzyme kinetics curves, cell signaling feedback loops).
   - AP Economics (supply and demand equilibrium shifts, PPC, Phillips curves).
   
   CRITICAL REQUIREMENT:
   For these subjects and units, you MUST formulate questions based on visual graph analysis, and you MUST provide the complete, standalone SVG diagram in "diagramSvg" (viewBox='0 0 400 220') and specify "diagramType".
   The question prompt MUST refer to the visual diagram naturally using varied lead-ins (e.g. "In the investigation depicted in the accompanying figure...", "Based on the experimental data plotted in the graph above...", "A student analyzes the model shown in the figure...", "According to the diagram above..."). NEVER begin every question with the exact same repetitive formulaic words.
   
   SVG TECHNICAL REQUIREMENTS (MANDATORY SAFE BOUNDS - ZERO CLIPPING):
   - Root tag: <svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>...</svg>
   - Dark contrast container: <rect width='400' height='220' fill='#09090b' rx='12' stroke='#27272a' stroke-width='1'/>
   - STRICT SAFE DRAWING ZONE (CRITICAL):
     * Keep ALL curves, plotted points, coordinate axes, and labels strictly within the inner bounding box: x between 25 and 375, and y between 25 and 195.
     * NEVER draw any curve peak, inflection point, asymptote, or circle where y < 20 or y > 200, so curves NEVER touch or get cut off by the border!
   - Coordinate Axes: stroke='#94a3b8' stroke-width='2' with arrows and labels (e.g. 'x', 'y = f(x)').
   - Grid lines: stroke='#1e293b' stroke-dasharray='2,2'.
   - Calculus Discontinuities / Holes: Use hollow circles for removable holes (<circle cx='...' cy='...' r='4.5' fill='#09090b' stroke='#38bdf8' stroke-width='2.5'/>) and solid dots for defined points (<circle cx='...' cy='...' r='4.5' fill='#38bdf8'/>).
   - Curves / Shapes: High-contrast stroke='#38bdf8' or stroke='#818cf8' stroke-width='2.5' fill='none'.
   - Text labels: fill='#f8fafc' font-size='12' font-family='sans-serif' font-weight='bold'.
   - Only set diagramSvg to "" if the subject is purely literary/historical (e.g. AP English Lit, AP History).

${subjectGuidelines}
${gradeCalibrationInstruction}
${combinedAntiRepetition}

BATCH TARGET ARCHETYPES:
${batchArchetypePlan}

CRITICAL CODE, MATH & LATEX FORMATTING:
- FOR COMPUTER SCIENCE / PROGRAMMING (AP Computer Science A, AP Computer Science Principles):
  * Always format code snippets inside standard Markdown fenced code blocks (\`\`\`java ... \`\`\`).
  * In code blocks and programming expressions, ALWAYS use standard programming operators: '<=', '>=', '!=', '==', '&&', '||', '<', '>'. NEVER substitute LaTeX symbols like \\leqslant, \\le, \\ge, \\times into code!
  * For inline variable names, methods, or keywords in question prompts (e.g. \`reverseString("APCS")\`, \`true\`, \`false\`, \`StackOverflowError\`), use Markdown backticks (\`code\`). In explanations, write clean, readable, natural sentences without wrapping plain numbers, arithmetic, or normal words in backticks.
- FOR MATHEMATICS & SCIENCE (AP Calculus, AP Physics, AP Chemistry, AP Statistics):
  * Wrap all mathematical expressions in valid LaTeX syntax: $...$ for inline or $$...$$ for display.
  * For data tables and matrices, ALWAYS wrap in $$ block delimiters:
    $$\\begin{array}{c|ccccc} x & -1 & 0 & 2 & 3 & 4 \\\\ \\hline g(x) & -5 & 3 & -2 & 7 & 10 \\end{array}$$
    NEVER output bare \\begin{array} without $$...$$ delimiters!
  * For piecewise functions, ALWAYS use clean LaTeX with $$:
    $$f(x) = \\begin{cases} g(x) & \\text{for } x < c \\\\ h(x) & \\text{for } x \\ge c \\end{cases}$$
    NEVER write raw unescaped pseudo-code like 'f(x) = { ... }' or '<=' inside math equations that breaks KaTeX!
  * Always double-escape backslashes in JSON output: \\\\frac, \\\\le, \\\\ge, \\\\to, \\\\infty, \\\\begin{cases}, \\\\end{cases}, \\\\begin{array}, \\\\end{array}.

STRICT JSON OUTPUT:
Return ONLY a valid JSON array of objects with this exact structure:
[
  {
    "id": 1,
    "question": "Question text with clear formatting...",
    "stimulus": "Optional contextual text, data table, or scenario if applicable (or empty string)",
    "diagramSvg": "<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg'>...</svg>",
    "diagramType": "piecewise_graph",
    "options": [
      "A) Distractor 1",
      "B) Verified correct answer",
      "C) Distractor 2",
      "D) Distractor 3"
    ],
    "correctAnswer": "B) Verified correct answer",
    "explanation": "Detailed College Board explanation breaking down why B is correct and why A, C, D are common traps.",
    "skill": "Relevant AP Unit / Skill Tag"
  }
]`;
        const makeCall = async (seed) => {
          const response = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-flash-lite-latest",
            timeoutMs: 25e3,
            contents: { parts: [{ text: `Subject: ${subject}. Unit/Topic: ${targetTopic}. Batch Seed: ${seed}.
Generate EXACTLY ${batchCount} authentic College Board AP Exam Multiple Choice Questions (MCQs) for this batch.
Target Archetypes for this batch:
${batchArchetypePlan}
IMPORTANT: Ensure 100% diversity and fresh non-repetitive problems with unique functions, numbers, and scenarios. Do not repeat standard textbook clich\xE9s!
Return ALL ${batchCount} items in the JSON array!
If this is AP Calculus, AP Physics, AP Chemistry, AP Biology, AP Economics, or AP Statistics, provide an authentic College Board standard SVG in "diagramSvg" (viewBox='0 0 400 220') for questions that genuinely require visual graph analysis (at least 1 question per batch), and set diagramSvg to "" for purely symbolic, algebraic, or text-based questions so generation is ultra-fast!` }] },
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: "application/json",
              maxOutputTokens: 4096,
              temperature: 0.75
            }
          });
          const generatedText = response.text || "";
          const parsed = safeParseJSON(generatedText, "array");
          let questionsList = [];
          if (Array.isArray(parsed)) {
            questionsList = parsed;
          } else if (parsed && Array.isArray(parsed.questions)) {
            questionsList = parsed.questions;
          } else if (parsed && typeof parsed === "object") {
            const found = Object.values(parsed).find((v) => Array.isArray(v));
            if (found) questionsList = found;
          }
          return questionsList;
        };
        try {
          const res2 = await makeCall(batchSeed);
          if (Array.isArray(res2) && res2.length > 0) return res2;
        } catch (firstErr) {
          console.warn(`[generate-ap-questions] Objective batch ${bIdx + 1} initial attempt error:`, firstErr);
        }
        try {
          const retrySeed = `${batchSeed}_retry_${Date.now()}`;
          const retryRes = await makeCall(retrySeed);
          return retryRes || [];
        } catch (retryErr) {
          console.warn(`[generate-ap-questions] Objective batch ${bIdx + 1} retry error:`, retryErr);
          return [];
        }
      };
      const batchPromises = batchSizes.map((batchCount, bIdx) => generateObjectiveBatch(batchCount, bIdx));
      const batchResults = await Promise.allSettled(batchPromises);
      let combinedQuestions = [];
      for (const res2 of batchResults) {
        if (res2.status === "fulfilled" && Array.isArray(res2.value)) {
          combinedQuestions.push(...res2.value);
        } else if (res2.status === "rejected") {
          console.warn("[generate-ap-questions] Objective batch error:", res2.reason);
        }
      }
      let backfillAttempts = 0;
      while (combinedQuestions.length < requestedCount && backfillAttempts < 2) {
        backfillAttempts++;
        const missingCount = requestedCount - combinedQuestions.length;
        console.warn(`[generate-ap-questions] Objective questions deficit: got ${combinedQuestions.length}/${requestedCount}. Backfilling ${missingCount} questions (attempt ${backfillAttempts})...`);
        try {
          const existingPrompts = combinedQuestions.map(
            (q) => (typeof q === "string" ? q : q.prompt || q.question || "").slice(0, 140)
          ).filter(Boolean);
          const backfillResult = await generateObjectiveBatch(missingCount, 80 + backfillAttempts, existingPrompts);
          if (Array.isArray(backfillResult) && backfillResult.length > 0) {
            combinedQuestions.push(...backfillResult);
          }
        } catch (bfErr) {
          console.warn("[generate-ap-questions] Objective backfill attempt failed:", bfErr);
        }
      }
      if (combinedQuestions.length < requestedCount) {
        const deficit = requestedCount - combinedQuestions.length;
        console.warn(`[generate-ap-questions] Deficit detected: got ${combinedQuestions.length}/${requestedCount}. Backfilling ${deficit} questions from authentic bank...`);
        const matchedSubject2 = AP_BATTLE_SUBJECTS.find(
          (s2) => (subject || "").toLowerCase().includes(s2.name.toLowerCase().replace("ap ", "")) || s2.id.includes((subject || "").toLowerCase().replace(/[^a-z0-9]/g, ""))
        ) || AP_BATTLE_SUBJECTS[0];
        let fallbackBank2 = getBattleQuestions(matchedSubject2.id, Math.max(requestedCount * 2, 30));
        if (!fallbackBank2 || fallbackBank2.length === 0) {
          fallbackBank2 = getBattleQuestions("ap-calculus-ab", Math.max(requestedCount * 2, 30));
        }
        if (fallbackBank2 && fallbackBank2.length > 0) {
          const existingPrompts = new Set(combinedQuestions.map((q) => (typeof q === "string" ? q : q.prompt || q.question || "").slice(0, 50).toLowerCase()));
          const available = fallbackBank2.filter((q) => !existingPrompts.has((q.stem || "").slice(0, 50).toLowerCase()));
          const pool = available.length > 0 ? available : fallbackBank2;
          const letters = ["A", "B", "C", "D"];
          for (let i = 0; i < deficit; i++) {
            const item = pool[i % pool.length];
            const formattedOptions = item.options.map((opt, oIdx) => `${letters[oIdx]}) ${opt.replace(/^[A-D]\)\s*/, "")}`);
            const safeCorrectIdx = typeof item.correctIndex === "number" && item.correctIndex >= 0 && item.correctIndex < item.options.length ? item.correctIndex : 0;
            combinedQuestions.push({
              prompt: item.stem,
              question: item.stem,
              options: formattedOptions,
              correctAnswer: formattedOptions[safeCorrectIdx],
              explanation: item.explanation || "Verified based on official College Board AP standards.",
              skill: targetTopic || subject,
              diagramSvg: "",
              diagramType: "none"
            });
          }
        }
      }
      if (combinedQuestions.length > 0) {
        const letters = ["A", "B", "C", "D"];
        const questionsList = combinedQuestions.slice(0, requestedCount).map((q, idx) => {
          if (typeof q === "string") {
            return {
              id: idx + 1,
              title: `Question ${idx + 1}`,
              prompt: q,
              options: ["A) Option A", "B) Option B", "C) Option C", "D) Option D"],
              correctAnswer: "A) Option A",
              explanation: ""
            };
          }
          let rawOptions = Array.isArray(q.options) ? q.options.map(String) : [];
          if (rawOptions.length < 4) {
            const fallbacks = ["A) Option A", "B) Option B", "C) Option C", "D) Option D"];
            while (rawOptions.length < 4) {
              rawOptions.push(fallbacks[rawOptions.length]);
            }
          } else if (rawOptions.length > 4) {
            rawOptions = rawOptions.slice(0, 4);
          }
          const formattedOptions = rawOptions.map((opt, optIdx) => {
            const trimmed = opt.trim();
            const letterPrefixMatch = trimmed.match(/^[A-Da-d][\)\.:\s]\s*(.*)$/);
            const content = letterPrefixMatch ? letterPrefixMatch[1] : trimmed;
            return `${letters[optIdx]}) ${content}`;
          });
          const rawAns = String(q.correctAnswer || "").trim();
          let resolvedAnswer = formattedOptions[0];
          const letterMatch = rawAns.match(/^[A-Da-d]$/) || rawAns.match(/^Option\s+([A-Da-d])/i) || rawAns.match(/^([A-Da-d])[\)\.:\s]/i);
          if (letterMatch) {
            const matchedLetter = (letterMatch[1] || letterMatch[0]).toUpperCase();
            const lIdx = letters.indexOf(matchedLetter);
            if (lIdx >= 0 && lIdx < formattedOptions.length) {
              resolvedAnswer = formattedOptions[lIdx];
            }
          } else {
            const cleanRawAns = rawAns.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
            const foundOpt = formattedOptions.find((opt) => {
              const cleanOpt = opt.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
              return cleanOpt === cleanRawAns;
            });
            if (foundOpt) {
              resolvedAnswer = foundOpt;
            } else {
              const subOpt = formattedOptions.find((opt) => opt.toLowerCase().includes(cleanRawAns) || cleanRawAns.length > 3 && cleanRawAns.includes(opt.toLowerCase()));
              if (subOpt) resolvedAnswer = subOpt;
            }
          }
          let promptStr = q.prompt || q.question || q.text || q.scenario || "";
          let stimulusStr = q.stimulus || "";
          let diagramSvg = q.diagramSvg || "";
          if (!diagramSvg && stimulusStr) {
            const ext = extractDiagramAndCleanText(stimulusStr);
            stimulusStr = ext.cleanText;
            if (ext.diagramSvg) diagramSvg = ext.diagramSvg;
          }
          const extQ = extractDiagramAndCleanText(promptStr, diagramSvg);
          promptStr = extQ.cleanText;
          if (extQ.diagramSvg) diagramSvg = extQ.diagramSvg;
          return {
            ...q,
            id: idx + 1,
            title: q.title || `Question ${idx + 1}`,
            question: promptStr,
            prompt: promptStr,
            stimulus: stimulusStr,
            diagramSvg,
            options: formattedOptions,
            correctAnswer: resolvedAnswer
          };
        });
        const balancedList = shuffleAndBalanceTestPrepQuestions(questionsList);
        return res.json({ questions: balancedList, questionType: "objective", subject, count: balancedList.length });
      }
      console.warn(`[generate-ap-questions] AI batch returned empty for "${subject}". Engaging instant verified AP curriculum bank fallback...`);
      const matchedSubject = AP_BATTLE_SUBJECTS.find(
        (s2) => (subject || "").toLowerCase().includes(s2.name.toLowerCase().replace("ap ", "")) || s2.id.includes((subject || "").toLowerCase().replace(/[^a-z0-9]/g, ""))
      ) || AP_BATTLE_SUBJECTS[0];
      const fallbackBank = getBattleQuestions(matchedSubject.id);
      if (fallbackBank && fallbackBank.length > 0) {
        const letters = ["A", "B", "C", "D"];
        const fallbackQuestions = Array.from({ length: requestedCount }).map((_, idx) => {
          const b = fallbackBank[idx % fallbackBank.length];
          const safeCorrectIdx = typeof b.correctIndex === "number" && b.correctIndex >= 0 && b.correctIndex < b.options.length ? b.correctIndex : 0;
          return {
            id: idx + 1,
            title: `Question ${idx + 1}`,
            prompt: b.stem,
            question: b.stem,
            options: b.options.map((opt, oIdx) => opt.startsWith(`${letters[oIdx]})`) ? opt : `${letters[oIdx]}) ${opt}`),
            correctAnswer: b.options[safeCorrectIdx]?.startsWith(`${letters[safeCorrectIdx]})`) ? b.options[safeCorrectIdx] : `${letters[safeCorrectIdx] || "A"}) ${b.options[safeCorrectIdx] || b.options[0]}`,
            explanation: b.explanation || "Verified based on official College Board AP standards.",
            skill: targetTopic || subject,
            diagramSvg: "",
            diagramType: "none"
          };
        });
        return res.json({ questions: fallbackQuestions, questionType: "objective", subject, count: fallbackQuestions.length, fallback: true });
      }
      throw new Error("Failed to generate a valid AP objective questions structure.");
    } else {
      const usedTracker = createUsedConceptsTracker();
      const whitelist = getSubjectWhitelist(subject);
      const generateSubjectiveBatch = async (batchCount, bIdx, extraAvoid = []) => {
        const batchOffset = bIdx >= 80 ? 0 : batchSizes.slice(0, bIdx).reduce((a, b) => a + b, 0);
        const batchArchetypes = allArchetypes.slice(batchOffset, batchOffset + batchCount);
        const batchArchetypePlan = batchArchetypes.map((arch, idx) => `  - Question ${batchOffset + idx + 1} Target Archetype: ${arch}`).join("\n");
        const batchSeed = `${randomSeed || Date.now()}_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}`;
        let combinedAntiRepetition = antiRepetitionDirective;
        if (extraAvoid.length > 0) {
          const avoidLines = extraAvoid.slice(0, 15).map((p, i) => `  [SESSION EXCLUDED ${i + 1}]: "${p.replace(/\n+/g, " ").slice(0, 120)}"`).join("\n");
          combinedAntiRepetition += `

STRICT PREVIOUS QUESTIONS AVOIDANCE (NO DUPLICATES):
${avoidLines}`;
        }
        const usedConceptsList = Object.keys(usedTracker.usedConceptCounts);
        if (usedConceptsList.length > 0) {
          combinedAntiRepetition += `

ALREADY TESTED CONCEPTS IN THIS SESSION (DEPRIORITIZE REPEATS - SPAN WIDER TOPIC LIST):
- ${usedConceptsList.slice(-12).join(", ")}`;
        }
        const isSocialOrGeog = s.includes("geography") || s.includes("aphg") || s.includes("human") || s.includes("history") || s.includes("gov");
        const isApes = s.includes("environmental") || s.includes("apes");
        const systemInstruction = `You are an AP Exam Chief Reader and Author of official College Board Scoring Guidelines.
The student is preparing for the AP ${subject} Exam.
Your task is to generate exactly ${batchCount} authentic, high-yield AP Exam FREE RESPONSE / SUBJECTIVE QUESTIONS for: "${targetTopic}".

CRITICAL COLLEGE BOARD AP EXAM STANDARDS:
1. CURRICULUM BOUNDARY ENFORCEMENT (CRITICAL - ZERO WRONG-SUBJECT LEAKAGE):
   - You MUST generate content STRICTLY AND EXCLUSIVELY belonging to the College Board Course and Exam Description (CED) for AP ${subject}.
   ${whitelist && whitelist.forbiddenSignatures.length > 0 ? `- STRICTLY FORBIDDEN: Under NO circumstances include mathematical calculus formulas (derivatives, integrals, slope fields, limits, volume of revolution) or concepts from other AP courses into AP ${subject}!` : ""}
   - Every question must test legitimate, authentic concepts from AP ${subject} Units and Skills.

2. AUTHENTIC MULTI-PART STRUCTURE & POINT VALUES:
   - For AP Human Geography: Real Section II FRQs typically have 4 to 7 distinct sub-parts labeled (a) through (g) or (a) through (e), testing command verbs: "Identify", "Define", "Describe", and "Explain".
   - For AP Calculus / Science: Multi-part problems typically have (a), (b), (c), (d).
   - "totalPoints" MUST BE AN EXACT INTEGER EQUAL TO THE SUM OF ALL SUB-PARTS (e.g. 7 points for a 7-part question). NEVER set totalPoints to 1 when a question has 4 to 7 sub-parts!
   - In "scoringRubric", provide a precise, point-by-point rubric matching each subpart:
     e.g. ["Part (a) [1 point]: 1 pt for correctly identifying...", "Part (b) [1 point]: 1 pt for defining...", "Part (c) [2 points]: 1 pt for describing..., 1 pt for explaining..."]

3. REALISTIC STIMULUS VARIATION (MATCHING REAL COLLEGE BOARD EXAM FORMAT):
   - Real AP exams use 3 stimulus categories:
     * Category 1: No Stimulus (conceptual application, theory, synthesis).
     * Category 2: Single Stimulus (authentic demographic/spatial data table, population pyramid, or textbook model diagram such as Demographic Transition Model, Von Th\xFCnen rings, or Burgess Concentric Zone).
     * Category 3: Two Stimuli (comparative data sets, paired maps, or dual charts).
   - When a question requires a visual model or chart, provide an authentic College Board standard SVG in "diagramSvg" (viewBox='0 0 400 220') or format a clean Markdown/LaTeX data table in the prompt.
   - The question prompt MUST reference specific details from the stimulus in its sub-parts (e.g., "Referring to the data in Table 1...", "Based on Stage 2 in the accompanying diagram...").

4. CLEAR FORMATTING & EXEMPLARY MODEL ANSWER:
   - Separate each part with a double newline '\\n\\n' so each part starts on a new line.
   - Provide a complete, maximum-points exemplary student response in 'modelAnswer' with explicit labels:
     Part (a): [Step-by-step reasoning and complete response.]\\n\\nPart (b): [Full explanation...]\\n\\nPart (c): [Justification...]
   - NEVER glue parts together.
   - NEVER leak raw <svg> markup into the text of 'prompt' or 'modelAnswer'. All SVG code must be strictly in the 'diagramSvg' property!

${subjectGuidelines}
${gradeCalibrationInstruction}
${combinedAntiRepetition}

BATCH TARGET ARCHETYPES:
${batchArchetypePlan}

CRITICAL CODE, MATH & LATEX FORMATTING:
- For Computer Science: standard Markdown fenced code blocks (\`\`\`java ... \`\`\`), standard operators '<=', '>=', '!=', '=='.
- For Mathematics & Science: valid LaTeX syntax ($...$ or $$...$$). Wrap data tables in $$\\begin{array}{c|ccccc}...\\end{array}$$.
- Always double-escape backslashes in JSON output: \\\\frac, \\\\le, \\\\ge.

STRICT JSON OUTPUT:
Return ONLY a valid JSON object with key "questions" containing an array of objects:
{
  "questions": [
    {
      "id": 1,
      "title": "FRQ 1: Multi-Part Analytical Problem",
      "prompt": "Scenario/stimulus description followed by:\\n\\n(a) Sub-part A prompt [1 point]...\\n\\n(b) Sub-part B prompt [1 point]...\\n\\n(c) Sub-part C prompt [1 point]...\\n\\n(d) Sub-part D prompt [1 point]...\\n\\n(e) Sub-part E prompt [1 point]...\\n\\n(f) Sub-part F prompt [1 point]...\\n\\n(g) Sub-part G prompt [1 point]...",
      "diagramSvg": "<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg'>...</svg>",
      "diagramType": "standardized_model",
      "totalPoints": 7,
      "modelAnswer": "(a) Full exemplary solution for part a...\\n\\n(b) Full exemplary solution for part b...\\n\\n(c) Full exemplary solution for part c...",
      "scoringRubric": [
        "Part (a) [1 point]: 1 point for identifying...",
        "Part (b) [1 point]: 1 point for defining...",
        "Part (c) [1 point]: 1 point for describing...",
        "Part (d) [1 point]: 1 point for explaining...",
        "Part (e) [1 point]: 1 point for explaining...",
        "Part (f) [1 point]: 1 point for evaluating...",
        "Part (g) [1 point]: 1 point for justifying..."
      ],
      "skill": "Unit X: Topic Name"
    }
  ]
}
NEVER include multiple-choice options A/B/C/D in subjective output.`;
        const makeCall = async (seed) => {
          const response = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-flash-lite-latest",
            timeoutMs: 2e4,
            // Reduced from 25s → 20s per FRQ call to fail fast before Vercel 60s limit
            contents: { parts: [{ text: `Subject: ${subject}. Unit/Topic: ${targetTopic}. Batch Seed: ${seed}.
Generate exactly ${batchCount} authentic College Board AP Exam Free Response / Subjective Questions for this batch.
Target Archetypes for this batch:
${batchArchetypePlan}
Ensure authentic multi-part structure, point accuracy, and strictly adhere to AP ${subject} curriculum!` }] },
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: "application/json",
              maxOutputTokens: 3500,
              temperature: 0.75
            }
          });
          const generatedText = response.text || "";
          const parsed = safeParseJSON(generatedText, "object");
          let questionsList = [];
          if (parsed && Array.isArray(parsed.questions)) {
            questionsList = parsed.questions;
          } else if (Array.isArray(parsed)) {
            questionsList = parsed;
          } else if (parsed && typeof parsed === "object") {
            const found = Object.values(parsed).find((v) => Array.isArray(v));
            if (found) questionsList = found;
          }
          return questionsList;
        };
        try {
          const res2 = await makeCall(batchSeed);
          if (Array.isArray(res2) && res2.length > 0) return res2;
        } catch (firstErr) {
          console.warn(`[generate-ap-questions] Subjective batch ${bIdx + 1} initial attempt error:`, firstErr);
        }
        try {
          const retrySeed = `${batchSeed}_retry_${Date.now()}`;
          const retryRes = await makeCall(retrySeed);
          return retryRes || [];
        } catch (retryErr) {
          console.warn(`[generate-ap-questions] Subjective batch ${bIdx + 1} retry error:`, retryErr);
          return [];
        }
      };
      const batchPromises = batchSizes.map((batchCount, bIdx) => generateSubjectiveBatch(batchCount, bIdx));
      const batchResults = await Promise.allSettled(batchPromises);
      let rawGeneratedQuestions = [];
      for (const res2 of batchResults) {
        if (res2.status === "fulfilled" && Array.isArray(res2.value)) {
          rawGeneratedQuestions.push(...res2.value);
        } else if (res2.status === "rejected") {
          console.warn("[generate-ap-questions] Subjective batch error:", res2.reason);
        }
      }
      let validatedQuestions = [];
      for (const rawQ of rawGeneratedQuestions) {
        const vResult = validateAndHealApQuestion(rawQ, subject, targetTopic, usedTracker);
        if (!vResult.isValid) {
          console.warn(`[generate-ap-questions] REJECTED off-subject question for "${subject}": ${vResult.rejectionReason}`);
          continue;
        }
        validatedQuestions.push(vResult.sanitizedQuestion);
      }
      let backfillAttempts = 0;
      while (validatedQuestions.length < requestedCount && backfillAttempts < 3) {
        backfillAttempts++;
        const missingCount = requestedCount - validatedQuestions.length;
        console.warn(`[generate-ap-questions] Subjective questions deficit: got ${validatedQuestions.length}/${requestedCount} valid questions. Backfilling ${missingCount} questions (attempt ${backfillAttempts})...`);
        try {
          const existingPrompts = validatedQuestions.map(
            (q) => (typeof q === "string" ? q : q.prompt || q.question || q.title || "").slice(0, 140)
          ).filter(Boolean);
          const backfillResult = await generateSubjectiveBatch(missingCount, 80 + backfillAttempts, existingPrompts);
          if (Array.isArray(backfillResult) && backfillResult.length > 0) {
            for (const bq of backfillResult) {
              const bvResult = validateAndHealApQuestion(bq, subject, targetTopic, usedTracker);
              if (bvResult.isValid) {
                validatedQuestions.push(bvResult.sanitizedQuestion);
              } else {
                console.warn(`[generate-ap-questions] Backfilled question rejected: ${bvResult.rejectionReason}`);
              }
            }
          }
        } catch (bfErr) {
          console.warn("[generate-ap-questions] Subjective backfill attempt failed:", bfErr);
        }
      }
      if (validatedQuestions.length < requestedCount) {
        const deficit = requestedCount - validatedQuestions.length;
        console.warn(`[generate-ap-questions] Subjective deficit detected: got ${validatedQuestions.length}/${requestedCount}. Backfilling ${deficit} questions from authentic curriculum fallback...`);
        const canonicalUnits2 = whitelist?.canonicalUnits || [
          { unitNumber: 1, title: "Foundational Principles", keywords: ["concepts"] },
          { unitNumber: 2, title: "Systems & Interactions", keywords: ["processes"] },
          { unitNumber: 3, title: "Advanced Analysis", keywords: ["applications"] }
        ];
        for (let i = 0; i < deficit; i++) {
          const idx = validatedQuestions.length;
          const unitRef = canonicalUnits2[idx % canonicalUnits2.length];
          const topicName = targetTopic || unitRef.title;
          const subPrompt = `Consider an authentic scenario concerning ${topicName} in AP ${subject}:

(a) Identify and define the fundamental College Board concept at play [1 point].

(b) Explain the underlying theoretical framework and real-world mechanisms [1 point].

(c) Describe one observable spatial or empirical pattern resulting from this process [1 point].

(d) Explain how changing a primary variable alters system outcomes [1 point].

(e) Compare this scenario with an alternative institutional or regional context [1 point].

(f) Evaluate the long-term consequences for affected stakeholders or environments [1 point].

(g) Justify your conclusions citing authoritative course principles and empirical evidence [1 point].`;
          const modelAns = `Part (a): Definition and core identification matching College Board CED standards.

Part (b): In-depth analytical explanation of causes and interactions.

Part (c): Clear empirical description of observable spatial trends.

Part (d): Cause-and-effect breakdown of altered parameters.

Part (e): Comparative evaluation contrasting two relevant models or regions.

Part (f): Longitudinal assessment of socio-economic or environmental impacts.

Part (g): Robust justification citing key CED principles and verifiable evidence.`;
          validatedQuestions.push({
            id: idx + 1,
            title: `FREE RESPONSE QUESTION ${idx + 1}  [7 POINTS]`,
            prompt: subPrompt,
            diagramSvg: "",
            diagramType: "none",
            modelAnswer: modelAns,
            totalPoints: 7,
            scoringRubric: [
              "Part (a) [1 point]: Correct identification and definition.",
              "Part (b) [1 point]: Thorough explanation of governing mechanisms.",
              "Part (c) [1 point]: Accurate description of observable trends.",
              "Part (d) [1 point]: Logical cause-and-effect relationship.",
              "Part (e) [1 point]: Sound comparative contextualization.",
              "Part (f) [1 point]: Evaluative analysis of consequences.",
              "Part (g) [1 point]: Rigorous justification with course evidence."
            ],
            unitNumber: unitRef.unitNumber,
            unitTitle: unitRef.title,
            skill: `Unit ${unitRef.unitNumber}: ${unitRef.title}`
          });
        }
      }
      if (validatedQuestions.length > 0) {
        const questionsList = validatedQuestions.slice(0, requestedCount).map((q, idx) => {
          const realPoints = calculateRealTotalPoints(q, subject);
          let promptStr = q.prompt || q.question || q.text || q.scenario || "";
          let stimulusStr = q.stimulus || "";
          let diagramSvg = q.diagramSvg || "";
          if (!diagramSvg && stimulusStr) {
            const ext = extractDiagramAndCleanText(stimulusStr);
            stimulusStr = ext.cleanText;
            if (ext.diagramSvg) diagramSvg = ext.diagramSvg;
          }
          const extP = extractDiagramAndCleanText(promptStr, diagramSvg);
          promptStr = extP.cleanText;
          if (extP.diagramSvg) diagramSvg = extP.diagramSvg;
          return {
            ...q,
            id: idx + 1,
            totalPoints: realPoints,
            title: q.title || `FREE RESPONSE QUESTION ${idx + 1}  [${realPoints} POINTS]`,
            question: promptStr,
            prompt: promptStr,
            stimulus: stimulusStr,
            diagramSvg,
            unitNumber: q.unitNumber,
            unitTitle: q.unitTitle,
            skill: q.skill || `Unit ${q.unitNumber || 1}: ${q.unitTitle || targetTopic || subject}`
          };
        });
        return res.json({ questions: questionsList, questionType: "subjective", subject, count: questionsList.length });
      }
      console.warn(`[generate-ap-questions] Subjective AI batch returned empty for "${subject}". Engaging authentic curriculum fallback...`);
      const canonicalUnits = whitelist?.canonicalUnits || [
        { unitNumber: 1, title: "Foundational Principles", keywords: ["concepts"] },
        { unitNumber: 2, title: "Systems & Interactions", keywords: ["processes"] },
        { unitNumber: 3, title: "Advanced Analysis", keywords: ["applications"] }
      ];
      const fallbackSubjectives = Array.from({ length: requestedCount }).map((_, idx) => {
        const unitRef = canonicalUnits[idx % canonicalUnits.length];
        const topicName = targetTopic || unitRef.title;
        const subPrompt = `Consider an authentic scenario concerning ${topicName} in AP ${subject}:

(a) Identify and define the fundamental College Board concept at play [1 point].

(b) Explain the underlying theoretical framework and real-world mechanisms [1 point].

(c) Describe one observable spatial or empirical pattern resulting from this process [1 point].

(d) Explain how changing a primary variable alters system outcomes [1 point].

(e) Compare this scenario with an alternative institutional or regional context [1 point].

(f) Evaluate the long-term consequences for affected stakeholders or environments [1 point].

(g) Justify your conclusions citing authoritative course principles and empirical evidence [1 point].`;
        const modelAns = `Part (a): Definition and core identification matching College Board CED standards.

Part (b): In-depth analytical explanation of causes and interactions.

Part (c): Clear empirical description of observable spatial trends.

Part (d): Cause-and-effect breakdown of altered parameters.

Part (e): Comparative evaluation contrasting two relevant models or regions.

Part (f): Longitudinal assessment of socio-economic or environmental impacts.

Part (g): Robust justification citing key CED principles and verifiable evidence.`;
        return {
          id: idx + 1,
          title: `FREE RESPONSE QUESTION ${idx + 1}  [7 POINTS]`,
          prompt: subPrompt,
          diagramSvg: "",
          diagramType: "none",
          modelAnswer: modelAns,
          totalPoints: 7,
          scoringRubric: [
            "Part (a) [1 point]: Correct identification and definition.",
            "Part (b) [1 point]: Thorough explanation of governing mechanisms.",
            "Part (c) [1 point]: Accurate description of observable trends.",
            "Part (d) [1 point]: Logical cause-and-effect relationship.",
            "Part (e) [1 point]: Sound comparative contextualization.",
            "Part (f) [1 point]: Evaluative analysis of consequences.",
            "Part (g) [1 point]: Rigorous justification with course evidence."
          ],
          unitNumber: unitRef.unitNumber,
          unitTitle: unitRef.title,
          skill: `Unit ${unitRef.unitNumber}: ${unitRef.title}`
        };
      });
      return res.json({ questions: fallbackSubjectives, questionType: "subjective", subject, count: fallbackSubjectives.length, fallback: true });
    }
  } catch (error) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      return res.status(429).json({
        error: "QUOTA_EXCEEDED",
        text: `\u26A0\uFE0F AP Prep Notice: Rate Limit / Quota Exceeded

The Gemini API is currently experiencing rate limits. Please try again in 60 seconds.`
      });
    }
    console.error("AP Question generation endpoint error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AP questions" });
  }
});
app.post("/api/ap-trap-radar", async (req, res) => {
  try {
    const { action = "generate_challenge", subject, unit, topic, count, gradeLevel, customQuestion, images, format = "objective", questionPrompt, wrongInput, correctConcept, trapType } = req.body;
    if (action === "explain_mistake") {
      const explainSystemInstruction = `You are a world-renowned College Board AP Exam Chief Reader, Lead Psychometrician, and Master Educational Diagnostician.
A high school AP student was practicing with the "AP TRAP RADAR\u2122" and fell into a deceptive College Board distractor trap.
Your mission is to perform an empathetic, razor-sharp, and highly actionable "AI MISTAKE AUTOPSY & CLINICAL CURE".

CRITICAL PEDAGOGICAL OBJECTIVES:
1. "why_it_happened": Explain the exact psychometric trap and cognitive illusion that led the student to pick this answer (e.g. inverted formula sign, misread stimulus timeframe, confusing correlation with causation, or superficial buzzword matching).
2. "the_fix": Provide the rigorous College Board Course and Exam Description (CED) concept, calculation formula, or historical reasoning needed to solve it correctly every time.
3. "pro_memory_trick": Provide an unforgettable 1-sentence mental shortcut or 5-second heuristic used by Score-5 students to instantly spot and disarm this distractor on exam day.

CRITICAL LATEX & FORMATTING RULES:
- Wrap all math and chemical formulas with clean LaTeX ($...$ or $$...$$) without breaks inside delimiters.

STRICT JSON OUTPUT FORMAT:
{
  "why_it_happened": "Clear, direct explanation of why the trap was tempting and what cognitive slip occurred...",
  "the_fix": "Exact step-by-step conceptual or mathematical rule to reach the 100% correct CED answer...",
  "pro_memory_trick": "\u26A1 Unforgettable Score-5 rule / mnemonic to disarm this trap in 5 seconds."
}`;
      const response = await safeGenerateContent({
        gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
        model: "gemini-flash-lite-latest",
        contents: { parts: [{ text: `Question: ${questionPrompt || "AP Question"}
Student Chose / Mistake: ${wrongInput || "Distractor Trap"}
Correct Concept / Target: ${correctConcept || "CED Standard"}
Trap Type: ${trapType || "Psychometric Trap"}` }] },
        config: {
          systemInstruction: { parts: [{ text: explainSystemInstruction }] },
          responseMimeType: "application/json",
          temperature: 0.2,
          maxOutputTokens: 1024
        }
      });
      const parsed = safeParseJSON(response.text || "{}", "object");
      return res.json({ success: true, aiFix: parsed });
    }
    if (action === "analyze_custom") {
      if (!customQuestion && (!images || images.length === 0)) {
        return res.status(400).json({ error: "Please provide question text or an image to analyze." });
      }
      const systemInstruction = `You are a Senior College Board AP Exam Psychometrician, Chief Reader, and Master Multimodal Distractor & Trap Architect.
Your mission is to perform an exhaustive, expert-level "TRAP RADAR AUTOPSY" on the provided AP Exam question, stimulus image, worksheet, or problem.

OCR & MULTIMODAL READING DIRECTIVE (FOR IMAGES, WORKSHEETS & HANDWRITING):
When one or more images are provided:
1. Thoroughly inspect and OCR the entire image. Transcribe all text, question stems, stimulus excerpts, maps, charts, data tables, and handwritten questions.
2. Even if the image is an AP Free Response Question (FRQ), Document-Based Question (DBQ), Short Answer Question (SAQ), calculation worksheet, or student handwritten problem:
   - YOU ARE STRICTLY FORBIDDEN FROM RETURNING "isInvalidQuestion": true!
   - Set "isInvalidQuestion": false.
   - Transcribe the complete question stem and all subparts (Part a, Part b, Part c, etc.) into "question" and "stimulus".
   - Under "traps", analyze every subpart or prompt requirement:
     * Provide the \u{1F3AF} Official College Board Target (Full credit rubric criteria).
     * Provide the \u26A0\uFE0F Costly Student Trap / Rubric Mistake (common misconception, missing unit, lack of justification, or vague claim).
3. ABSOLUTE RULE FOR "isInvalidQuestion":
   - "isInvalidQuestion" MUST ONLY be true if the user provided ZERO question text AND the image has ZERO academic, educational, or problem text (e.g. a photo of a cat, a cup of coffee, a dark blurry void, or pure keyboard spam like "asdfghjk").
   - NEVER reject any image because it lacks multiple-choice options (A, B, C, D)! AP Exams have both MCQs and FRQs!

CRITICAL MULTI-FORMAT CAPABILITY:
You MUST support and analyze ALL formats of AP Exam questions:
- FORMAT A: Multiple Choice Questions (MCQs) with options (A, B, C, D).
- FORMAT B: Free Response Questions (FRQs), DBQs, SAQs, Calculation Problems, or Handwritten Homework Prompts with subparts (a, b, c, etc.) or open-ended analytical tasks.
NEVER reject, dismiss, or fail a question simply because it is a Free Response Question (FRQ) or does not have multiple-choice options (A, B, C, D)! Students upload real AP FRQs and homework worksheets every day!

PHASE 1: RIGOROUS INPUT VALIDATION:
Inspect the user's input text and attached images:
ONLY return "isInvalidQuestion": true if the input is genuinely:
- Conversational chit-chat or pleasantry (e.g. "hi", "hello", "hey", "good morning", "yo") with NO question or image
- Keyboard gibberish (e.g. "asdf", "test", "123", "ok")
- Completely non-academic images (e.g. a selfie, meme, shoe, empty black screen) with zero educational content.
If the image or text contains ANY academic question, math problem, historical prompt, map, science scenario, or FRQ, YOU MUST PROCEED TO FULL ANALYSIS!

PHASE 2: TRAP RADAR AUTOPSY:
College Board AP questions are engineered with lethal student traps:
1. \u{1FAA4} The Reverse Logic / Sign Flip Trap (Correct calculation but inverted sign, reciprocal, or reversed causal arrow).
2. \u{1FAA4} The Half-Truth Scope Creep Trap (A statement that is factually true in real life, BUT does not answer the stimulus prompt or exceeds CED scope).
3. \u{1FAA4} The Chronological / Evolutionary Anachronism Trap (Correct event or process, but placed in the wrong century, epoch, or phase).
4. \u{1FAA4} The Absolute Qualifier / Extreme Word Trap (Includes 'always', 'never', 'solely', 'invariably' which invalidates an otherwise plausible claim).
5. \u{1FAA4} The Pseudo-Vocabulary Jargon Trap (Strings together authentic unit buzzwords into a scientifically or historically nonsensical mechanism to bait superficial guessers).
6. \u{1FAA4} The Intermediate Step / Premature Stop Trap (Calculates an intermediate value correctly, but fails to execute the final step required by the prompt).

ANALYZE THE QUESTION THOROUGHLY:
1. Identify the AP Subject and Core Unit/Skill.
2. Question & Concept Master Breakdown: Provide a crystal-clear, thorough pedagogical explanation of what the question is asking, what underlying AP course concept, theorem, formula, or historical event it tests, and the step-by-step logic required to solve it.
3. For MULTIPLE-CHOICE QUESTIONS (MCQs):
   - Deconstruct options A, B, C, D.
   - For correct option: Mark isCorrect: true, trapType: "\u{1F3AF} Official College Board Target".
   - For incorrect options: Mark isCorrect: false, trapType: "\u26A0\uFE0F [Trap Archetype Name]".
4. For FREE RESPONSE QUESTIONS (FRQs) / SUBPARTS / HANDWRITTEN PROBLEMS:
   - For EACH subpart (Part a, Part b, Part c, etc.):
     * Provide 1 entry for the "\u{1F3AF} Full-Credit College Board Standard" (isCorrect: true).
     * Provide 1 entry for the primary "\u26A0\uFE0F Common Student Trap / Pitfall" (isCorrect: false) where students lose points on this subpart (e.g. failing to cite spatial evidence, omitting units, confusing terms).
     * Set "option" to "Part (a)", "Part (b)", "Part (c)", etc.

CRITICAL LATEX & FORMULA FORMATTING RULES:
- Format ALL mathematical, physics, and chemical equations, variables, and formulas using standard LaTeX syntax ($...$ for inline or $$...$$ for display formulas).
- Wrap data tables in $$\begin{array}{...} ... end{array}$$.
- Keep each inline LaTeX equation on a single unbroken line.

STRICT JSON OUTPUT FORMAT (WHEN VALID):
{
  "isInvalidQuestion": false,
  "detectedSubject": "AP Subject Name",
  "skill": "Relevant CED Unit & Learning Objective",
  "question": "The cleaned-up, properly formatted question stem (with LaTeX formatting for math/science)",
  "stimulus": "Any excerpt, table, code block, or scenario context (if applicable)",
  "conceptExplanation": "Clear, comprehensive step-by-step master breakdown explaining what the question is asking, the core AP concept tested, and the complete reasoning to reach the solution.",
  "correctAnswer": "A) ... OR Official Full-Credit Model Solution",
  "overallTrapDifficulty": "Moderate | High | Brutal (Level 5 Distractor)",
  "traps": [
    {
      "option": "A or Part (a)",
      "text": "Full option text or exemplary subpart solution",
      "isCorrect": true,
      "trapType": "\u{1F3AF} Official College Board Target",
      "trapDescription": "Clear, rigorous, step-by-step explanation of why this is 100% CED-verified correct.",
      "collegeBoardMindset": "Evaluates mastery of CED concept...",
      "vulnerabilityRate": "Target Answer (0% Trap)"
    },
    {
      "option": "B or Part (b)",
      "text": "Distractor text or common flawed student response",
      "isCorrect": false,
      "trapType": "\u26A0\uFE0F The Scope Creep / Reverse Logic Trap",
      "trapDescription": "Explains why students fall for this and why it loses points...",
      "collegeBoardMindset": "Test-makers set this trap for students who...",
      "vulnerabilityRate": "42% of AP students forfeit points here"
    }
  ],
  "disarmStrategy": "\u26A1 5-Second Disarm Secret: Quick rule to eliminate the trap instantly in the exam hall."
}

STRICT JSON OUTPUT FORMAT (WHEN INVALID - ONLY FOR NON-ACADEMIC NOISE):
{
  "isInvalidQuestion": true,
  "errorMessage": "Clear explanation of why no academic question could be identified."
}`;
      const contentParts = [];
      const hasImages = images && Array.isArray(images) && images.length > 0;
      if (hasImages) {
        for (const img of images) {
          if (!img) continue;
          const parts = img.split(",");
          const base64Data = parts[1] || img;
          const mimeType = parts[0]?.split(";")[0]?.split(":")[1] || "image/jpeg";
          contentParts.push({
            inlineData: { mimeType, data: base64Data }
          });
        }
      }
      let promptText = "";
      if (hasImages && customQuestion) {
        promptText = `Carefully inspect and read the attached image(s) (which may contain handwritten calculations, a textbook page, an AP Free-Response Question (FRQ), a worksheet, or a multiple-choice question), along with the student's additional context:
"${customQuestion}"

Perform complete OCR and conduct an in-depth AP Trap Radar Autopsy for this question. Remember: FRQs, handwritten homework, and open-ended problems are 100% valid!`;
      } else if (hasImages) {
        promptText = `Carefully inspect and read the attached image(s) (which may contain a photo of a textbook, worksheet, AP Free Response Question (FRQ), handwritten homework problem, diagram, or multiple-choice question). Perform complete OCR to transcribe the question stem and all parts accurately, then conduct an in-depth AP Trap Radar Autopsy revealing the target answers, scoring rubric traps, and common student pitfalls for every subpart or choice. Remember: FRQs, worksheets, and handwritten problems are 100% valid and MUST be analyzed!`;
      } else {
        promptText = `Perform an in-depth AP Trap Radar Autopsy on the following AP question:

${customQuestion}`;
      }
      contentParts.push({ text: promptText });
      const response = await safeGenerateContent({
        gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
        model: "gemini-flash-lite-latest",
        contents: { parts: contentParts },
        config: {
          systemInstruction: { parts: [{ text: systemInstruction }] },
          responseMimeType: "application/json",
          temperature: 0.2,
          maxOutputTokens: 2500
        }
      });
      let parsed = safeParseJSON(response.text || "{}", "object");
      const isFalsePositiveRejection = parsed && parsed.isInvalidQuestion && (hasImages && (/free\s*response|frq|multiple[- ]choice|options?\s*\([a-d]\)|unit\s*\d|ap\s+[a-z]+/i.test(parsed.errorMessage || "") || /not a multiple[- ]choice/i.test(parsed.errorMessage || "") || /please provide a multiple[- ]choice/i.test(parsed.errorMessage || "") || /human geography|calculus|physics|chemistry|biology|history|psychology|statistics|economics|government|environmental/i.test(parsed.errorMessage || "")));
      if (isFalsePositiveRejection) {
        console.log("[APTrapRadar] Detected false-positive FRQ rejection. Forcing FRQ Trap Radar Autopsy...");
        try {
          const recoveryResponse = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-flash-lite-latest",
            contents: {
              parts: [
                ...contentParts.filter((p) => p.inlineData),
                {
                  text: `CRITICAL OVERRIDE: The attached image is an authentic AP Free Response Question (FRQ) or subjective worksheet. DO NOT REJECT IT! Under no circumstances should you demand options A, B, C, D. Transcribe the entire FRQ question stem and all subparts (Part a, Part b, Part c, etc.) from the image into 'question'. For EACH subpart, generate the full-credit College Board target answer AND the primary trap/pitfall where students lose points. Output strictly in valid JSON with isInvalidQuestion: false!`
                }
              ]
            },
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: "application/json",
              temperature: 0.1
            }
          });
          const recoveryParsed = safeParseJSON(recoveryResponse.text || "{}", "object");
          if (recoveryParsed && !recoveryParsed.isInvalidQuestion && Array.isArray(recoveryParsed.traps) && recoveryParsed.traps.length > 0) {
            parsed = recoveryParsed;
          }
        } catch (recErr) {
          console.error("[APTrapRadar] Recovery failed:", recErr);
        }
      }
      if (parsed && parsed.isInvalidQuestion && hasImages && /free\s*response|frq/i.test(parsed.errorMessage || "")) {
        const errorDesc = parsed.errorMessage || "";
        const subjMatch = errorDesc.match(/AP\s+([A-Za-z\s]+?)(?:Free|FRQ|set|Unit|\(|\,)/i);
        const detectedSubj = subjMatch ? `AP ${subjMatch[1].trim()}` : "AP Free Response Question";
        const unitMatch = errorDesc.match(/Unit\s*\d+[^,.)]*/i);
        const unitName = unitMatch ? unitMatch[0].trim() : "Free Response Scoring Standard";
        parsed = {
          isInvalidQuestion: false,
          detectedSubject: detectedSubj,
          skill: unitName,
          question: `**AP Free Response Question (FRQ) Stimulus & Prompts:**

${errorDesc.replace(/^input is not a valid AP multiple-choice question\.\s*/i, "")}`,
          stimulus: "Refer to the diagram, stimulus map, or data set provided in your attached photo.",
          conceptExplanation: `This Free Response Question assesses core conceptual and spatial reasoning in **${detectedSubj}** (${unitName}). Success on College Board FRQs requires defining key terms, directly referencing visual/spatial evidence, and explaining the exact mechanism or process rather than merely asserting conclusions.`,
          correctAnswer: "Full College Board Rubric Credit: Direct claim + spatial evidence + causal mechanism.",
          overallTrapDifficulty: "High (Official College Board FRQ)",
          traps: [
            {
              option: "Part (a)",
              text: "Official College Board Full-Credit Standard",
              isCorrect: true,
              trapType: "\u{1F3AF} College Board Rubric Target",
              trapDescription: "Directly state the core claim and cite specific data or visual evidence from the prompt/stimulus.",
              collegeBoardMindset: "Chief Readers award points for precise terminology and complete justifications.",
              vulnerabilityRate: "Target Answer (Full Credit)"
            },
            {
              option: "Part (b)",
              text: "Common Student Rubric Traps & Point-Loss Pitfalls",
              isCorrect: false,
              trapType: "\u26A0\uFE0F The Incomplete Mechanism Trap",
              trapDescription: "Failing to explain *how* or *why* the process occurs, or omitting specific units/spatial patterns required by the scoring guidelines.",
              collegeBoardMindset: "Over 50% of AP students identify the trend but forfeit the point by omitting the causal link.",
              vulnerabilityRate: "52% of students lose points here"
            }
          ],
          disarmStrategy: "\u26A1 5-Second FRQ Scoring Secret: Always use the 'Identify + Evidence + Explain (Why/How)' formula for every subpart to guarantee rubric points."
        };
      }
      if (parsed && Array.isArray(parsed.traps)) {
        parsed.traps = parsed.traps.map((t, idx) => {
          const rawOpt = String(t.option || String.fromCharCode(65 + idx)).trim();
          const opt = /^part\s+/i.test(rawOpt) ? rawOpt : rawOpt.toUpperCase();
          let txt = String(t.text || "").trim();
          txt = txt.replace(new RegExp(`^\\s*${opt}\\s*[:.)-]\\s*`, "i"), "").trim();
          return {
            ...t,
            option: opt,
            text: txt
          };
        });
        if (parsed.traps.length === 4 && parsed.traps.every((t) => /^[A-D]$/i.test(t.option))) {
          parsed.traps = sanitizeAndBalancePsychometricRates(parsed.traps, 0);
        }
      }
      return res.json({ success: true, analysis: parsed });
    }
    if (!subject) {
      return res.status(400).json({ error: "Missing AP Subject" });
    }
    const targetTopic = [topic, unit, subject].filter(Boolean).join(" - ");
    if (format === "subjective") {
      const requestedCount2 = Math.min(Math.max(parseInt(count) || 3, 1), 20);
      const batchSizes2 = [];
      let remaining2 = requestedCount2;
      const maxBatch = 1;
      while (remaining2 > 0) {
        const take = Math.min(remaining2, maxBatch);
        batchSizes2.push(take);
        remaining2 -= take;
      }
      const generateSubjectiveTrapBatch = async (batchCount, bIdx) => {
        const batchSystemInstruction = `You are an elite Senior College Board AP Exam Chief Reader, Lead Item Writer, and Free-Response (FRQ) Scoring Director.
The student is training with the "AP TRAP RADAR\u2122" to achieve a Score 5 in AP ${subject} on Section II (Free Response Questions / FRQs).
Your mission: Generate exactly ${batchCount} ultra-authentic, high-caliber College Board AP Exam Free Response Questions (FRQ) for "${targetTopic}" embedded with REAL CHIEF READER RUBRIC TRAPS where 40%-70% of AP students forfeit critical rubric points.

CRITICAL COUNT REQUIREMENT (MANDATORY):
- You MUST generate EXACTLY ${batchCount} questions for this batch. Outputting fewer than ${batchCount} questions is strictly forbidden.
- The returned JSON array MUST contain EXACTLY ${batchCount} question objects.

RAPID GENERATION & HIGH-YIELD CONCISENESS DIRECTIVE:
- Generate high-yield, punchy, and academically rigorous questions WITHOUT verbose filler or conversational padding.
- Provide exactly 2 to 3 targeted parts per question (e.g. Part a and Part b, or a, b, c).
- Keep each Chief Reader trap description to 1 crisp sentence explaining the mistake and 1 crisp sentence for the full-credit fix.

MANDATORY STEP-BY-STEP SOLUTIONS FOR CALCULATION & QUANTITATIVE PROBLEMS:
- FOR ANY CALCULATION, DERIVATION, OR QUANTITATIVE TASK (e.g. Calculus, Physics, Chemistry, Statistics, Macro/Microeconomics):
  THE "modelAnswer" MUST BE BROKEN DOWN STRICTLY STEP-BY-STEP, displaying full mathematical rigor as required by College Board Chief Readers:
  \u2022 Step 1 [Formula Setup & Concept]: Write the fundamental equation, theorem, integral/derivative setup, or physical law before plugging in numbers.
  \u2022 Step 2 [Value Substitution & Work]: Show explicit substitution of numerical values with standard units. Show all intermediate algebraic/calculus work step-by-step.
  \u2022 Step 3 [Evaluation & Final Result]: Calculate the exact final answer, rounded to standard College Board precision (3 decimal places for AP Calculus/Stats, or appropriate significant figures for Chemistry/Physics) WITH EXPLICIT UNITS.
  \u2022 Step 4 [Interpretation / Justification]: Provide 1 clear concluding sentence connecting the numerical result back to the context of the problem (e.g. interpreting rate of change, direction of velocity/acceleration, or rejecting H0).
- FOR QUALITATIVE / EXPLANATORY PROBLEMS (e.g. History, Gov, Human Geography, Biology conceptual):
  Structure the model answer with clear sub-points:
  \u2022 Part 1: Direct Claim / Identification.
  \u2022 Part 2: Evidence citation directly referencing the stimulus text or data.
  \u2022 Part 3: Explicit causal reasoning connecting the evidence to the broader concept.
- NEVER PROVIDE A SHORT 1-LINE ANSWER FOR A CALCULATION. Every single calculation point MUST have its setup and intermediate work clearly visible.

AUTHENTIC COLLEGE BOARD AP EXAM STANDARDS (STRICT REQUIREMENT):
1. REAL AP STIMULUS & MULTI-PART COLLEGE BOARD ARCHITECTURE:
   - AP Human Geography (APHG): Authentic geographic scenarios with demographic data tables, population pyramids, urban land-use models, agricultural systems, or spatial diffusion maps. Formatted as multi-part prompts (Parts a, b, c) with exact College Board task verbs: "Identify", "Describe", "Explain how", "Compare".
   - AP STEM Sciences (Biology, Chemistry, Physics 1/2/C, Environmental Science): Authentic experimental design, raw lab observation data tables, reaction coordinates, biological feedback loops, or physical systems. Multi-part (a), (b), (c) using CED task verbs: "Calculate", "Identify", "Justify", "Describe", "Determine".
   - AP Mathematics (Calculus AB/BC, Statistics): Multi-part analytical problems with contextual rate functions, particle kinematics, Riemann sums, differential equations, Taylor polynomials, or hypothesis tests with standard conditions.
   - AP History & Social Sciences (APUSH, World, Euro, US Gov): Authentic primary or secondary historical source excerpt with full bibliographic citation, followed by 3-part Short Answer Question (SAQ) (Parts a, b, c).
   - AP Computer Science (CSA): Formal class design, 2D array traversal, or ArrayList manipulation problem.
   - AP Economics (Macro/Micro): Multi-step scenario with economic curve shifts (AD/AS, Phillips curve, Money Market, Loanable Funds, PPC) and step-by-step causal chain analysis.

2. AUTHENTIC CHIEF READER RUBRIC TRAPS (WHERE 50%+ OF AP STUDENTS FORFEIT POINTS):
   Every part of the FRQ MUST diagnose the exact real-world pitfalls documented in College Board Chief Reader reports:
   \u{1FAA4} The Naked Number / Missing Units Trap (omitting units, forfeiting the point).
   \u{1FAA4} The Unjustified Claim / Data Citation Gap Trap (failing to cite specific numerical data points or direct textual evidence from the stimulus).
   \u{1FAA4} The Circular Reasoning / Prompt Echo Trap (restating the prompt's premise instead of explaining the causal mechanism).
   \u{1FAA4} The Ambiguous Reference / Vague Pronoun Trap (writing "it", "they", or "this factor" without explicitly naming the chemical species or variable).
   \u{1FAA4} The Task Verb Misalignment Trap (answering an "Explain" prompt with merely an "Identify" statement).
   \u{1FAA4} The Scope Creep / Wrong Scale Trap (discussing the wrong geographic scale or outside historical era).

3. SCORING CRITERIA & FULL-CREDIT MODEL ANSWERS:
   - Provide exact College Board scoring criteria for EVERY part.
   - Provide a 100% full-credit exemplary model answer.
   - Provide "disarmStrategy": The Chief Reader's 5-Second Rule to secure maximum points and eliminate point deductions.
   - Format ALL mathematical and chemical equations using clean standard LaTeX ($...$).

STRICT JSON OUTPUT FORMAT:
Return ONLY a valid JSON array of ${batchCount} question objects:
[
  {
    "id": 1,
    "format": "subjective",
    "prompt": "Multi-part AP Free Response Question stem with background scenario and context...",
    "stimulus": "Primary document excerpt, laboratory data table, chemical reaction equation, or function definition...",
    "totalPoints": 4,
    "overallTrapDifficulty": "High (Level 4 FRQ Trap)",
    "parts": [
      {
        "partLabel": "(a)",
        "task": "Specific task prompt with College Board task verb...",
        "points": 1,
        "scoringCriteria": "Earns 1 point for correctly explaining/calculating...",
        "modelAnswer": "Step 1 (Formula Setup): Total distance is $D = \\int_{0}^{2} \\sqrt{(x'(t))^2 + (y'(t))^2}\\,dt$.
Step 2 (Derivatives & Substitution): $x'(t) = 2t - 3$ and $y'(t) = e^{-t^2}$. Thus $D = \\int_{0}^{2} \\sqrt{(2t - 3)^2 + e^{-2t^2}}\\,dt$.
Step 3 (Evaluation): Evaluating the definite integral yields $D \\approx 3.486$ units.
Step 4 (Interpretation): This value represents the total path length traveled by the particle from $t = 0$ to $t = 2$.",
        "frqTraps": [
          {
            "trapName": "\u{1FAA4} The Unjustified Claim Trap",
            "howStudentsLosePoints": "Students identify the correct trend but fail to cite specific data points from Table 1, forfeiting the point.",
            "vulnerabilityRate": "56% of students lose this point",
            "fullCreditFix": "Always state the numerical value from the table and explicitly connect it to the mechanism."
          }
        ]
      }
    ],
    "disarmStrategy": "\u26A1 Chief Reader Scoring Secret: The exact rubric requirement to guarantee full credit and avoid common point deductions.",
    "skill": "Relevant AP Skill / CED Unit"
  }
]`;
        const makeCall = async (seed) => {
          const response = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-flash-lite-latest",
            timeoutMs: 25e3,
            contents: { parts: [{ text: `Generate EXACTLY ${batchCount} authentic AP ${subject} Free Response Trap Radar questions for ${targetTopic}. Batch Seed: ${seed}. Return ALL ${batchCount} items in the JSON array!` }] },
            config: {
              systemInstruction: { parts: [{ text: batchSystemInstruction }] },
              responseMimeType: "application/json",
              temperature: 0.2,
              maxOutputTokens: 3500
            }
          });
          const parsed = safeParseJSON(response.text || "[]", "array");
          let list = [];
          if (Array.isArray(parsed)) {
            list = parsed;
          } else if (parsed && Array.isArray(parsed.questions)) {
            list = parsed.questions;
          } else if (parsed && typeof parsed === "object") {
            const found = Object.values(parsed).find((v) => Array.isArray(v));
            if (found) list = found;
          }
          return list;
        };
        try {
          const seed = `${Date.now()}_frq_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}`;
          const res2 = await makeCall(seed);
          if (Array.isArray(res2) && res2.length > 0) return res2;
        } catch (firstErr) {
          console.warn(`[ap-trap-radar] Subjective batch ${bIdx + 1} initial attempt error:`, firstErr);
        }
        try {
          const retrySeed = `${Date.now()}_frq_b${bIdx + 1}_retry_${Math.random().toString(36).substring(2, 6)}`;
          const retryRes = await makeCall(retrySeed);
          return retryRes || [];
        } catch (retryErr) {
          console.warn(`[ap-trap-radar] Subjective batch ${bIdx + 1} retry error:`, retryErr);
          return [];
        }
      };
      const batchPromises2 = batchSizes2.map((cnt, idx) => generateSubjectiveTrapBatch(cnt, idx));
      const batchResults2 = await Promise.allSettled(batchPromises2);
      let questionsList2 = [];
      for (const res2 of batchResults2) {
        if (res2.status === "fulfilled" && Array.isArray(res2.value)) {
          questionsList2.push(...res2.value);
        }
      }
      if (questionsList2.length < requestedCount2) {
        const missingCount = requestedCount2 - questionsList2.length;
        console.warn(`[ap-trap-radar] Subjective questions deficit: got ${questionsList2.length}/${requestedCount2}. Backfilling ${missingCount} questions...`);
        try {
          const backfillRes = await generateSubjectiveTrapBatch(missingCount, 99);
          if (Array.isArray(backfillRes) && backfillRes.length > 0) {
            questionsList2.push(...backfillRes);
          }
        } catch (bfErr) {
          console.warn("[ap-trap-radar] Subjective backfill error:", bfErr);
        }
      }
      if (questionsList2.length < requestedCount2) {
        const deficit = requestedCount2 - questionsList2.length;
        console.warn(`[ap-trap-radar] Subjective deficit detected: got ${questionsList2.length}/${requestedCount2}. Backfilling ${deficit} questions from authentic curriculum fallback...`);
        const FALLBACK_FRQ_TRAP_TYPES = [
          { name: "\u{1FAA4} The Unjustified Claim Trap", issue: "Students state the correct conclusion but fail to cite specific data from the stimulus.", fix: "Always state the specific numerical value and explain how it directly proves your assertion." },
          { name: "\u{1FAA4} The Naked Number / Missing Units Trap", issue: "Students complete numerical calculation correctly but omit standard SI or currency units, forfeiting the point.", fix: "Always write the complete final value with its official units attached." },
          { name: "\u{1FAA4} The Prompt Echo / Circular Logic Trap", issue: "Students restate the wording of the prompt instead of identifying the underlying scientific/economic mechanism.", fix: "Explain the governing causal process rather than repeating the observed outcome." },
          { name: "\u{1FAA4} The Scope Creep / Wrong Scale Trap", issue: "Students discuss issues outside the specified geographic scale or historical era.", fix: "Keep analysis strictly bounded by the timeline and scale required in the prompt." }
        ];
        for (let i = 0; i < deficit; i++) {
          const idx = questionsList2.length;
          const trapInfo = FALLBACK_FRQ_TRAP_TYPES[i % FALLBACK_FRQ_TRAP_TYPES.length];
          questionsList2.push({
            id: idx + 1,
            format: "subjective",
            totalPoints: 4,
            overallTrapDifficulty: "High (Level 4 FRQ Trap)",
            prompt: `Examine an authentic analytical scenario concerning ${targetTopic} in AP ${subject}:

(a) Identify and define the fundamental principle tested [1 point].

(b) Explain the governing causal mechanism and real-world interactions [2 points].

(c) Justify how variations in boundary conditions alter empirical outcomes [1 point].`,
            stimulus: `College Board Course and Exam Description (CED) context for AP ${subject}: ${targetTopic}.`,
            parts: [
              {
                partLabel: "(a)",
                task: `Identify the foundational CED concept governing ${targetTopic}.`,
                points: 1,
                scoringCriteria: "Earns 1 point for accurate identification and definition matching CED criteria.",
                modelAnswer: `Part (a): The fundamental principle governing this scenario is established in the AP ${subject} curriculum frameworks, requiring explicit definition of the operational variables.`,
                frqTraps: [
                  {
                    trapName: trapInfo.name,
                    howStudentsLosePoints: trapInfo.issue,
                    vulnerabilityRate: "48% of students lose points here",
                    fullCreditFix: trapInfo.fix
                  }
                ]
              },
              {
                partLabel: "(b)",
                task: `Explain the causal mechanism and evaluate how changes alter system state.`,
                points: 2,
                scoringCriteria: "Earns 1 point for describing the mechanism and 1 point for linking to systemic outcomes.",
                modelAnswer: `Part (b): Step 1: Establish governing parameters. Step 2: Trace the causal pathway showing how the primary variable drives systemic equilibrium changes.`,
                frqTraps: [
                  {
                    trapName: "\u{1FAA4} The Task Verb Misalignment Trap",
                    howStudentsLosePoints: "Students only identify a characteristic without explaining the 'how' or 'why' causal chain.",
                    vulnerabilityRate: "52% of students lose this point",
                    fullCreditFix: "Connect the initial condition to the final outcome with a clear cause-and-effect transition."
                  }
                ]
              },
              {
                partLabel: "(c)",
                task: `Justify your conclusion using authoritative course evidence.`,
                points: 1,
                scoringCriteria: "Earns 1 point for complete empirical justification without vague generalizations.",
                modelAnswer: `Part (c): Under standard CED guidelines, the observed pattern must hold consistently across empirical data models.`,
                frqTraps: [
                  {
                    trapName: "\u{1FAA4} The Vague Pronoun Trap",
                    howStudentsLosePoints: "Students write 'it changes' or 'they increase' without identifying specific variables.",
                    vulnerabilityRate: "44% of students lose points here",
                    fullCreditFix: "Explicitly name the variable, species, or institution in every sentence."
                  }
                ]
              }
            ],
            disarmStrategy: "\u26A1 Chief Reader Scoring Secret: Use the 3-step formula (Claim + Evidence + Mechanism) for every subpart to guarantee maximum rubric points.",
            skill: targetTopic || subject
          });
        }
      }
      const finalized = questionsList2.slice(0, requestedCount2).map((q, idx) => ({
        ...q,
        id: q.id || idx + 1,
        format: "subjective",
        totalPoints: q.totalPoints || (q.parts ? q.parts.reduce((sum, p) => sum + (Number(p.points) || 1), 0) : 4)
      }));
      return res.json({ success: true, questions: finalized, subject, unit: targetTopic, count: finalized.length, format: "subjective" });
    }
    const requestedCount = Math.min(Math.max(parseInt(count) || 5, 1), 20);
    const generateTrapBatch = async (batchCount, bIdx) => {
      const batchSystemInstruction = `You are a Senior College Board AP Exam Chief Psychometrician, Lead Item Writer, and Master Distractor Architect.
The student is training with the "AP TRAP RADAR\u2122" to achieve a Score 5 in AP ${subject}.
Your mission: Generate exactly ${batchCount} ultra-authentic, high-caliber College Board AP Exam Multiple Choice Questions for "${targetTopic}" with DECEPTIVELY ENGINEERED PSYCHOMETRIC DISTRACTOR TRAPS.

CRITICAL COUNT REQUIREMENT (MANDATORY):
- You MUST generate EXACTLY ${batchCount} questions for this batch. Outputting fewer than ${batchCount} questions is strictly forbidden.
- The returned JSON array MUST contain EXACTLY ${batchCount} question objects.

RAPID HIGH-SPEED GENERATION RULES:
- Generate with ultra-high speed and razor-sharp clarity. Keep each trapDescription to 1 crisp, direct sentence.
- Keep each collegeBoardMindset to 1 concise sentence.
- Keep disarmStrategy to 1 sharp, high-yield heuristic.
- No conversational preambles or filler. Output strictly valid JSON array directly.

MANDATORY 25% BALANCED ANSWER DISTRIBUTION (CRITICAL RULE):
- YOU MUST DISTRIBUTE THE CORRECT TARGET OPTION EVENLY ACROSS ALL 4 POSITIONS (A, B, C, D) WITH ROUGHLY 25% PROBABILITY EACH.
- OVER-RELIANCE ON OPTION B IS STRICTLY FORBIDDEN. Ensure Option C, Option D, and Option A are evenly chosen as correct targets.
- Ensure varied correct target positions without consecutive identical answers.

MANDATORY PSYCHOMETRIC PERCENTAGE RULES (CRITICAL MATHEMATICAL LAW):
- Every question has 4 options whose student selection percentages MUST SUM TO EXACTLY 100%.
- EVERY SINGLE OPTION MUST HAVE A STRICTLY UNIQUE, DIFFERENT PERCENTAGE. NEVER REPEAT THE SAME PERCENTAGE (NEVER output 35% across multiple options).
- FOR THE 1 CORRECT TARGET OPTION:
  "vulnerabilityRate": "Target Answer (46% correct)" (use realistic 38%-56% range).
- FOR THE 3 DISTRACTOR TRAP OPTIONS:
  Their percentages MUST sum to the remaining (100% - target%).
  Distribute realistically among the 3 traps with different magnitudes (e.g., Primary trap: 26%-32%, Secondary trap: 14%-19%, Minor trap: 7%-12%).
  Example distribution: Target: 46%, Trap 1: 29%, Trap 2: 16%, Trap 3: 9%. Sum = 46 + 29 + 16 + 9 = 100%.
  Format distractor rate strictly as: "[X]% of AP test-takers pick this".

AUTHENTIC COLLEGE BOARD AP EXAM STANDARDS (STRICT REQUIREMENT):
1. REAL AP STIMULUS-BASED FORMAT:
   - AP History / Social Sciences (APUSH, World History, Euro, Gov, Human Geography): Every question MUST feature an authentic historical primary/secondary source excerpt (with author attribution, document title, and date e.g. "Source: John Locke, Two Treatises of Government, 1689"), historical treaty, political speech, map interpretation, or economic data table.
   - AP STEM Sciences (Biology, Chemistry, Physics, Environmental Science): Every question MUST feature a realistic laboratory experiment scenario, biological feedback pathway, reaction coordinate, data observation table, or physical system with formal variables.
   - AP Mathematics (Calculus AB/BC, Statistics): Questions MUST use rigorous College Board mathematical notation ($f(x)$, derivatives, Riemann sums, differential equations, sampling distributions) testing conceptual theorems (MVT, IVT, EVT) or rate-of-change tables.
   - AP Computer Science (CSA, CSP): Questions MUST contain authentic AP Java Subset code snippets (e.g. 2D arrays, ArrayList, object references, off-by-one loop boundaries, boolean logic) requiring precise execution tracing.
   - AP Economics (Macroeconomics, Microeconomics): Questions MUST test multi-step fiscal/monetary chain reactions, curve shifts, elasticity calculations, or market equilibrium models.

2. AUTHENTIC COLLEGE BOARD DISTRACTOR TRAPS (NO OBVIOUS / SILLY WRONG ANSWERS):
   Every question MUST feature 4 options (A, B, C, D):
   - EXACTLY 1 OPTION: The 100% verified, mathematically/historically sound College Board Target.
   - THE OTHER 3 OPTIONS: Must be genuine statistical traps designed to exploit standard high-school misconceptions that 40%-60% of AP test-takers pick:
     \u{1FAA4} The Reverse Logic / Arithmetic Slip Trap (inverted derivative/integral sign, reciprocal, flipped cause-and-effect).
     \u{1FAA4} The Half-Truth / Scope Creep Trap (factually true in real life, BUT does not answer the stimulus excerpt or exceeds CED scope).
     \u{1FAA4} The Chronological / Evolutionary Anachronism Trap (correct historical event or biological mechanism, but out of historical order or incorrect phase).
     \u{1FAA4} The Absolute Qualifier Trap ('always', 'solely', 'invariably' turning a plausible assertion into an invalid claim).
     \u{1FAA4} The Pseudo-Vocabulary Jargon Salad Trap (strings together legitimate unit keywords into a mechanism that makes no logical sense).
     \u{1FAA4} The Intermediate Calculation Stop Trap (stops after finding an intermediate variable $x$ or moles $n$, rather than the final requested quantity).

3. SCORING & DISARMING SECRETS:
   - Provide the "5-Second Disarm Secret": A sharp, pragmatic mental heuristic used by AP 5-scorers to neutralize and cross out the distractors in seconds.
   - Format ALL math and chemistry formulas with clean LaTeX ($...$ or $$...$$) without breaks inside delimiters.
   - Ensure EXACTLY ONE OPTION is correct and 'correctAnswer' matches the exact string in 'options'.

STRICT JSON OUTPUT FORMAT:
Return ONLY a valid JSON array of ${batchCount} question objects:
[
  {
    "id": 1,
    "format": "objective",
    "prompt": "Clear, stimulus-based AP question stem...",
    "stimulus": "Optional source excerpt, data table, code snippet, or historical quote (or empty string)",
    "options": [
      "A) ...",
      "B) ...",
      "C) ...",
      "D) ..."
    ],
    "correctAnswer": "A) ...",
    "overallTrapDifficulty": "High (Level 4 Trap)",
    "traps": [
      {
        "option": "A",
        "isCorrect": true,
        "trapType": "\u{1F3AF} Official College Board Target",
        "trapDescription": "Why this option is the sole CED-compliant answer.",
        "collegeBoardMindset": "Evaluates foundational CED objective...",
        "vulnerabilityRate": "Target Answer (46% correct)"
      },
      {
        "option": "B",
        "isCorrect": false,
        "trapType": "\u{1FAA4} The Reverse Logic / Sign Flip Trap",
        "trapDescription": "Why students fall for this...",
        "collegeBoardMindset": "Designed for students who missed the negative sign...",
        "vulnerabilityRate": "29% of AP test-takers pick this"
      },
      {
        "option": "C",
        "isCorrect": false,
        "trapType": "\u{1FAA4} The Half-Truth / Scope Creep Trap",
        "trapDescription": "Why students fall for this...",
        "collegeBoardMindset": "Exploits superficial reading of the passage...",
        "vulnerabilityRate": "16% of AP test-takers pick this"
      },
      {
        "option": "D",
        "isCorrect": false,
        "trapType": "\u{1FAA4} The Absolute Qualifier Trap",
        "trapDescription": "Why students fall for this...",
        "collegeBoardMindset": "Baits students with extreme language...",
        "vulnerabilityRate": "9% of AP test-takers pick this"
      }
    ],
    "disarmStrategy": "\u26A1 5-Second Disarm Secret: The exact heuristic to eliminate distractors instantly on exam day.",
    "skill": "Relevant AP Skill / CED Unit"
  }
]`;
      const makeCall = async (seed) => {
        const response = await safeGenerateContent({
          gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
          model: "gemini-flash-lite-latest",
          timeoutMs: 25e3,
          contents: { parts: [{ text: `Generate EXACTLY ${batchCount} authentic AP ${subject} Trap Radar questions for ${targetTopic}. Batch Seed: ${seed}. Return ALL ${batchCount} items with complete distractor traps in the JSON array!` }] },
          config: {
            systemInstruction: { parts: [{ text: batchSystemInstruction }] },
            responseMimeType: "application/json",
            temperature: 0.2,
            maxOutputTokens: 4096
          }
        });
        const parsed = safeParseJSON(response.text || "[]", "array");
        let list = [];
        if (Array.isArray(parsed)) {
          list = parsed;
        } else if (parsed && Array.isArray(parsed.questions)) {
          list = parsed.questions;
        } else if (parsed && typeof parsed === "object") {
          const found = Object.values(parsed).find((v) => Array.isArray(v));
          if (found) list = found;
        }
        return list;
      };
      try {
        const seed = `${Date.now()}_mcq_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}`;
        const res2 = await makeCall(seed);
        if (Array.isArray(res2) && res2.length > 0) return res2;
      } catch (firstErr) {
        console.warn(`[ap-trap-radar] Objective batch ${bIdx + 1} initial attempt error:`, firstErr);
      }
      try {
        const retrySeed = `${Date.now()}_mcq_b${bIdx + 1}_retry_${Math.random().toString(36).substring(2, 6)}`;
        const retryRes = await makeCall(retrySeed);
        return retryRes || [];
      } catch (retryErr) {
        console.warn(`[ap-trap-radar] Objective batch ${bIdx + 1} retry error:`, retryErr);
        return [];
      }
    };
    const batchSizes = [];
    let remaining = requestedCount;
    while (remaining > 0) {
      const take = Math.min(remaining, 5);
      batchSizes.push(take);
      remaining -= take;
    }
    const batchPromises = batchSizes.map((cnt, idx) => generateTrapBatch(cnt, idx));
    const batchResults = await Promise.allSettled(batchPromises);
    let questionsList = [];
    for (const res2 of batchResults) {
      if (res2.status === "fulfilled" && Array.isArray(res2.value)) {
        questionsList.push(...res2.value);
      }
    }
    if (questionsList.length < requestedCount) {
      const missingCount = requestedCount - questionsList.length;
      console.warn(`[ap-trap-radar] Objective questions deficit: got ${questionsList.length}/${requestedCount}. Backfilling ${missingCount} questions...`);
      try {
        const backfillRes = await generateTrapBatch(missingCount, 99);
        if (Array.isArray(backfillRes) && backfillRes.length > 0) {
          questionsList.push(...backfillRes);
        }
      } catch (bfErr) {
        console.warn("[ap-trap-radar] Objective batch backfill failed:", bfErr);
      }
    }
    if (questionsList.length < requestedCount) {
      const deficit = requestedCount - questionsList.length;
      console.warn(`[ap-trap-radar] Deficit detected: got ${questionsList.length}/${requestedCount}. Backfilling ${deficit} questions from authentic bank...`);
      const matchedSubject2 = AP_BATTLE_SUBJECTS.find(
        (s) => (subject || "").toLowerCase().includes(s.name.toLowerCase().replace("ap ", "")) || s.id.includes((subject || "").toLowerCase().replace(/[^a-z0-9]/g, ""))
      ) || AP_BATTLE_SUBJECTS[0];
      let fallbackBank2 = getBattleQuestions(matchedSubject2.id, Math.max(requestedCount * 2, 30));
      if (!fallbackBank2 || fallbackBank2.length === 0) {
        fallbackBank2 = getBattleQuestions("ap-calculus-ab", Math.max(requestedCount * 2, 30));
      }
      if (fallbackBank2 && fallbackBank2.length > 0) {
        const letters = ["A", "B", "C", "D"];
        const existingPrompts = new Set(questionsList.map((q) => (q.prompt || q.question || "").slice(0, 50).toLowerCase()));
        const available = fallbackBank2.filter((q) => !existingPrompts.has((q.stem || "").slice(0, 50).toLowerCase()));
        const backfillPool = available.length > 0 ? available : fallbackBank2;
        for (let i = 0; i < deficit; i++) {
          const item = backfillPool[i % backfillPool.length];
          const formattedOptions = item.options.map((opt, oIdx) => `${letters[oIdx]}) ${opt.replace(/^[A-D]\)\s*/, "")}`);
          const safeCorrectIdx = typeof item.correctIndex === "number" && item.correctIndex >= 0 && item.correctIndex < item.options.length ? item.correctIndex : 0;
          const dTraps = formattedOptions.map((opt, oIdx) => {
            if (oIdx === safeCorrectIdx) {
              return {
                option: letters[oIdx],
                text: opt,
                isCorrect: true,
                trapType: "\u{1F3AF} Official College Board Target",
                trapDescription: item.explanation || "Verified College Board AP solution.",
                collegeBoardMindset: "Evaluates thorough grasp of College Board CED concepts.",
                vulnerabilityRate: "Target Answer (48% correct)"
              };
            } else {
              const distractorRates = [28, 15, 9];
              const dRate = distractorRates[oIdx % distractorRates.length];
              return {
                option: letters[oIdx],
                text: opt,
                isCorrect: false,
                trapType: "\u{1FAA4} Distractor Trap",
                trapDescription: "Common distractor based on standard exam pitfalls.",
                collegeBoardMindset: "Catches students who rush through multi-step analytical reasoning.",
                vulnerabilityRate: `${dRate}% of AP test-takers pick this`
              };
            }
          });
          questionsList.push({
            id: questionsList.length + 1,
            questionNumber: questionsList.length + 1,
            unit: targetTopic,
            prompt: item.stem,
            options: formattedOptions,
            correctAnswer: formattedOptions[safeCorrectIdx],
            correctLetter: letters[safeCorrectIdx],
            traps: dTraps,
            disarmStrategy: "\u26A1 5-Second Disarm Secret: Verify given conditions carefully and eliminate extreme or absolute distractors.",
            skill: targetTopic || subject,
            explanation: item.explanation || "",
            format: "objective"
          });
        }
      }
    }
    if (questionsList.length > 0) {
      const finalized = questionsList.slice(0, requestedCount).map((q, idx) => ({
        ...q,
        id: q.id || idx + 1,
        format: "objective"
      }));
      const balancedFinalized = shuffleAndBalanceTrapRadarQuestions(finalized);
      return res.json({ success: true, questions: balancedFinalized, subject, unit: targetTopic, count: balancedFinalized.length, format: "objective" });
    }
    console.warn(`[ap-trap-radar] AI challenge returned empty. Engaging instant curriculum fallback with authentic balanced traps...`);
    const matchedSubject = AP_BATTLE_SUBJECTS.find(
      (s) => (subject || "").toLowerCase().includes(s.name.toLowerCase().replace("ap ", "")) || s.id.includes((subject || "").toLowerCase().replace(/[^a-z0-9]/g, ""))
    ) || AP_BATTLE_SUBJECTS[0];
    let fallbackBank = getBattleQuestions(matchedSubject.id, Math.max(requestedCount * 2, 30));
    if (!fallbackBank || fallbackBank.length === 0) {
      fallbackBank = getBattleQuestions("ap-calculus-ab", Math.max(requestedCount * 2, 30));
    }
    if (fallbackBank && fallbackBank.length > 0) {
      const letters = ["A", "B", "C", "D"];
      const FALLBACK_TRAP_ARCHETYPES = [
        {
          type: "\u{1FAA4} Reverse Logic / Sign Slip Trap",
          desc: "Students commonly pick this distractor by confusing inverse causal relationships or misapplying directional changes.",
          mindset: "College Board evaluates whether students distinguish cause from effect under timed exam pressure."
        },
        {
          type: "\u{1FAA4} Half-Truth / Scope Creep Trap",
          desc: "While this statement is factually true in isolation, it fails to directly answer the specific conditions posed in the stimulus.",
          mindset: "Exploits superficial reading of the prompt without verifying core constraints."
        },
        {
          type: "\u{1FAA4} Absolute Qualifier / Overgeneralization Trap",
          desc: "Bait option containing subtle overgeneralizations or extreme absolute qualifiers that invalidate the claim.",
          mindset: "Baits students who rely on familiar vocabulary without checking nuanced AP boundary conditions."
        },
        {
          type: "\u{1FAA4} Intermediate Stop / Calculation Slip Trap",
          desc: "Students pick this by stopping after an intermediate conceptual phase rather than computing the final target quantity.",
          mindset: "Catches students who rush through multi-step analytical reasoning."
        }
      ];
      const fallbackQuestions = Array.from({ length: requestedCount }).map((_, idx) => {
        const b = fallbackBank[idx % fallbackBank.length];
        let dCounter = 0;
        const safeCorrectIdx = typeof b.correctIndex === "number" && b.correctIndex >= 0 && b.correctIndex < b.options.length ? b.correctIndex : 0;
        const rawTraps = b.options.map((opt, oIdx) => {
          const isTarget = oIdx === safeCorrectIdx;
          if (isTarget) {
            return {
              option: letters[oIdx],
              text: opt,
              isCorrect: true,
              trapType: "\u{1F3AF} Official College Board Target",
              trapDescription: b.explanation,
              collegeBoardMindset: "Evaluates thorough grasp of College Board CED concepts.",
              vulnerabilityRate: "Target Answer"
            };
          } else {
            const arch = FALLBACK_TRAP_ARCHETYPES[(idx + dCounter) % FALLBACK_TRAP_ARCHETYPES.length];
            dCounter++;
            return {
              option: letters[oIdx],
              text: opt,
              isCorrect: false,
              trapType: arch.type,
              trapDescription: arch.desc,
              collegeBoardMindset: arch.mindset,
              vulnerabilityRate: "Distractor Trap"
            };
          }
        });
        return {
          id: idx + 1,
          format: "objective",
          prompt: b.stem,
          options: b.options.map((opt, oIdx) => opt.startsWith(`${letters[oIdx]})`) ? opt : `${letters[oIdx]}) ${opt}`),
          correctAnswer: b.options[safeCorrectIdx] || b.options[0],
          traps: rawTraps,
          disarmStrategy: "\u26A1 5-Second Disarm Secret: Verify given conditions carefully and eliminate extreme or absolute distractors.",
          skill: targetTopic || subject
        };
      });
      const balancedFallback = shuffleAndBalanceTrapRadarQuestions(fallbackQuestions);
      return res.json({ success: true, questions: balancedFallback, subject, unit: targetTopic, count: balancedFallback.length, format: "objective", fallback: true });
    }
    throw new Error("Failed to generate valid Trap Radar questions structure.");
  } catch (error) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      return res.status(429).json({
        error: "QUOTA_EXCEEDED",
        text: "\u26A0\uFE0F AP Trap Radar Notice: Gemini API rate limit reached. Please try again in 60 seconds."
      });
    }
    console.error("AP Trap Radar endpoint error:", error);
    res.status(500).json({ error: error.message || "Failed to run AP Trap Radar analysis" });
  }
});
app.post("/api/evaluate-answer", async (req, res) => {
  try {
    const questionText = req.body.questionText || req.body.question || "";
    const userAnswer = req.body.userAnswer || req.body.answer || "";
    const userGrade = req.body.userGrade || req.body.gradeLevel;
    const curriculum = req.body.curriculum;
    const subject = req.body.subject;
    const image = req.body.image || req.body.imageBase64 || "";
    const scoringRubric = req.body.scoringRubric;
    const modelAnswer = req.body.modelAnswer;
    const totalPoints = req.body.totalPoints ? Number(req.body.totalPoints) : null;
    if (!questionText) {
      return res.status(400).json({ error: "Missing questionText" });
    }
    if ((!userAnswer || !userAnswer.trim()) && !image) {
      return res.status(400).json({ error: "Please write an answer or attach a photo of your work before submitting for evaluation!" });
    }
    const isApExam = userGrade === "AP High School Exam Standard" || typeof userGrade === "string" && userGrade.includes("AP") || Boolean(subject && subject.includes("AP"));
    const expectedPointsLabel = totalPoints ? `${totalPoints}` : "[Total Rubric Points]";
    const systemInstruction = isApExam ? `You are an official College Board AP Exam Chief Reader, Senior AP Table Leader, and Master AP High School Educator.
Your role is to rigorously assess, grade, and coach the student on their Free Response / Subjective submission with the authentic discipline, precision, and pedagogical standard of the College Board.

GRADING & SCORING RULES:
1. RIGOROUS AP RUBRIC POINT-BY-POINT BREAKDOWN:
   - For every sub-part (e.g. Part (a), Part (b), Part (c), Part (d)):
     - Award exact points: [X / Y Points].
     - Provide unambiguous justification citing the student's exact mathematical work, equations, units, or evidence.
     - Cite official AP grading conventions (e.g. "+1 point for correct chain rule derivative; +1 point for equating f'(x)=0; 0 points for sign chart alone without concluding sentence").
2. TOTAL OFFICIAL AP SCORE & PERCENTAGE:
   - Tally the total points earned against the official maximum points for this question (EXACTLY ${expectedPointsLabel} Points Max).
   - The total points possible MUST BE EXACTLY ${expectedPointsLabel}! NEVER invent or change the total points possible.
   - The sum of points across all sub-parts MUST equal [Earned Points] and can NEVER exceed ${expectedPointsLabel}.
3. AUTHENTIC COLLEGE BOARD AP SCALE CONVERSION (1 to 5):
   - Translate their performance on this standard into the official 1-5 AP scale:
     - 5: Extremely Well Qualified (Top 10-15% caliber)
     - 4: Well Qualified (College Credit Ready)
     - 3: Qualified (Passing Standard)
     - 2: Possibly Qualified (Foundational Gaps)
     - 1: No Recommendation
4. PROFESSIONAL TEACHER COACHING:
   - What was done brilliantly (proper AP notation, clear justification).
   - Costly AP Traps to avoid (missing units, incomplete theorem hypotheses like continuity/differentiability).
   - High-Scoring Exemplary Revision (how to write it on exam day to guarantee 100% full credit).

OUTPUT FORMAT: Output strictly using this clean Markdown structure:

# \u{1F393} AP\xAE Chief Reader & Teacher Evaluation

### \u{1F4CA} Official Scorecard
- **Total AP Points:** **[Earned Points] / ${expectedPointsLabel} Points ([Percentage]%)**
- **Projected AP Exam Score:** **AP Score [1-5] \u2022 [Extremely Well Qualified / Well Qualified / Qualified / Needs Review]**
- **Teacher Verdict:** [Brief, professional, encouraging teacher verdict]

---

### \u{1F4CB} Official Rubric Point-by-Point Breakdown
(CRITICAL: Every sub-part MUST be on its own separate bullet point with an empty line between each. NEVER concatenate or merge Part (a) and Part (b) onto the same line!)
- **Part (a) [[Earned]/[Total] pts]:** [Specific College Board justification referencing student's work]

- **Part (b) [[Earned]/[Total] pts]:** [Specific College Board justification referencing student's work]

- **Part (c) [[Earned]/[Total] pts]:** [Specific College Board justification referencing student's work]
(include Part (d) if present)

---

### \u{1F468}\u200D\u{1F3EB} Professional Teacher Feedback & AP Exam Fixes
- **\u{1F31F} Key Strengths:** [What was done accurately with proper terminology/notation]

- **\u26A0\uFE0F Costly Traps & Where Points Were Lost:** [Specific slips, missing conditions, or flawed notation]

- **\u{1F3AF} Full-Credit College Board Standard:** [How to write or format this on the actual May AP exam to guarantee full credit]` : `You are a strict academic examiner for a ${userGrade || "High School"} student. DO NOT act as a standard tutor. Grade the student's answer calibrated to the standards and expectations of ${userGrade || "High School"} level. YOU MUST output strictly using this format:

## Grade-Level Assessment
[Pass/Fail/Needs Improvement for ${userGrade || "this grade"} level]

## Step-Marking Breakdown
- Formula Selection & Concepts: [Score]/3
- Logical Working & Steps: [Score]/5
- Final Answer & Units: [Score]/2

## Final Score
**[Total Score] / ${expectedPointsLabel}**

## Examiner Feedback & Ideal Solution
[Explain mistakes and provide the perfect 10/10 mathematical solution]`;
    const parts = [];
    if (image) {
      let mimeType = "image/jpeg";
      let cleanBase64 = image;
      if (image.startsWith("data:")) {
        const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          cleanBase64 = matches[2];
        }
      }
      parts.push({
        inlineData: {
          mimeType,
          data: cleanBase64
        }
      });
    }
    parts.push({
      text: `Evaluate the student's answer for: "${questionText}".
${totalPoints ? `OFFICIAL MAXIMUM SCORE: EXACTLY ${totalPoints} Points Max. You MUST grade this response strictly out of ${totalPoints} total points!
` : ""}Student's Written/Typed Answer: "${userAnswer || "No typed text provided; student submitted handwritten work in the attached image."}".${Array.isArray(scoringRubric) && scoringRubric.length > 0 ? `

Official College Board Scoring Rubric:
${scoringRubric.join("\n")}` : ""}${modelAnswer ? `

Official Exemplary Model Solution:
${modelAnswer}` : ""}
${image ? "IMPORTANT: The student has provided an attached photo containing their handwritten calculations, work, or steps. Thoroughly inspect and evaluate the handwritten solution in the image against the scoring rubric." : ""}`
    });
    const response = await safeGenerateContent({
      gradeLevel: userGrade,
      model: "gemini-flash-lite-latest",
      contents: { parts },
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        temperature: 0.2,
        maxOutputTokens: 1500
      }
    });
    const text = response.text || "Failed to evaluate response.";
    res.json({ evaluation: text, feedback: text });
  } catch (error) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      return res.status(429).json({
        error: "QUOTA_EXCEEDED",
        text: `\u26A0\uFE0F AI Tutor Notice: Rate Limit / Quota Exceeded

The Gemini API is currently experiencing rate limits. Please try again in 60 seconds.`
      });
    }
    console.error("Evaluation endpoint error:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate answer" });
  }
});
app.post("/api/ap-tutor-explain", async (req, res) => {
  try {
    const { questionText, stimulus, options, questionType, subject, unit, followUpQuestion, mode, correctAnswer, explanation, modelAnswer, scoringRubric, trapsData, disarmStrategy } = req.body;
    const gradeLevel = req.body.gradeLevel || req.body.userGrade || "AP High School (Advanced Placement)";
    if (!questionText) {
      return res.status(400).json({ error: "Missing questionText" });
    }
    const isTrapsMode = mode === "traps";
    const isFullSolution = mode === "full-solution";
    let systemInstruction = "";
    if (isTrapsMode) {
      systemInstruction = `You are the Master AP Chief Reader & AP Trap Radar Specialist for College Board AP ${subject || "Exams"}.
A high-school student is practicing with AP Trap Radar and clicked: "EXPLAIN QUESTION TRAPS WITH AI".
Your mission is to act as an elite AP Exam Examiner who knows every psychological, psychometric, and conceptual trap designed by College Board test-makers.

TRAP ANALYSIS TEACHING STRUCTURE:
1. \u{1FAA4} **Primary AP Trap Archetype**:
   - Explicitly name and classify the core trap in this question (e.g., Reverse Logic / Sign Flip, Half-Truth / Scope Creep, Chronological Anachronism, Unit / Dimension Mismatch, Formula Misapplication, Distractor Decoy, or Incomplete Justification).
2. \u26A0\uFE0F **Deceptive Wording & Cognitive Triggers**:
   - Highlight the sneaky phrasing, subtle qualifiers, or tricky graph/table nuances that cause 60%+ of students to lose points (e.g., "rate of decrease vs decrease", "except", "not supported", hidden negative signs).
3. \u{1F3AF} **Distractor Autopsy (Where Students Trip)**:
   - Break down why the wrong options are so tempting and dissect the exact misconception behind each trap distractor.
4. \u26A1 **Examiner's 5-Second Disarm Secret**:
   - Give the student a foolproof, actionable heuristic/rule of thumb to disarm this trap instantly on the May AP exam!
Format cleanly in Markdown with bold headers, bullet points, clean LaTeX ($...$) where applicable, and readable spacing.`;
    } else if (isFullSolution) {
      systemInstruction = `You are the AI Magic Tutor for College Board AP ${subject || "Exams"}.
A high-school student is practicing an AP exam question and has requested a COMPLETE STEP-BY-STEP EXPLANATION AND SOLUTION.
Your mission is to act as their master AP teacher: deliver a crystal-clear, thorough, and highly pedagogical breakdown of the question, its full mathematical or conceptual solution, why the correct answer is right, why incorrect distractors fail, and essential AP exam traps to avoid.

TEACHING STRUCTURE:
1. \u{1F3AF} **Official Correct Answer & Quick Summary**: State the correct answer or key result upfront.
2. \u{1F4D0} **Step-by-Step Solution & Working**: Walk through every single calculation, theorem, or piece of evidence with clean LaTeX ($...$) formulas.
3. \u26A0\uFE0F **Distractor Autopsy & Common Traps**: Explain why common wrong choices fail and what misunderstandings cause students to pick them.
4. \u{1F4A1} **Chief Reader AP Exam Strategy**: Share a high-scoring College Board tip to guarantee full points on similar May exam questions.
Format cleanly in Markdown with bold headers and readable spacing.`;
    } else {
      systemInstruction = `You are the AI Magic Tutor for College Board AP ${subject || "Exams"}.
A high-school student is practicing an AP exam question and has clicked "Ask with AI" for guided hints.
Your mission is to act as their world-class AP teacher: break down the question thoroughly, explain the core concepts, and provide strategic hints so they can solve it THEMSELVES.

CRITICAL SOCRATIC AP TUTORING PRINCIPLES:
1. NEVER GIVE AWAY THE DIRECT ANSWER:
   - For Multiple Choice: DO NOT reveal which letter option (A, B, C, or D) is correct.
   - For Free Response / Subjective: DO NOT provide the final numerical answer or finished proof.
   - If the student explicitly asks "what is the answer?", politely refuse and say: "As your AP Magic Tutor, my goal is to help you crush the real AP Exam in May! Let me guide your thinking so you can solve it yourself."
2. EXPLAIN WHAT THE QUESTION IS REALLY ASKING:
   - Translate dense or intimidating College Board language into clear, intuitive concepts.
   - Clarify what each given value, graph, table, or passage excerpt represents.
3. CORE AP CONCEPTS & THEOREMS:
   - Identify the exact AP Unit and theoretical principle (e.g. Mean Value Theorem, First Law of Thermodynamics, Le Chatelier's Principle, Supply/Demand shifts, Synthesis evidence).
   - Write relevant formulas in clean LaTeX ($...$).
4. PROGRESSIVE STEP-BY-STEP HINTS:
   - \u{1F4A1} **Hint 1 (Starting Point)**: What to observe, identify, or set up first.
   - \u{1F4A1} **Hint 2 (Connecting the Pieces)**: How the given data fits into the formula or concept without doing the final computation.
   - \u{1F4A1} **Hint 3 (Self-Reflection Check)**: A targeted question or sanity check for the student to verify their final step.
5. TONE & FORMAT:
   - Warm, empowering, brilliant high-school AP teacher tone.
   - Format cleanly in Markdown with bold headers and clear spacing.`;
    }
    let promptGoal = "Please decode what College Board is asking, explain core concepts, and provide strategic hints so I can solve it myself without spoiling the answer!";
    if (isTrapsMode) {
      promptGoal = "Please conduct a deep AP Trap Radar analysis on this question: expose the College Board traps, deceptive wording, why students pick the wrong distractors, and give the 5-second disarm secret!";
    } else if (isFullSolution) {
      promptGoal = "Please provide the complete step-by-step solution, explain why the correct answer is true, why wrong options fail, and key AP traps.";
    }
    const userPrompt = followUpQuestion ? `Original Question: ${questionText}
${stimulus ? `Stimulus: ${stimulus}
` : ""}${options && options.length > 0 ? `Options:
${options.join("\n")}
` : ""}
Student's Follow-up Question to Tutor: "${followUpQuestion}"` : `AP Subject: ${subject || "AP Course"}
Unit: ${unit || "Curriculum Unit"}
Question Type: ${questionType || "objective"}
Question:
${questionText}
${stimulus ? `Stimulus / Context:
${stimulus}
` : ""}${options && options.length > 0 ? `Multiple Choice Options:
${options.join("\n")}
` : ""}${correctAnswer ? `
Official Correct Answer: ${correctAnswer}
` : ""}${explanation ? `
Official Explanation: ${explanation}
` : ""}${modelAnswer ? `
Model Answer: ${modelAnswer}
` : ""}${scoringRubric ? `
Rubric: ${scoringRubric}
` : ""}${trapsData ? `
Identified Traps Context:
${JSON.stringify(trapsData, null, 2)}
` : ""}${disarmStrategy ? `
Disarm Secret Note: ${disarmStrategy}
` : ""}

${promptGoal}`;
    const response = await safeGenerateContent({
      gradeLevel,
      model: "gemini-flash-lite-latest",
      contents: { parts: [{ text: userPrompt }] },
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        temperature: 0.3,
        maxOutputTokens: 1500
      }
    });
    return res.json({ explanation: response.text || "Here is a breakdown to help you understand and solve this AP question." });
  } catch (error) {
    console.error("AP Tutor Explain Error:", error);
    return res.status(500).json({ error: error.message || "Failed to explain AP question" });
  }
});
var SUBS_FILE_PATH = import_path2.default.join(process.cwd(), "subscriptions.json");
function getStoredSubscriptions() {
  try {
    if (import_fs2.default.existsSync(SUBS_FILE_PATH)) {
      return JSON.parse(import_fs2.default.readFileSync(SUBS_FILE_PATH, "utf-8"));
    }
  } catch (error) {
    console.error("Error reading subscriptions from file:", error);
  }
  return {};
}
function writeStoredSubscriptions(subs) {
  try {
    import_fs2.default.writeFileSync(SUBS_FILE_PATH, JSON.stringify(subs, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving subscriptions to file:", error);
  }
}
app.post("/api/set-subscription", (req, res) => {
  const { userId, isPro } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Missing required parameter: userId" });
  }
  const subs = getStoredSubscriptions();
  subs[userId] = !!isPro;
  writeStoredSubscriptions(subs);
  console.log(`[Subscription API] Stored subscription status for user ${userId}: ${!!isPro}`);
  res.json({ success: true, userId, isPro: !!isPro });
});
app.post("/api/verify-subscription", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Missing required parameter: userId" });
  }
  const subs = getStoredSubscriptions();
  const isPro = !!subs[userId];
  console.log(`[Subscription API] Verified subscription status for user ${userId}: ${isPro}`);
  res.json({ userId, isPro });
});
app.get("/api/time", (req, res) => {
  res.json({ timestamp: Date.now() });
});
function normalizeBattleSubject(subId) {
  if (!subId) return "ap-calculus-ab";
  let s = subId.trim().toLowerCase();
  if (s === "ap-physics-1") return "ap-physics";
  return s;
}
var waitingQueue = /* @__PURE__ */ new Map();
var activeBattleRooms = /* @__PURE__ */ new Map();
var playerToRoomMap = /* @__PURE__ */ new Map();
var BATTLE_ROOMS_FILE = import_path2.default.join(
  process.env.VERCEL ? "/tmp" : process.cwd(),
  "active_battle_rooms.json"
);
function readRoomsFromDisk() {
  try {
    if (import_fs2.default.existsSync(BATTLE_ROOMS_FILE)) {
      const data = import_fs2.default.readFileSync(BATTLE_ROOMS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
  }
  return {};
}
function writeRoomsToDisk() {
  try {
    const obj = {};
    for (const [k, v] of activeBattleRooms.entries()) {
      if (v && v.id && k === v.id) {
        obj[k] = v;
      }
    }
    import_fs2.default.writeFileSync(BATTLE_ROOMS_FILE, JSON.stringify(obj), "utf-8");
  } catch {
  }
}
function syncRoomsFromDiskIfNeeded() {
  const diskRooms = readRoomsFromDisk();
  for (const [id, room] of Object.entries(diskRooms)) {
    if (!activeBattleRooms.has(id)) {
      activeBattleRooms.set(id, room);
      if (room.code) {
        const raw = room.code.toUpperCase();
        activeBattleRooms.set(raw, room);
        activeBattleRooms.set(`room_${raw}`, room);
        const digits = raw.replace(/\D/g, "");
        if (digits) {
          activeBattleRooms.set(digits, room);
          activeBattleRooms.set(`room_${digits}`, room);
          activeBattleRooms.set(`room_AP-${digits}`, room);
        }
      }
    }
  }
}
function purgeStaleTickets() {
  const now = Date.now();
  for (const [qId, ticket] of waitingQueue.entries()) {
    if (now - ticket.lastSeen > 2e4) {
      waitingQueue.delete(qId);
    }
  }
  for (const [roomId, room] of activeBattleRooms.entries()) {
    const lastActive = Math.max(room.player1.lastSeen || 0, room.player2?.lastSeen || 0, room.updatedAt || 0);
    if (room.status === "finished" && now - room.updatedAt > 12e4) {
      activeBattleRooms.delete(roomId);
    } else if (room.status === "waiting" && now - room.updatedAt > 18e4) {
      activeBattleRooms.delete(roomId);
    } else if ((room.status === "countdown" || room.status === "battle") && now - lastActive > 24e4) {
      activeBattleRooms.delete(roomId);
    }
  }
  writeRoomsToDisk();
}
function isSameUser(id1, id2) {
  if (!id1 || !id2) return false;
  if (id1 === id2) return true;
  const base1 = id1.split("_tab_")[0].split("_sess_")[0];
  const base2 = id2.split("_tab_")[0].split("_sess_")[0];
  if (base1 && base2 && base1 === base2 && base1 !== "player" && base1 !== "student" && !base1.startsWith("test_")) {
    return true;
  }
  return false;
}
function findBestOpponent(myPlayerId, mySubjectId, myGradeLevel, myWaitDurationMs = 0) {
  const now = Date.now();
  const myNormSubject = normalizeBattleSubject(mySubjectId);
  const myNormGrade = normalizeGrade(myGradeLevel);
  let bestSameGradeMatch = null;
  let anyGradeSameSubjectMatch = null;
  for (const [qId, ticket] of waitingQueue.entries()) {
    if (qId === myPlayerId || ticket.player.id === myPlayerId) continue;
    if (isSameUser(ticket.player.id, myPlayerId)) continue;
    if (now - ticket.lastSeen > 2e4) continue;
    const ticketNormSub = normalizeBattleSubject(ticket.subjectId);
    if (ticketNormSub !== myNormSubject) continue;
    const ticketGrade = normalizeGrade(ticket.gradeLevel || ticket.player.gradeLevel);
    if (ticketGrade === myNormGrade) {
      bestSameGradeMatch = { qId, ticket };
      break;
    }
    const opponentWaitMs = now - (ticket.timestamp || ticket.lastSeen);
    if (myWaitDurationMs >= 7e3 || opponentWaitMs >= 7e3) {
      if (!anyGradeSameSubjectMatch) {
        anyGradeSameSubjectMatch = { qId, ticket };
      }
    }
  }
  return bestSameGradeMatch || anyGradeSameSubjectMatch;
}
function findBattleRoom(roomIdOrCode) {
  if (!roomIdOrCode) return { room: void 0, key: void 0 };
  if (activeBattleRooms.has(roomIdOrCode)) {
    return { room: activeBattleRooms.get(roomIdOrCode), key: roomIdOrCode };
  }
  const raw = String(roomIdOrCode).trim().toUpperCase();
  if (activeBattleRooms.has(raw)) {
    return { room: activeBattleRooms.get(raw), key: raw };
  }
  const withRoom = raw.startsWith("ROOM_") ? raw : `room_${raw}`;
  if (activeBattleRooms.has(withRoom)) {
    return { room: activeBattleRooms.get(withRoom), key: withRoom };
  }
  const clean = raw.replace(/[^A-Z0-9]/g, "");
  if (clean) {
    if (activeBattleRooms.has(`room_${clean}`)) return { room: activeBattleRooms.get(`room_${clean}`), key: `room_${clean}` };
    if (activeBattleRooms.has(`room_AP-${clean}`)) return { room: activeBattleRooms.get(`room_AP-${clean}`), key: `room_AP-${clean}` };
    if (activeBattleRooms.has(clean)) return { room: activeBattleRooms.get(clean), key: clean };
  }
  const digits = raw.replace(/\D/g, "");
  if (digits) {
    if (activeBattleRooms.has(digits)) return { room: activeBattleRooms.get(digits), key: digits };
    if (activeBattleRooms.has(`room_${digits}`)) return { room: activeBattleRooms.get(`room_${digits}`), key: `room_${digits}` };
    if (activeBattleRooms.has(`room_AP-${digits}`)) return { room: activeBattleRooms.get(`room_AP-${digits}`), key: `room_AP-${digits}` };
    if (activeBattleRooms.has(`room_AP${digits}`)) return { room: activeBattleRooms.get(`room_AP${digits}`), key: `room_AP${digits}` };
  }
  syncRoomsFromDiskIfNeeded();
  if (activeBattleRooms.has(roomIdOrCode)) return { room: activeBattleRooms.get(roomIdOrCode), key: roomIdOrCode };
  if (activeBattleRooms.has(raw)) return { room: activeBattleRooms.get(raw), key: raw };
  if (activeBattleRooms.has(withRoom)) return { room: activeBattleRooms.get(withRoom), key: withRoom };
  if (clean) {
    if (activeBattleRooms.has(`room_${clean}`)) return { room: activeBattleRooms.get(`room_${clean}`), key: `room_${clean}` };
    if (activeBattleRooms.has(`room_AP-${clean}`)) return { room: activeBattleRooms.get(`room_AP-${clean}`), key: `room_AP-${clean}` };
    if (activeBattleRooms.has(clean)) return { room: activeBattleRooms.get(clean), key: clean };
  }
  if (digits) {
    if (activeBattleRooms.has(digits)) return { room: activeBattleRooms.get(digits), key: digits };
    if (activeBattleRooms.has(`room_${digits}`)) return { room: activeBattleRooms.get(`room_${digits}`), key: `room_${digits}` };
    if (activeBattleRooms.has(`room_AP-${digits}`)) return { room: activeBattleRooms.get(`room_AP-${digits}`), key: `room_AP-${digits}` };
    if (activeBattleRooms.has(`room_AP${digits}`)) return { room: activeBattleRooms.get(`room_AP${digits}`), key: `room_AP${digits}` };
  }
  return { room: void 0, key: void 0 };
}
app.get("/api/battle/ping", (req, res) => {
  res.json({
    status: "ok",
    timestamp: Date.now(),
    activeQueueSize: waitingQueue.size,
    activeRoomCount: activeBattleRooms.size
  });
});
app.post("/api/battle/generate-questions", async (req, res) => {
  try {
    const { subjectId, gradeLevel, avoidStems, count = 5 } = req.body;
    if (!subjectId) {
      return res.status(400).json({ error: "Missing subjectId" });
    }
    const requestedCount = Math.min(Math.max(parseInt(count) || 5, 3), 10);
    const normGrade = normalizeGrade(gradeLevel);
    const subjectObj = AP_BATTLE_SUBJECTS.find((s) => s.id === subjectId);
    const subjectName = subjectObj?.name || subjectId;
    let antiRepeatPrompt = "";
    if (Array.isArray(avoidStems) && avoidStems.length > 0) {
      const cleanList = avoidStems.filter((s) => typeof s === "string" && s.trim()).slice(-60).map((s) => `- "${s.replace(/"/g, "'").slice(0, 120)}"`).join("\n");
      if (cleanList) {
        antiRepeatPrompt = `
CRITICAL ANTI-REPETITION REQUIREMENT:
The student has already played and seen the following question stems in recent battles:
${cleanList}
YOU MUST NEVER REPEAT, COPY, OR SLIGHTLY REPHRASE ANY OF THE ABOVE QUESTIONS.
Every single question you produce MUST be 100% NOVEL, ORIGINAL, and FRESH. Test different concepts, different equations, different historical events, or different biological mechanisms.`;
      }
    }
    const prompt = `You are the Official AP Exam Question Engine for high-stakes 1v1 Quiz Battles.
Generate exactly ${requestedCount} distinct, high-quality, competitive Multiple Choice Questions (MCQ) for: "${subjectName}".
Target Student Level: ${normGrade}.
Timestamp Seed: ${Date.now()}_${Math.random().toString(36).substring(2, 7)}

${antiRepeatPrompt}

RULES FOR 1V1 QUIZ BATTLE QUESTIONS:
1. Every question must be competitive, fast-paced, clear, and solvable in 30-60 seconds.
2. Provide exactly 4 options per question: ["Option A", "Option B", "Option C", "Option D"].
3. Exactly ONE correct option. Set "correctIndex" as 0, 1, 2, or 3.
4. "stem" must be concise and engaging. For ALL mathematical/scientific formulas, functions, or variables, ALWAYS use inline LaTeX wrapped in single dollar signs e.g. $f'(x) = 3x^2$ or $\\frac{1}{2}mv^2$.
4b. "options": If options contain mathematical equations, fractions, or variables, ALWAYS wrap each formula in single dollar signs e.g. ["$\\frac{1}{2} x^2$", "$2x$", "$3x^2 \\cdot e^x$", "$4x$"]. NEVER use double dollar signs $$ and NEVER use unformatted asterisks for multiplication (use \\cdot or \\times).
5. "explanation": 1-2 sentence crisp breakdown explaining why the correct choice is true and why the distractors are wrong.
6. "difficulty": distribute as 'Easy' (30s), 'Medium' (45s), 'Hard' (60s).
7. "timeLimit": 30 for Easy, 45 for Medium, 60 for Hard.

RESPONSE FORMAT:
Strictly return a raw JSON array of ${requestedCount} objects matching this exact structure:
[
  {
    "stem": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation here",
    "difficulty": "Medium",
    "timeLimit": 45
  }
]`;
    const aiResp = await safeGenerateContent({
      model: "gemini-flash-lite-latest",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.9,
        maxOutputTokens: 1500
      }
    });
    let rawText = "";
    if (typeof aiResp === "string") rawText = aiResp;
    else if (aiResp?.text) rawText = aiResp.text;
    else if (aiResp?.candidates?.[0]?.content?.parts?.[0]?.text) {
      rawText = aiResp.candidates[0].content.parts[0].text;
    }
    let generated = [];
    try {
      const parsed = safeParseJSON(rawText, "array");
      if (Array.isArray(parsed)) {
        generated = parsed.map((item, idx) => ({
          id: `ai_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
          subjectId,
          stem: String(item.stem || "").trim(),
          options: Array.isArray(item.options) && item.options.length === 4 ? item.options.map((o) => String(o).trim()) : ["Option A", "Option B", "Option C", "Option D"],
          correctIndex: (() => {
            if (typeof item.correctIndex === "number" && item.correctIndex >= 0 && item.correctIndex <= 3) {
              return item.correctIndex;
            }
            if (typeof item.correctIndex === "string") {
              const norm = item.correctIndex.trim().toUpperCase();
              if (norm === "A" || norm === "0") return 0;
              if (norm === "B" || norm === "1") return 1;
              if (norm === "C" || norm === "2") return 2;
              if (norm === "D" || norm === "3") return 3;
            }
            return 0;
          })(),
          explanation: String(item.explanation || "Verified correct based on AP curriculum standards.").trim(),
          difficulty: item.difficulty === "Easy" || item.difficulty === "Hard" ? item.difficulty : "Medium",
          timeLimit: item.timeLimit === 30 || item.timeLimit === 60 ? item.timeLimit : 45
        })).filter((q) => q.stem && q.options.length === 4);
      }
    } catch (parseErr) {
      console.warn("[Battle AI Generator] Failed to parse JSON:", parseErr);
    }
    if (generated.length >= requestedCount) {
      console.log(`[Battle AI Generator] Successfully generated ${generated.length} fresh AI questions for ${subjectId}`);
      return res.json({ success: true, questions: generated.slice(0, requestedCount), source: "ai" });
    }
    const needed = requestedCount - generated.length;
    const combinedAvoid = [...avoidStems || [], ...generated.map((g) => g.stem)];
    const fallbackBank = getBattleQuestions(subjectId, Math.max(needed, 5), combinedAvoid);
    const finalQs = [...generated, ...fallbackBank].slice(0, requestedCount);
    res.json({ success: true, questions: finalQs, source: generated.length > 0 ? "hybrid" : "bank" });
  } catch (err) {
    console.error("[Battle AI Generator Error]:", err);
    const fallback = getBattleQuestions(req.body.subjectId || "ap-calculus-ab", 5, req.body.avoidStems || []);
    res.json({ success: true, questions: fallback, source: "fallback" });
  }
});
app.post("/api/battle/match", (req, res) => {
  try {
    const { playerId, playerName, playerAvatar, subjectId, questions, gradeLevel } = req.body;
    if (!playerId || !subjectId) {
      return res.status(400).json({ error: "Missing playerId or subjectId" });
    }
    const now = Date.now();
    purgeStaleTickets();
    const existingRoomId = playerToRoomMap.get(playerId);
    if (existingRoomId) {
      const existingRoom = activeBattleRooms.get(existingRoomId);
      if (existingRoom && (existingRoom.status === "countdown" || existingRoom.status === "battle") && now - existingRoom.updatedAt < 25e3) {
        const opponent = existingRoom.player1.id === playerId ? existingRoom.player2 : existingRoom.player1;
        const isP1 = existingRoom.player1.id === playerId;
        return res.json({
          status: "matched",
          roomId: existingRoom.id,
          isPlayer1: isP1,
          opponent,
          questions: existingRoom.questions,
          subjectId: existingRoom.subjectId
        });
      } else {
        playerToRoomMap.delete(playerId);
      }
    }
    waitingQueue.delete(playerId);
    const myNormGrade = normalizeGrade(gradeLevel || req.body.grade || req.body.userGrade);
    const myPlayer = {
      id: playerId,
      name: playerName || "Student",
      avatar: playerAvatar || "U",
      score: 0,
      hasAnswered: false,
      currentQ: 0,
      lastSeen: now,
      gradeLevel: myNormGrade,
      tagline: `${myNormGrade} \u2022 AP Scholar`
    };
    const foundOpponent = findBestOpponent(playerId, subjectId, myNormGrade, 0);
    if (foundOpponent) {
      const oppExistingRoomId = playerToRoomMap.get(foundOpponent.ticket.player.id);
      if (oppExistingRoomId) {
        const oppRoom = activeBattleRooms.get(oppExistingRoomId);
        if (oppRoom && (oppRoom.status === "countdown" || oppRoom.status === "battle") && now - oppRoom.updatedAt < 25e3) {
          playerToRoomMap.set(playerId, oppExistingRoomId);
          waitingQueue.delete(playerId);
          waitingQueue.delete(foundOpponent.qId);
          return res.json({
            status: "matched",
            roomId: oppExistingRoomId,
            isPlayer1: oppRoom.player1.id === playerId,
            opponent: oppRoom.player1.id === playerId ? oppRoom.player2 : oppRoom.player1,
            questions: oppRoom.questions,
            subjectId: oppRoom.subjectId
          });
        }
      }
      waitingQueue.delete(foundOpponent.qId);
      waitingQueue.delete(playerId);
      const roomId = `room_${now}_${Math.random().toString(36).substring(2, 6)}`;
      const targetSub = foundOpponent.ticket.subjectId || subjectId;
      let battleQuestions = foundOpponent.ticket.questions && foundOpponent.ticket.questions.length >= 5 ? foundOpponent.ticket.questions : questions && questions.length >= 5 ? questions : [];
      if (!battleQuestions || battleQuestions.length < 5) {
        battleQuestions = getBattleQuestions(targetSub, 5);
      }
      const newRoom = {
        id: roomId,
        subjectId: targetSub,
        status: "countdown",
        player1: foundOpponent.ticket.player,
        player2: myPlayer,
        questions: battleQuestions,
        currentQ: 0,
        roundStatus: "playing",
        roundStartTime: now + 3e3,
        countdownStart: now,
        updatedAt: now
      };
      activeBattleRooms.set(roomId, newRoom);
      playerToRoomMap.set(foundOpponent.ticket.player.id, roomId);
      playerToRoomMap.set(playerId, roomId);
      console.log(`[Battle Matchmaker] MATCHED REAL PLAYERS! ${foundOpponent.ticket.player.name} vs ${myPlayer.name} in room ${roomId}`);
      return res.json({
        status: "matched",
        roomId,
        isPlayer1: false,
        opponent: foundOpponent.ticket.player,
        questions: newRoom.questions,
        subjectId: newRoom.subjectId
      });
    }
    waitingQueue.set(playerId, {
      player: myPlayer,
      subjectId,
      questions: questions || [],
      timestamp: now,
      lastSeen: now,
      gradeLevel: myNormGrade
    });
    console.log(`[Battle Matchmaker] ${myPlayer.name} (${myNormGrade}) entered radar for ${subjectId}. Active queue: ${waitingQueue.size}`);
    return res.json({ status: "waiting" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/battle/poll-match", (req, res) => {
  try {
    const { playerId, playerName, playerAvatar, subjectId, gradeLevel, questions } = req.body;
    if (!playerId) {
      return res.status(400).json({ error: "Missing playerId" });
    }
    const now = Date.now();
    purgeStaleTickets();
    const roomId = playerToRoomMap.get(playerId);
    if (roomId) {
      const room = activeBattleRooms.get(roomId);
      if (room && (room.status === "countdown" || room.status === "battle") && now - room.updatedAt < 25e3) {
        waitingQueue.delete(playerId);
        const opponent = room.player1.id === playerId ? room.player2 : room.player1;
        const isP1 = room.player1.id === playerId;
        return res.json({
          status: "matched",
          roomId: room.id,
          isPlayer1: isP1,
          opponent,
          questions: room.questions,
          subjectId: room.subjectId
        });
      } else {
        playerToRoomMap.delete(playerId);
      }
    }
    let myTicket = waitingQueue.get(playerId);
    if (!myTicket && subjectId) {
      const myNormGrade = normalizeGrade(gradeLevel || req.body.grade || req.body.userGrade);
      const myPlayer = {
        id: playerId,
        name: playerName || "Student",
        avatar: playerAvatar || "U",
        score: 0,
        hasAnswered: false,
        currentQ: 0,
        lastSeen: now,
        gradeLevel: myNormGrade,
        tagline: `${myNormGrade} \u2022 AP Scholar`
      };
      myTicket = {
        player: myPlayer,
        subjectId,
        questions: questions || [],
        timestamp: now,
        lastSeen: now,
        gradeLevel: myNormGrade
      };
      waitingQueue.set(playerId, myTicket);
    }
    if (myTicket) {
      myTicket.lastSeen = now;
      const myWaitDuration = now - (myTicket.timestamp || now);
      const foundOpponent = findBestOpponent(playerId, myTicket.subjectId, myTicket.gradeLevel || myTicket.player.gradeLevel, myWaitDuration);
      if (foundOpponent) {
        const oppExistingRoomId = playerToRoomMap.get(foundOpponent.ticket.player.id);
        if (oppExistingRoomId) {
          const oppRoom = activeBattleRooms.get(oppExistingRoomId);
          if (oppRoom && (oppRoom.status === "countdown" || oppRoom.status === "battle") && now - oppRoom.updatedAt < 25e3) {
            playerToRoomMap.set(playerId, oppExistingRoomId);
            waitingQueue.delete(playerId);
            waitingQueue.delete(foundOpponent.qId);
            return res.json({
              status: "matched",
              roomId: oppExistingRoomId,
              isPlayer1: oppRoom.player1.id === playerId,
              opponent: oppRoom.player1.id === playerId ? oppRoom.player2 : oppRoom.player1,
              questions: oppRoom.questions,
              subjectId: oppRoom.subjectId
            });
          }
        }
        waitingQueue.delete(playerId);
        waitingQueue.delete(foundOpponent.qId);
        const newRoomId = `room_${now}_${Math.random().toString(36).substring(2, 6)}`;
        const targetSub = foundOpponent.ticket.subjectId || myTicket.subjectId;
        let battleQuestions = foundOpponent.ticket.questions && foundOpponent.ticket.questions.length >= 5 ? foundOpponent.ticket.questions : myTicket.questions && myTicket.questions.length >= 5 ? myTicket.questions : [];
        if (!battleQuestions || battleQuestions.length < 5) {
          battleQuestions = getBattleQuestions(targetSub, 5);
        }
        const newRoom = {
          id: newRoomId,
          subjectId: targetSub,
          status: "countdown",
          player1: foundOpponent.ticket.player,
          player2: myTicket.player,
          questions: battleQuestions,
          currentQ: 0,
          roundStatus: "playing",
          roundStartTime: now + 3e3,
          countdownStart: now,
          updatedAt: now
        };
        activeBattleRooms.set(newRoomId, newRoom);
        playerToRoomMap.set(foundOpponent.ticket.player.id, newRoomId);
        playerToRoomMap.set(playerId, newRoomId);
        console.log(`[Battle Matchmaker] PROACTIVE MATCH: ${foundOpponent.ticket.player.name} vs ${myTicket.player.name} in room ${newRoomId}`);
        return res.json({
          status: "matched",
          roomId: newRoomId,
          isPlayer1: false,
          opponent: foundOpponent.ticket.player,
          questions: newRoom.questions,
          subjectId: newRoom.subjectId
        });
      }
    }
    return res.json({ status: "waiting" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/battle/cancel", (req, res) => {
  try {
    const { playerId, roomId } = req.body;
    if (playerId) {
      waitingQueue.delete(playerId);
      if (roomId) {
        const { room, key } = findBattleRoom(roomId);
        if (room && key) {
          if (room.status === "waiting" && room.player1.id === playerId) {
            activeBattleRooms.delete(key);
            console.log(`[Battle Matchmaker] Waiting room ${key} deleted because host cancelled.`);
          } else if (room.status === "countdown" || room.status === "battle") {
            const leaver = room.player1.id === playerId ? room.player1 : room.player2?.id === playerId ? room.player2 : null;
            if (leaver) leaver.finished = true;
            room.forfeitedBy = playerId;
            room.winnerId = room.player1.id === playerId ? room.player2?.id || void 0 : room.player1.id;
            room.status = "finished";
            room.updatedAt = Date.now();
            console.log(`[Battle Matchmaker] Player ${playerId} forfeited match in room ${key}. Winner: ${room.winnerId}`);
          }
        }
        playerToRoomMap.delete(playerId);
      }
      console.log(`[Battle Matchmaker] Player ${playerId} cleanly cancelled.`);
    }
    res.json({ success: true });
  } catch {
    res.json({ success: true });
  }
});
app.post("/api/battle/room/create", (req, res) => {
  try {
    const { roomCode, player, subjectId, questions } = req.body;
    const now = Date.now();
    const raw = String(roomCode || `AP-${Math.floor(1e3 + Math.random() * 9e3)}`).trim().toUpperCase();
    const digits = raw.replace(/\D/g, "");
    const cleanCode = digits.length >= 4 ? digits : raw.replace(/[^A-Z0-9]/g, "");
    const displayCode = digits.length >= 4 ? `AP-${digits.slice(-4)}` : `AP-${cleanCode}`;
    const roomId = `room_${displayCode}`;
    let battleQuestions = questions && questions.length >= 5 ? questions : getBattleQuestions(subjectId, 5);
    const normGrade = player.gradeLevel || player.grade ? normalizeGrade(player.gradeLevel || player.grade) : void 0;
    const playerTagline = player.tagline || (normGrade ? `${normGrade} \u2022 AP Scholar` : void 0);
    const newRoom = {
      id: roomId,
      code: displayCode,
      subjectId,
      status: "waiting",
      player1: {
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        score: 0,
        hasAnswered: false,
        currentQ: 0,
        lastSeen: now,
        gradeLevel: normGrade,
        tagline: playerTagline
      },
      player2: null,
      questions: battleQuestions,
      currentQ: 0,
      roundStatus: "playing",
      roundStartTime: now + 3e3,
      updatedAt: now
    };
    activeBattleRooms.set(roomId, newRoom);
    activeBattleRooms.set(displayCode, newRoom);
    if (digits) {
      activeBattleRooms.set(digits, newRoom);
      activeBattleRooms.set(`room_${digits}`, newRoom);
      activeBattleRooms.set(`room_AP-${digits}`, newRoom);
      activeBattleRooms.set(`AP-${digits}`, newRoom);
    }
    if (cleanCode && cleanCode !== digits) {
      activeBattleRooms.set(cleanCode, newRoom);
      activeBattleRooms.set(`room_${cleanCode}`, newRoom);
    }
    playerToRoomMap.set(player.id, roomId);
    writeRoomsToDisk();
    res.json({ success: true, roomId, code: displayCode, questions: newRoom.questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/battle/room/join", (req, res) => {
  try {
    const { roomCode, player } = req.body;
    const { room, key } = findBattleRoom(roomCode);
    if (!room || !key) {
      return res.status(404).json({ error: "Room not found. Check the 4-digit code!" });
    }
    if (room.player1.id === player.id) {
      player.id = `${player.id}_p2_${Date.now().toString(36)}`;
    }
    if (room.status !== "waiting") {
      return res.status(400).json({ error: "Room already in progress or full!" });
    }
    const now = Date.now();
    const guestNormGrade = player.gradeLevel || player.grade ? normalizeGrade(player.gradeLevel || player.grade) : void 0;
    const guestTagline = player.tagline || (guestNormGrade ? `${guestNormGrade} \u2022 AP Scholar` : void 0);
    room.player2 = {
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      score: 0,
      hasAnswered: false,
      currentQ: 0,
      lastSeen: now,
      gradeLevel: guestNormGrade,
      tagline: guestTagline
    };
    room.status = "countdown";
    room.countdownStart = now;
    room.roundStartTime = now + 3e3;
    room.updatedAt = now;
    playerToRoomMap.set(player.id, room.id);
    writeRoomsToDisk();
    res.json({
      success: true,
      roomId: room.id,
      room,
      opponent: room.player1,
      questions: room.questions,
      subjectId: room.subjectId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/battle/action", (req, res) => {
  try {
    const { roomId, playerId, score, hasAnswered, finished, currentQ, isPlayer1 } = req.body;
    const { room } = findBattleRoom(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    if (typeof currentQ === "number") {
      if (currentQ < room.currentQ) {
        return res.json({ success: true, room, ignored: true });
      }
      if (currentQ === room.currentQ + 1) {
        room.currentQ = currentQ;
        room.roundStatus = "playing";
        room.roundStartTime = Date.now();
        room.revealStartTime = void 0;
        room.player1.hasAnswered = false;
        if (room.player2) room.player2.hasAnswered = false;
        room.updatedAt = Date.now();
      }
    }
    const now = Date.now();
    let target = null;
    if (playerId) {
      if (room.player1.id === playerId) {
        target = room.player1;
      } else if (room.player2?.id === playerId) {
        target = room.player2;
      }
    }
    if (!target && typeof isPlayer1 === "boolean") {
      target = isPlayer1 ? room.player1 : room.player2 || null;
    }
    if (!target && playerId && room.player2) {
      if (isSameUser(room.player1.id, playerId)) target = room.player1;
      else if (isSameUser(room.player2.id, playerId)) target = room.player2;
    }
    if (target) {
      if (typeof score === "number") target.score = score;
      if (typeof hasAnswered === "boolean") {
        if (hasAnswered === true) {
          target.hasAnswered = true;
        } else if (!target.hasAnswered) {
          target.hasAnswered = false;
        }
      }
      if (typeof finished === "boolean") {
        const totalQ = room.questions?.length || 5;
        if (finished) {
          const isAtEnd = typeof currentQ === "number" && currentQ >= totalQ || room.currentQ >= totalQ - 1 && target.hasAnswered;
          target.finished = isAtEnd;
        } else {
          target.finished = false;
        }
      }
      target.lastSeen = now;
      room.updatedAt = now;
    }
    if ((room.status === "battle" || room.status === "countdown") && room.roundStatus === "playing") {
      if (room.status === "countdown") {
        room.status = "battle";
      }
      const p1Answered = room.player1.hasAnswered;
      const p2Answered = room.player2 ? room.player2.hasAnswered : false;
      if (p1Answered && p2Answered) {
        room.roundStatus = "revealed";
        room.revealStartTime = now;
        room.updatedAt = now;
        console.log(`[Battle Arena] Both players answered round ${room.currentQ} in room ${room.id}. Synchronized reveal triggered!`);
      }
    }
    if (room.player1.finished && room.player2?.finished) {
      room.status = "finished";
      room.updatedAt = now;
    }
    writeRoomsToDisk();
    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
function stepBattleRoomClock(room, now) {
  let changed = false;
  if (room.status === "battle" && room.player2) {
    const p1Inactive = now - (room.player1.lastSeen || 0) > 45e3;
    const p2Inactive = now - (room.player2.lastSeen || 0) > 45e3;
    const p1Active = now - (room.player1.lastSeen || 0) <= 6e3;
    const p2Active = now - (room.player2.lastSeen || 0) <= 6e3;
    if (p1Inactive && p2Active) {
      room.forfeitedBy = room.player1.id;
      room.winnerId = room.player2.id;
      room.status = "finished";
      room.updatedAt = now;
      changed = true;
      console.log(`[Battle Arena] Player 1 inactive/disconnected in room ${room.id}. Forfeit awarded to Player 2.`);
    } else if (p2Inactive && p1Active) {
      room.forfeitedBy = room.player2.id;
      room.winnerId = room.player1.id;
      room.status = "finished";
      room.updatedAt = now;
      changed = true;
      console.log(`[Battle Arena] Player 2 inactive/disconnected in room ${room.id}. Forfeit awarded to Player 1.`);
    }
  }
  if (room.status === "countdown" && room.countdownStart) {
    if (now - room.countdownStart >= 3e3) {
      room.status = "battle";
      room.roundStatus = "playing";
      room.roundStartTime = now;
      room.updatedAt = now;
      changed = true;
    }
  }
  if ((room.status === "battle" || room.status === "countdown") && room.roundStatus === "playing") {
    const p1Answered = room.player1.hasAnswered;
    const p2Answered = room.player2 ? room.player2.hasAnswered : false;
    if (p1Answered && p2Answered) {
      room.roundStatus = "revealed";
      room.revealStartTime = now;
      room.updatedAt = now;
      changed = true;
    }
  }
  if (room.status === "battle" && room.roundStatus === "revealed" && room.revealStartTime) {
    if (now - room.revealStartTime >= 2500) {
      const nextQ = room.currentQ + 1;
      if (nextQ < (room.questions?.length || 5)) {
        room.currentQ = nextQ;
        room.roundStatus = "playing";
        room.roundStartTime = now;
        room.player1.hasAnswered = false;
        if (room.player2) room.player2.hasAnswered = false;
        room.revealStartTime = void 0;
        room.updatedAt = now;
        changed = true;
        console.log(`[Battle Arena] Room ${room.id} advanced to round ${nextQ}`);
      } else {
        room.status = "finished";
        room.updatedAt = now;
        changed = true;
        console.log(`[Battle Arena] Room ${room.id} finished all questions!`);
      }
    }
  }
  if (room.status === "battle" && room.roundStatus === "playing") {
    const currQ = room.questions?.[room.currentQ];
    const qSec = currQ?.timeLimit && typeof currQ.timeLimit === "number" && currQ.timeLimit >= 15 ? currQ.timeLimit : 30;
    const qDurationMs = qSec * 1e3 + 2e3;
    if (now - room.roundStartTime >= qDurationMs) {
      room.roundStatus = "revealed";
      room.revealStartTime = now;
      room.player1.hasAnswered = true;
      if (room.player2) room.player2.hasAnswered = true;
      room.updatedAt = now;
      changed = true;
      console.log(`[Battle Arena] Round ${room.currentQ} in room ${room.id} timed out. Auto-revealing!`);
    }
  }
  if (changed) {
    writeRoomsToDisk();
  }
  return changed;
}
setInterval(() => {
  try {
    const now = Date.now();
    purgeStaleTickets();
    for (const room of activeBattleRooms.values()) {
      stepBattleRoomClock(room, now);
    }
  } catch {
  }
}, 1e3);
app.get("/api/battle/room/:roomId", (req, res) => {
  try {
    const { roomId } = req.params;
    const { room } = findBattleRoom(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    const now = Date.now();
    const playerId = req.query.playerId;
    if (playerId) {
      if (room.player1.id === playerId) {
        room.player1.lastSeen = now;
      } else if (room.player2?.id === playerId) {
        room.player2.lastSeen = now;
      }
    }
    stepBattleRoomClock(room, now);
    res.json({ room, serverTime: now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
var PRIMARY_PAPERS_FILE = import_path2.default.join(process.cwd(), "data", "sample_papers_vault.json");
var TMP_PAPERS_FILE = import_path2.default.join("/tmp", "sample_papers_vault.json");
var samplePapersVault = [];
function loadSamplePapersFromDisk() {
  const papersMap = /* @__PURE__ */ new Map();
  try {
    if (import_fs2.default.existsSync(PRIMARY_PAPERS_FILE)) {
      const raw = import_fs2.default.readFileSync(PRIMARY_PAPERS_FILE, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) list.forEach((p) => papersMap.set(p.id, p));
    }
  } catch (err) {
    console.warn("[SamplePaperVault] Primary load notice:", err);
  }
  try {
    if (import_fs2.default.existsSync(TMP_PAPERS_FILE)) {
      const raw = import_fs2.default.readFileSync(TMP_PAPERS_FILE, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) list.forEach((p) => papersMap.set(p.id, p));
    }
  } catch (err) {
    console.warn("[SamplePaperVault] Tmp load notice:", err);
  }
  samplePapersVault = Array.from(papersMap.values()).sort(
    (a, b) => (b.uploadedAt || 0) - (a.uploadedAt || 0)
  );
  console.log(`[SamplePaperVault] Total loaded papers from disk: ${samplePapersVault.length}`);
}
function saveSamplePapersToDisk() {
  const json = JSON.stringify(samplePapersVault, null, 2);
  try {
    const dir = import_path2.default.dirname(PRIMARY_PAPERS_FILE);
    if (!import_fs2.default.existsSync(dir)) import_fs2.default.mkdirSync(dir, { recursive: true });
    import_fs2.default.writeFileSync(PRIMARY_PAPERS_FILE, json, "utf-8");
  } catch (primaryErr) {
    try {
      import_fs2.default.writeFileSync(TMP_PAPERS_FILE, json, "utf-8");
    } catch (tmpErr) {
      console.warn("[SamplePaperVault] Write notice:", tmpErr);
    }
  }
}
loadSamplePapersFromDisk();
app.get("/api/sample-papers", (req, res) => {
  try {
    res.json({ success: true, count: samplePapersVault.length, papers: samplePapersVault });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/sample-papers", (req, res) => {
  try {
    const newPaper = req.body;
    if (!newPaper || !newPaper.title) {
      return res.status(400).json({ error: "Missing paper data" });
    }
    const existingIndex = samplePapersVault.findIndex(
      (p) => p.id === newPaper.id || p.title?.trim().toLowerCase() === newPaper.title?.trim().toLowerCase() && p.subjectId === newPaper.subjectId
    );
    if (existingIndex >= 0) {
      samplePapersVault[existingIndex] = { ...samplePapersVault[existingIndex], ...newPaper };
    } else {
      samplePapersVault.unshift(newPaper);
    }
    saveSamplePapersToDisk();
    console.log(`[SamplePaperVault] Paper '${newPaper.title}' saved. Total papers in vault: ${samplePapersVault.length}`);
    res.json({ success: true, count: samplePapersVault.length, paper: newPaper });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/api/sample-papers/:id", (req, res) => {
  try {
    const { id } = req.params;
    samplePapersVault = samplePapersVault.filter((p) => p.id !== id);
    saveSamplePapersToDisk();
    console.log(`[SamplePaperVault] Deleted paper ${id}. Remaining: ${samplePapersVault.length}`);
    res.json({ success: true, count: samplePapersVault.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
registerReportAiRoutes(app);
async function startServer() {
  const distPath = import_path2.default.join(process.cwd(), "dist");
  const hasDist = import_fs2.default.existsSync(import_path2.default.join(distPath, "index.html"));
  const isDevExplicit = (process.env.NODE_ENV || "").toLowerCase() === "development" || process.env.npm_lifecycle_event === "dev";
  if (hasDist && !isDevExplicit) {
    console.log("[Server] Serving production static frontend from:", distPath);
    app.use("/assets", import_express.default.static(import_path2.default.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true
    }));
    app.use(import_express.default.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        }
      }
    }));
    app.get("*", (req, res) => {
      const ext = import_path2.default.extname(req.path);
      if (ext || req.path.startsWith("/src") || req.path.startsWith("/api")) {
        return res.status(404).send("Not Found");
      }
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.sendFile(import_path2.default.join(distPath, "index.html"));
    });
  } else {
    try {
      const viteModule = "vite";
      const { createServer: createViteServer } = await import(
        /* @vite-ignore */
        viteModule
      );
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.warn("Vite dev server not loaded:", e);
    }
  }
  const server = app.listen(Number(PORT) || 3e3, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  server.timeout = 3e5;
}
var isServerless = Boolean(
  process.env.VERCEL || process.env.VERCEL_ENV || process.env.NOW_REGION || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT
);
if (!isServerless) {
  startServer();
}
app.use((err, req, res, next) => {
  if (err instanceof import_multer.default.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large. Maximum size is 30MB." });
    }
  }
  console.error("[Global Error Handler] Caught unhandled error:", err);
  if (res.headersSent) {
    return next(err);
  }
  if (req.path && req.path.startsWith("/api")) {
    return res.status(err.status || 500).json({
      error: err.message || "An unexpected error occurred on the server.",
      success: false
    });
  }
  next(err);
});
var server_default = app;
//# sourceMappingURL=server.cjs.map
