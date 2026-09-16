import { Tender, Bidder, DueDiligenceReport, AuditEvent } from '../types';

/**
 * Pre-populated realistic tenders, bids, and AI due-diligence evaluations for ProcureAI.
 * Features 2 government tenders and 3 detailed competing bids with side-by-side compliance dossiers.
 */

export const INITIAL_TENDERS: Tender[] = [
  {
    id: 'tnd-2026-001',
    title: 'Smart City CCTV Surveillance & AI Command Center Implementation',
    referenceNumber: 'GEM/2026/B/894102',
    department: 'Department of Urban Development & Municipal Affairs',
    description: 'Procurement, deployment, networking, and 5-year maintenance of 2,400 IP optical cameras with automated edge video analytics, Automatic Number Plate Recognition (ANPR), redundant SAN storage, and an Integrated Command & Control Center (ICCC) for metropolitan surveillance.',
    status: 'OPEN FOR BIDS',
    deadline: '2026-10-30T17:00:00.000Z',
    budget: '285000000', // ₹ 28.50 Cr
    tenderType: 'Open Competitive National Bidding (QCBS 70:30)',
    location: 'Bengaluru Urban',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    pinCode: '560001',
    emdBondAmount: '5700000', // ₹ 57 Lakhs
    performanceSecurity: '10% of Contract Value within 30 days of LOA',
    eligibilityRequirements: [
      'Must be an entity incorporated in India for a minimum of 5 continuous operational years.',
      'Average annual financial turnover of at least ₹ 30.00 Crore over the last 3 audited financial years (FY 2023-24, FY 2024-25, FY 2025-26).',
      'Mandatory accredited ISO 9001:2015 (Quality Management) and ISO 27001:2013 (Information Security) valid certifications.',
      'Documented completion of at least 2 municipal, smart city, or police optical surveillance projects valued at >= ₹ 15 Crore each.',
      'Bank Solvency Certificate of minimum ₹ 10.00 Crore issued by a scheduled commercial bank within the last 6 months.',
      'Clear legal standing: No debarment, blacklisting, or active vigilance/anti-corruption proceedings by Central/State Governments.'
    ],
    mandatoryRequirements: [
      'Incorporation >= 5 years in India',
      '3-Year Average Turnover >= ₹ 30 Cr',
      'ISO 9001 & ISO 27001 Certified',
      'Bank Solvency Certificate >= ₹ 10 Cr',
      'Non-Debarment Affidavit'
    ],
    technicalRequirements: [
      'Automated optical Automatic Number Plate Recognition (ANPR) with >= 95% accuracy in mixed day/night conditions.',
      'Tier-3 redundant SAN storage cluster supporting 90 days full continuous video retention at 1080p @ 25fps.',
      'Edge AI analytics for crowd surge detection, perimeter breach, unattended baggage, and vehicle wrong-way alerts.',
      'On-site 24x7 SLA support response time under 2 hours with dedicated resident engineers.'
    ],
    financialRequirements: [
      'Positive net worth across all 3 preceding fiscal years.',
      'Audited balance sheets with statutory auditor certification.',
      'Earnest Money Deposit (EMD) Bank Guarantee of ₹ 57 Lakhs valid for 180 days.'
    ],
    constraints: [
      'All cameras must comply with Make In India (MII) Class-1 local content >= 50%.',
      'No critical components sourced from countries sharing a land border with India without DPIIT clearance.'
    ],
    requiredDocumentsList: [
      'Certificate of Incorporation & Articles of Association',
      'Audited Financial Statements (Last 3 Years)',
      'Valid ISO 9001 & ISO 27001 Certificates',
      'Satisfactory Past Project Completion Certificates',
      'Bank Solvency Guarantee Certificate',
      'Comprehensive Technical Architecture & Methodology Proposal',
      'EMD Bank Guarantee Receipt'
    ],
    evaluationWeights: {
      eligibility: 20,
      technical: 30,
      pastPerformance: 25,
      financial: 15,
      proposalQuality: 5,
      riskProfile: 5
    },
    weightsSource: 'TENDER_DOCUMENT',
    documents: [
      {
        id: 'tdoc-001',
        name: 'RFP_Vol_I_Commercial_Terms_GEM894102.pdf',
        type: 'application/pdf',
        size: '4.2 MB',
        uploadedAt: '2026-08-15T10:00:00.000Z',
        category: 'LEGAL_TERMS'
      },
      {
        id: 'tdoc-002',
        name: 'RFP_Vol_II_Technical_Specifications_ICCC.pdf',
        type: 'application/pdf',
        size: '8.7 MB',
        uploadedAt: '2026-08-15T10:05:00.000Z',
        category: 'SPECIFICATION'
      },
      {
        id: 'tdoc-003',
        name: 'Addendum_1_Clarifications_PreBid_Queries.pdf',
        type: 'application/pdf',
        size: '1.1 MB',
        uploadedAt: '2026-08-25T14:30:00.000Z',
        category: 'ADDENDUM'
      }
    ],
    createdAt: '2026-08-15T09:30:00.000Z'
  },
  {
    id: 'tnd-2026-002',
    title: 'Automated Highway Toll Management & FASTag Multi-Lane Free-Flow Modernization',
    referenceNumber: 'MORTH/NHAI/2026/PKG-4',
    department: 'National Highways Authority of India (NHAI)',
    description: 'Upgradation and turnkey operation of automated Multi-Lane Free-Flow (MLFF) electronic tolling hardware, high-speed RFID transceivers, automatic vehicle classification (AVC) optical scanners, and unified NETC clearinghouse interface across 16 express highway toll plazas.',
    status: 'UNDER EVALUATION',
    deadline: '2026-09-28T18:00:00.000Z',
    budget: '142000000', // ₹ 14.20 Cr
    tenderType: 'Limited Competitive e-Tender',
    location: 'NCR Expressway Corridor',
    state: 'Delhi',
    district: 'New Delhi',
    pinCode: '110001',
    emdBondAmount: '2840000', // ₹ 28.4 Lakhs
    performanceSecurity: '5% of Total Contract Value',
    eligibilityRequirements: [
      'Minimum 6 years established operations in Intelligent Transportation Systems (ITS) or Electronic Toll Collection (ETC).',
      'Average annual turnover of at least ₹ 18.00 Crore over the last 3 fiscal years.',
      'Certified System Integrator compliance with NPCI / IHMCL technical interoperability guidelines.',
      'Completed at least 1 toll plaza modernization project covering >= 10 operational lanes.'
    ],
    mandatoryRequirements: [
      'Operational experience >= 6 years in ITS/ETC',
      'Average turnover >= ₹ 18 Cr',
      'NPCI/IHMCL Certified Integrator',
      'Bank Solvency >= ₹ 5 Cr'
    ],
    technicalRequirements: [
      'Dual RFID transceiver redundancy with transaction latency < 120ms at speeds up to 100 km/h.',
      'Laser-based Automatic Vehicle Classification (AVC) with >= 98% profile recognition accuracy.',
      'Seamless fallback to 4G/5G encrypted cellular link during fiber outages.'
    ],
    financialRequirements: [
      'Bank solvency certificate of ₹ 5.00 Crore or above.',
      'Audited financial returns showing positive operational profits for FY 2024-25 and FY 2025-26.'
    ],
    constraints: [
      'Zero downtime during live traffic cut-over; installation must be staged in off-peak midnight windows.'
    ],
    requiredDocumentsList: [
      'IHMCL Integration Certification',
      'Audited Financial Reports (3 Years)',
      'Past ETC Project Handover Certificate'
    ],
    evaluationWeights: {
      eligibility: 20,
      technical: 25,
      pastPerformance: 20,
      financial: 20,
      proposalQuality: 10,
      riskProfile: 5
    },
    weightsSource: 'TENDER_DOCUMENT',
    documents: [
      {
        id: 'tdoc-004',
        name: 'NHAI_MLFF_Toll_Modernization_RFP.pdf',
        type: 'application/pdf',
        size: '5.6 MB',
        uploadedAt: '2026-08-01T11:00:00.000Z',
        category: 'SPECIFICATION'
      }
    ],
    createdAt: '2026-08-01T10:30:00.000Z'
  }
];

export const INITIAL_BIDDERS: Bidder[] = [
  {
    id: 'bid-001',
    tenderId: 'tnd-2026-001',
    companyName: 'Vigilance Tech Solutions Pvt Ltd',
    registrationNumber: 'U72200KA2016PTC089412',
    country: 'India',
    region: 'Karnataka',
    yearEstablished: 2016,
    businessCategory: 'Surveillance Systems & Smart City IT',
    contactPerson: 'Rajeshwari Ramanathan',
    email: 'rajeshwari.r@vigilancetech.in',
    contactEmail: 'tenders@vigilancetech.in',
    phone: '+91 98450 12389',
    contactPhone: '+91 80 4122 8900',
    address: 'Plot 42, Electronic City Phase 1, Hosur Road, Bengaluru, Karnataka 560100',
    registeredAddress: 'Plot 42, Electronic City Phase 1, Hosur Road, Bengaluru, Karnataka 560100',
    employeeCount: 240,
    incorporationYear: 2016,
    annualTurnoverINR: 425000000, // ₹ 42.50 Cr
    gstin: '29AABCV1234F1Z5',
    pan: 'AABCV1234F',
    panNumber: 'AABCV1234F',
    cin: 'U72200KA2016PTC089412',
    udyamNumber: 'UDYAM-KR-03-0048129',
    technicalCapabilities: [
      'Edge AI Optical Processing & Real-Time ANPR Engine',
      'Tier-3 Enterprise Video Management & SAN Storage Arrays',
      'Command Center Video Wall & GIS Integration',
      'Fiber Optic Ring Networking with Automatic Failover',
      'Round-the-clock On-Site Field Support Operations'
    ],
    certifications: [
      {
        id: 'cert-001',
        name: 'ISO 9001:2015 Quality Management System',
        issuer: 'Bureau Veritas Quality International',
        validUntil: '2028-04-30',
        certNumber: 'BVQI-IND-9001-84920',
        status: 'VALID'
      },
      {
        id: 'cert-002',
        name: 'ISO 27001:2013 Information Security Management',
        issuer: 'TÜV SÜD South Asia',
        validUntil: '2027-11-15',
        certNumber: 'TUV-IN-27001-44102',
        status: 'VALID'
      },
      {
        id: 'cert-003',
        name: 'CMMI Level 3 Services Certification',
        issuer: 'CMMI Institute',
        validUntil: '2027-02-28',
        certNumber: 'CMMI-L3-99382',
        status: 'VALID'
      }
    ],
    infrastructureEquipment: [
      'Dedicated Staging & Testing Laboratory (Bengaluru)',
      'Enterprise SAN Testing Cluster with 5 Petabytes raw capacity',
      '12 Dedicated Optical Splicing & Calibration Mobile Vans',
      'Automated Video Analytics QA Benchmark Test Suite'
    ],
    pastProjects: [
      {
        id: 'proj-001',
        projectName: 'Pune Smart City Metropolitan Surveillance Phase 2',
        clientName: 'Pune Smart City Development Corporation Ltd (PSCDCL)',
        contractValue: 198000000, // ₹ 19.80 Cr
        currency: 'INR',
        duration: '18 Months',
        completionStatus: 'COMPLETED',
        completionDate: '2024-03-15',
        hasCompletionCertificate: true,
        evidenceDocName: 'PSCDCL_Completion_Certificate_Ref_1849.pdf'
      },
      {
        id: 'proj-002',
        projectName: 'Hyderabad Safe City Optical Network & ANPR Implementation',
        clientName: 'Telangana State Police Housing Corporation',
        contractValue: 165000000, // ₹ 16.50 Cr
        currency: 'INR',
        duration: '14 Months',
        completionStatus: 'COMPLETED',
        completionDate: '2025-01-20',
        hasCompletionCertificate: true,
        evidenceDocName: 'TSPHCL_SafeCity_Handover_Cert.pdf'
      }
    ],
    financialInfo: {
      annualRevenue: 425000000, // ₹ 42.50 Cr
      profitLoss: 38400000, // ₹ 3.84 Cr Profit
      currency: 'INR',
      fiscalYear: 'FY 2025-26',
      isAudited: true,
      liquidityRatio: 2.15,
      bankSolvencyGuaranteeProvided: true,
      bankName: 'State Bank of India (Commercial Branch, Bengaluru)'
    },
    proposal: {
      technicalProposalSummary: 'Full-turnkey implementation of 2,400 smart edge AI optical cameras with ANPR, redundant high-availability SAN storage (90 days retention), and unified GIS-based command software.',
      methodology: 'Iterative 4-phase rollout: 1. Survey & fiber backhaul hardening; 2. Staged pole mount & camera splicing; 3. Data center SAN deployment with hot-standby failover; 4. ICCC software integration and joint acceptance testing.',
      timelineMonths: 11,
      keyPersonnel: [
        'Dr. Anand Vardhan (Chief Systems Architect - 18 yrs exp)',
        'Pooja Nair (Project Director, PMP certified - 14 yrs exp)',
        'Suresh Chandran (Network & Cybersecurity Lead, CISSP)'
      ],
      pricingTotal: 264500000, // ₹ 26.45 Cr (within budget of ₹ 28.50 Cr)
      currency: 'INR',
      scopeUnderstanding: 'Comprehensive understanding of urban traffic density, rain resilience (IP67 rating), tamper detection, and real-time integration with police CAD systems.'
    },
    projectApproach: 'Proven modular microservices architecture ensuring zero single point of failure. Edge ANPR cameras run onboard optical neural models for license detection even during backhaul network disconnections.',
    status: 'SUBMITTED',
    documents: [
      {
        id: 'sdoc-101',
        fileName: 'Vigilance_Certificate_Of_Incorporation.pdf',
        docType: 'COMPANY_REG',
        status: 'SUBMITTED',
        fileSize: '1.4 MB',
        uploadedAt: '2026-09-02T14:10:00.000Z',
        extractedSnippet: 'CIN U72200KA2016PTC089412, Registered 14th June 2016 under Companies Act 2013.'
      },
      {
        id: 'sdoc-102',
        fileName: 'Vigilance_3Yr_Audited_Balance_Sheets.pdf',
        docType: 'FINANCIAL_AUDIT',
        status: 'SUBMITTED',
        fileSize: '4.8 MB',
        uploadedAt: '2026-09-02T14:15:00.000Z',
        extractedSnippet: 'FY 23-24: ₹36.2 Cr, FY 24-25: ₹39.8 Cr, FY 25-26: ₹42.5 Cr. Net worth positive.'
      },
      {
        id: 'sdoc-103',
        fileName: 'Vigilance_Comprehensive_Technical_Bid.pdf',
        docType: 'TECH_PROPOSAL',
        status: 'SUBMITTED',
        fileSize: '12.4 MB',
        uploadedAt: '2026-09-02T14:22:00.000Z',
        extractedSnippet: 'ANPR architecture using Sony STARVIS sensors with 96.4% field accuracy verified in third-party labs.'
      },
      {
        id: 'sdoc-104',
        fileName: 'Vigilance_ISO_9001_and_27001_Certificates.pdf',
        docType: 'ISO_CERT',
        status: 'SUBMITTED',
        fileSize: '2.1 MB',
        uploadedAt: '2026-09-02T14:25:00.000Z',
        extractedSnippet: 'Accredited certificates issued by BVQI and TÜV SÜD valid through 2027 and 2028.'
      },
      {
        id: 'sdoc-105',
        fileName: 'SBI_Solvency_Certificate_15Cr.pdf',
        docType: 'BANK_GUARANTEE',
        status: 'SUBMITTED',
        fileSize: '950 KB',
        uploadedAt: '2026-09-02T14:28:00.000Z',
        extractedSnippet: 'Solvency certificate of ₹ 15.00 Crore issued by SBI on 10th July 2026.'
      },
      {
        id: 'sdoc-106',
        fileName: 'Vigilance_GST_Tax_Clearance_FY26.pdf',
        docType: 'TAX_CLEARANCE',
        status: 'SUBMITTED',
        fileSize: '820 KB',
        uploadedAt: '2026-09-02T14:30:00.000Z',
        extractedSnippet: 'GSTIN 29AABCV1234F1Z5 active, zero outstanding government tax liabilities.'
      }
    ],
    submittedAt: '2026-09-02T14:35:00.000Z'
  },
  {
    id: 'bid-002',
    tenderId: 'tnd-2026-001',
    companyName: 'CyberNet Urban Systems Ltd',
    registrationNumber: 'U74999MH2018PLC312890',
    country: 'India',
    region: 'Maharashtra',
    yearEstablished: 2018,
    businessCategory: 'Smart City Infrastructure & Network Integration',
    contactPerson: 'Vikramaditya Shinde',
    email: 'v.shinde@cyberneturban.com',
    contactEmail: 'bids@cyberneturban.com',
    phone: '+91 98201 84729',
    contactPhone: '+91 22 6790 4400',
    address: 'CyberNet Tower, 7th Floor, MIDC Andheri East, Mumbai, Maharashtra 400093',
    registeredAddress: 'CyberNet Tower, 7th Floor, MIDC Andheri East, Mumbai, Maharashtra 400093',
    employeeCount: 185,
    incorporationYear: 2018,
    annualTurnoverINR: 348000000, // ₹ 34.80 Cr
    gstin: '27AAGCC4912K1ZY',
    pan: 'AAGCC4912K',
    panNumber: 'AAGCC4912K',
    cin: 'U74999MH2018PLC312890',
    udyamNumber: 'UDYAM-MH-19-0091823',
    technicalCapabilities: [
      'Multi-Vendor IP Surveillance Management Software',
      'Scalable Edge GPU AI Acceleration',
      'Optical Traffic Counting & Vehicle Classification',
      'Disaster Recovery Data Synchronization'
    ],
    certifications: [
      {
        id: 'cert-004',
        name: 'ISO 9001:2015 Quality Management System',
        issuer: 'BSI Group India',
        validUntil: '2027-09-30',
        certNumber: 'BSI-IN-9001-63819',
        status: 'VALID'
      },
      {
        id: 'cert-005',
        name: 'ISO 27001:2013 Information Security Management',
        issuer: 'Intertek Certification',
        validUntil: '2026-12-31',
        certNumber: 'INT-27001-55091',
        status: 'VALID'
      }
    ],
    infrastructureEquipment: [
      'Network Operation Center (NOC) in Navi Mumbai',
      'Hardware Testing & Burning-In Lab',
      'Fleet of 8 Field Service Vehicles'
    ],
    pastProjects: [
      {
        id: 'proj-003',
        projectName: 'Nagpur Smart City Surveillance Network',
        clientName: 'Nagpur Smart and Sustainable City Development Corporation',
        contractValue: 172000000, // ₹ 17.20 Cr
        currency: 'INR',
        duration: '16 Months',
        completionStatus: 'COMPLETED',
        completionDate: '2024-08-30',
        hasCompletionCertificate: true,
        evidenceDocName: 'NSSCDCL_Handover_Certificate.pdf'
      },
      {
        id: 'proj-004',
        projectName: 'Thane Municipal Smart Light & Camera Integration',
        clientName: 'Thane Municipal Corporation',
        contractValue: 115000000, // ₹ 11.50 Cr (slightly below single project ₹15Cr mark)
        currency: 'INR',
        duration: '12 Months',
        completionStatus: 'COMPLETED',
        completionDate: '2025-05-10',
        hasCompletionCertificate: true,
        evidenceDocName: 'TMC_SmartLighting_CCTV_Acceptance.pdf'
      }
    ],
    financialInfo: {
      annualRevenue: 348000000, // ₹ 34.80 Cr
      profitLoss: 24100000, // ₹ 2.41 Cr Profit
      currency: 'INR',
      fiscalYear: 'FY 2025-26',
      isAudited: true,
      liquidityRatio: 1.72,
      bankSolvencyGuaranteeProvided: true,
      bankName: 'HDFC Bank Ltd (Fort, Mumbai)'
    },
    proposal: {
      technicalProposalSummary: 'Hybrid cloud-edge video analytics solution with high-performance edge compute units, centralized SAN cluster, and responsive municipal incident dispatch dashboard.',
      methodology: 'Structured 5-stage deployment with parallel civil pole preparation, fiber trenching, camera mounting, central datacenter setup, and unified acceptance testing.',
      timelineMonths: 13,
      keyPersonnel: [
        'Kunal Deshmukh (Lead Architect - 15 yrs exp)',
        'Ananya Sen (Enterprise Project Manager, PRINCE2)'
      ],
      pricingTotal: 278000000, // ₹ 27.80 Cr (within budget of ₹ 28.50 Cr)
      currency: 'INR',
      scopeUnderstanding: 'Clear grasp of city command operations, multi-agency video sharing (police, municipality, disaster relief), and high-throughput video indexing.'
    },
    projectApproach: 'Containerized microservices deployed on Kubernetes cluster with dynamic load balancing across video ingestion gateways.',
    status: 'SUBMITTED',
    documents: [
      {
        id: 'sdoc-201',
        fileName: 'CyberNet_Incorporation_MCA_Record.pdf',
        docType: 'COMPANY_REG',
        status: 'SUBMITTED',
        fileSize: '1.8 MB',
        uploadedAt: '2026-09-04T11:00:00.000Z',
        extractedSnippet: 'CIN U74999MH2018PLC312890, Public Limited Company incorporated February 2018.'
      },
      {
        id: 'sdoc-202',
        fileName: 'CyberNet_Statutory_Auditor_Report_3Yrs.pdf',
        docType: 'FINANCIAL_AUDIT',
        status: 'SUBMITTED',
        fileSize: '5.2 MB',
        uploadedAt: '2026-09-04T11:08:00.000Z',
        extractedSnippet: 'Average annual turnover ₹ 34.8 Cr. Positive balance sheet and net reserves.'
      },
      {
        id: 'sdoc-203',
        fileName: 'CyberNet_Technical_Specification_Compliance.pdf',
        docType: 'TECH_PROPOSAL',
        status: 'SUBMITTED',
        fileSize: '14.1 MB',
        uploadedAt: '2026-09-04T11:15:00.000Z',
        extractedSnippet: 'Full tier-3 SAN storage design with 90 days retention and N+1 gateway redundancy.'
      },
      {
        id: 'sdoc-204',
        fileName: 'CyberNet_ISO_Certifications.pdf',
        docType: 'ISO_CERT',
        status: 'SUBMITTED',
        fileSize: '1.9 MB',
        uploadedAt: '2026-09-04T11:20:00.000Z',
        extractedSnippet: 'Valid ISO 9001 and ISO 27001 accredited copies attached.'
      },
      {
        id: 'sdoc-205',
        fileName: 'HDFC_Bank_Solvency_Certificate.pdf',
        docType: 'BANK_GUARANTEE',
        status: 'SUBMITTED',
        fileSize: '740 KB',
        uploadedAt: '2026-09-04T11:22:00.000Z',
        extractedSnippet: 'Solvency certified for ₹ 12.00 Crore by HDFC Bank on 15th January 2026 (approx. 7.5 months old).'
      }
    ],
    submittedAt: '2026-09-04T11:30:00.000Z'
  },
  {
    id: 'bid-003',
    tenderId: 'tnd-2026-001',
    companyName: 'Apex Global Infotech LLP',
    registrationNumber: 'AAP-8412',
    country: 'India',
    region: 'Delhi NCR',
    yearEstablished: 2021,
    businessCategory: 'IT Hardware Reseller & Network Contractor',
    contactPerson: 'Siddharth Malhotra',
    email: 'siddharth@apexglobalinfo.in',
    contactEmail: 'contact@apexglobalinfo.in',
    phone: '+91 98110 59281',
    address: 'Suite 302, Nehru Place Commercial Complex, New Delhi 110019',
    registeredAddress: 'Suite 302, Nehru Place Commercial Complex, New Delhi 110019',
    employeeCount: 45,
    incorporationYear: 2021,
    annualTurnoverINR: 218000000, // ₹ 21.80 Cr (Below mandatory requirement of ₹30 Cr)
    gstin: '07AALFA8920D1ZE',
    pan: 'AALFA8920D',
    panNumber: 'AALFA8920D',
    technicalCapabilities: [
      'Commercial Off-The-Shelf CCTV Hardware Distribution',
      'Basic IP Camera Cabling & Power Over Ethernet Installation',
      'Standard Network Switch Configuration'
    ],
    certifications: [
      {
        id: 'cert-006',
        name: 'ISO 9001:2015 Quality Management System',
        issuer: 'QA International Labs',
        validUntil: '2026-10-15',
        certNumber: 'QAI-9001-2091',
        status: 'VALID'
      }
      // Note: Missing mandatory ISO 27001 certificate!
    ],
    infrastructureEquipment: [
      'Warehouse facility in Okhla Phase 2, New Delhi',
      'Handheld Optical Fiber Testers'
    ],
    pastProjects: [
      {
        id: 'proj-005',
        projectName: 'Residential Township Campus Security Cameras',
        clientName: 'Apex Meadows Residents Welfare Society',
        contractValue: 4800000, // ₹ 48 Lakhs (Far below ₹15 Cr requirement)
        currency: 'INR',
        duration: '4 Months',
        completionStatus: 'COMPLETED',
        completionDate: '2024-11-20',
        hasCompletionCertificate: true,
        evidenceDocName: 'ApexMeadows_RWA_Letter.pdf'
      }
    ],
    financialInfo: {
      annualRevenue: 218000000, // ₹ 21.80 Cr (Deficient vs ₹30 Cr tender condition)
      profitLoss: 8200000,
      currency: 'INR',
      fiscalYear: 'FY 2025-26',
      isAudited: false, // Audit pending
      liquidityRatio: 1.08,
      bankSolvencyGuaranteeProvided: false,
      bankName: 'Punjab National Bank'
    },
    proposal: {
      technicalProposalSummary: 'Deployment of commercial off-the-shelf cameras with outsourced cloud analytics software from third-party vendor.',
      methodology: 'Procurement of imported camera boxes with direct field installation by local day-labor teams.',
      timelineMonths: 8,
      keyPersonnel: [
        'Siddharth Malhotra (Managing Partner)',
        'Gaurav Verma (Operations Head)'
      ],
      pricingTotal: 239000000, // ₹ 23.90 Cr (Low bid, but deficient capabilities)
      currency: 'INR',
      scopeUnderstanding: 'Basic understanding of camera hardware; lacks clear explanation of Tier-3 SAN failover and metropolitan high-concurrency video indexing.'
    },
    projectApproach: 'Third-party subcontracting for core analytics and ICCC software.',
    status: 'SUBMITTED',
    documents: [
      {
        id: 'sdoc-301',
        fileName: 'Apex_LLP_Agreement_and_Registration.pdf',
        docType: 'COMPANY_REG',
        status: 'SUBMITTED',
        fileSize: '1.2 MB',
        uploadedAt: '2026-09-05T16:00:00.000Z',
        extractedSnippet: 'LLPIN AAP-8412 registered August 2021 (Only ~5 years old).'
      },
      {
        id: 'sdoc-302',
        fileName: 'Apex_Provisional_Financial_Turnover.pdf',
        docType: 'FINANCIAL_AUDIT',
        status: 'POTENTIALLY_INCONSISTENT',
        fileSize: '2.4 MB',
        uploadedAt: '2026-09-05T16:05:00.000Z',
        extractedSnippet: 'Provisional unaudited summary shows ₹ 21.8 Cr turnover, below mandatory ₹ 30 Cr qualification.'
      },
      {
        id: 'sdoc-303',
        fileName: 'Apex_Brief_Technical_Writeup.pdf',
        docType: 'TECH_PROPOSAL',
        status: 'SUBMITTED',
        fileSize: '3.1 MB',
        uploadedAt: '2026-09-05T16:12:00.000Z',
        extractedSnippet: 'Outsources edge analytics engine to unnamed third-party SaaS provider.'
      },
      {
        id: 'sdoc-304',
        fileName: 'Apex_Self_Attestation_ISO_Declaration.pdf',
        docType: 'ISO_CERT',
        status: 'INVALID',
        fileSize: '410 KB',
        uploadedAt: '2026-09-05T16:15:00.000Z',
        notes: 'Self-declaration letter only; actual accredited ISO 27001 certificate not attached.',
        extractedSnippet: 'We hereby declare we follow information security best practices. Formal ISO 27001 audit is underway.'
      }
    ],
    submittedAt: '2026-09-05T16:20:00.000Z'
  }
];

export const INITIAL_REPORTS: Record<string, DueDiligenceReport> = {
  'bid-001': {
    tenderId: 'tnd-2026-001',
    bidderId: 'bid-001',
    analyzedAt: '2026-09-03T10:15:00.000Z',
    aiModelUsed: 'gemini-3.8-flash (8-Stage Strict Multi-Vector Due-Diligence)',
    overallScore: 88,
    aiConfidence: 94,
    recommendation: 'STRONG CANDIDATE',
    recommendationStatement: 'Vigilance Tech Solutions demonstrates exemplary compliance with all mandatory qualifications, robust financial solvency (₹42.5 Cr turnover), valid dual ISO certifications, and verified track record on two large-scale municipal smart city CCTV projects.',
    scoresByCategory: [
      {
        category: 'Eligibility & Statutory Compliance',
        maxPoints: 20,
        awardedPoints: 19,
        percentage: 95,
        confidence: 'HIGH',
        reason: 'Incorporated > 10 years, CIN verified, active GSTIN, valid non-debarment declaration and statutory filing matches.',
        evidenceReferences: [
          {
            sourceFile: 'Vigilance_Certificate_Of_Incorporation.pdf',
            pageOrSection: 'Page 1, Para 2',
            evidenceText: 'Registered 14th June 2016 (CIN U72200KA2016PTC089412).'
          }
        ]
      },
      {
        category: 'Technical Architecture & Feasibility',
        maxPoints: 30,
        awardedPoints: 27,
        percentage: 90,
        confidence: 'HIGH',
        reason: 'Comprehensive tier-3 SAN storage design with 90 days retention, validated optical ANPR sensors, and N+1 failover.',
        evidenceReferences: [
          {
            sourceFile: 'Vigilance_Comprehensive_Technical_Bid.pdf',
            pageOrSection: 'Section 3.4 Storage & SAN Architecture',
            evidenceText: 'Dual-controller enterprise SAN cluster with hot-spare disk failover delivering 90 days continuous 1080p retention.'
          }
        ]
      },
      {
        category: 'Past Performance & Proven Track Record',
        maxPoints: 25,
        awardedPoints: 23,
        percentage: 92,
        confidence: 'HIGH',
        reason: 'Two verified municipal smart city project completion certificates from Pune Smart City (₹19.8 Cr) and Hyderabad Safe City (₹16.5 Cr).',
        evidenceReferences: [
          {
            sourceFile: 'PSCDCL_Completion_Certificate_Ref_1849.pdf',
            pageOrSection: 'Whole Document',
            evidenceText: 'Executed Pune Smart City Surveillance Phase 2 valued at ₹ 19.80 Crore satisfactorily with zero liquidated damages.'
          }
        ]
      },
      {
        category: 'Financial Solvency & Health',
        maxPoints: 15,
        awardedPoints: 14,
        percentage: 93,
        confidence: 'HIGH',
        reason: '3-year average turnover of ₹ 39.5 Cr exceeding the ₹ 30 Cr minimum requirement. Healthy liquidity ratio of 2.15.',
        evidenceReferences: [
          {
            sourceFile: 'Vigilance_3Yr_Audited_Balance_Sheets.pdf',
            pageOrSection: 'Schedule 14 - Profit & Loss',
            evidenceText: 'Audited revenues: FY24 ₹36.2 Cr, FY25 ₹39.8 Cr, FY26 ₹42.5 Cr. SBI Solvency ₹15 Cr.'
          }
        ]
      },
      {
        category: 'Proposal Quality & Delivery Viability',
        maxPoints: 5,
        awardedPoints: 5,
        percentage: 100,
        confidence: 'HIGH',
        reason: 'Realistic 11-month delivery timeline backed by seasoned PMP-certified project directors.',
        evidenceReferences: [
          {
            sourceFile: 'Vigilance_Comprehensive_Technical_Bid.pdf',
            pageOrSection: 'Work Breakdown Structure WBS 1.0',
            evidenceText: 'Staged 4-phase rollout plan with designated milestone acceptance gates.'
          }
        ]
      }
    ],
    eligibilityChecks: [
      {
        requirement: 'Entity incorporated in India for >= 5 continuous years',
        status: 'PASS',
        evidence: 'CIN U72200KA2016PTC089412 registered June 2016 (10 years operational)',
        source: 'Vigilance_Certificate_Of_Incorporation.pdf',
        explanation: 'Meets and exceeds 5-year incorporation requirement.'
      },
      {
        requirement: 'Average Annual Turnover >= ₹ 30.00 Cr in last 3 financial years',
        status: 'PASS',
        evidence: 'Audited turnover average ₹ 39.50 Cr (FY24: 36.2 Cr, FY25: 39.8 Cr, FY26: 42.5 Cr)',
        source: 'Vigilance_3Yr_Audited_Balance_Sheets.pdf',
        explanation: 'Fully compliant with statutory auditor verification.'
      },
      {
        requirement: 'Accredited ISO 9001:2015 and ISO 27001:2013 certifications',
        status: 'PASS',
        evidence: 'BVQI ISO 9001 valid to 2028; TÜV SÜD ISO 27001 valid to Nov 2027',
        source: 'Vigilance_ISO_9001_and_27001_Certificates.pdf',
        explanation: 'Both mandatory ISO certificates verified valid and active.'
      },
      {
        requirement: 'Bank Solvency Certificate >= ₹ 10.00 Cr issued within last 6 months',
        status: 'PASS',
        evidence: 'State Bank of India certificate for ₹ 15.00 Cr issued July 2026',
        source: 'SBI_Solvency_Certificate_15Cr.pdf',
        explanation: 'Solvency is ₹ 15 Cr, exceeding requirement of ₹ 10 Cr and issued within 2 months of RFP.'
      },
      {
        requirement: 'Minimum 2 past government CCTV projects >= ₹ 15 Cr',
        status: 'PASS',
        evidence: 'Pune Smart City (₹19.80 Cr) and Hyderabad Safe City (₹16.50 Cr) certificates',
        source: 'PSCDCL_Completion_Certificate_Ref_1849.pdf & TSPHCL_SafeCity_Handover_Cert.pdf',
        explanation: 'Both completion certificates authenticated.'
      }
    ],
    technicalEvaluation: {
      summary: 'High-performing technical architecture employing edge AI optical cameras with decentralized ANPR recognition and an enterprise SAN storage cluster meeting full 90-day retention.',
      strengths: [
        'Dedicated optical ANPR sensor with lab-certified 96.4% license recognition accuracy.',
        'High-availability SAN storage cluster with automated failover and zero data-loss standby.',
        'Extensive local Bengaluru engineering lab and mobile splicing fleet for sub-2-hour SLA response.'
      ],
      weaknesses: [
        'High reliance on single fiber ring supplier in southern corridor; recommended to ensure dual dark-fiber diversity.'
      ],
      feasibilityScore: 92,
      evidence: [
        {
          sourceFile: 'Vigilance_Comprehensive_Technical_Bid.pdf',
          pageOrSection: 'Section 4 - ANPR Accuracy',
          evidenceText: 'Field test benchmarks confirm 96.4% night recognition under high glare.'
        }
      ]
    },
    pastPerformance: {
      summary: 'Demonstrated exceptional project delivery across two landmark municipal surveillance initiatives with full completion certificates.',
      verifiedProjectsCount: 2,
      similarityRating: 'HIGH',
      delayOrDisputeFlags: [],
      evidenceBreakdown: {
        verifiedEvidence: [
          'Pune Smart City Development Corp handover sign-off letter',
          'Telangana State Police Housing Corp final acceptance memo'
        ],
        selfDeclared: [],
        unverifiedClaims: [],
        missingInfo: []
      }
    },
    financialEvaluation: {
      summary: 'Financially sound company with continuous revenue growth and a positive net worth of ₹ 42.5 Cr.',
      stabilityRating: 'HIGH',
      contractCapabilityFit: 'EXCELLENT',
      financialInconsistencies: [],
      unknownMetrics: []
    },
    documentConsistency: {
      inconsistencies: []
    },
    riskAssessment: [
      {
        id: 'rsk-001',
        title: 'Fiber Route Redundancy Verification',
        category: 'Technical Risk',
        severity: 'LOW',
        evidence: 'Proposal specifies single fiber pathway along Outer Ring Road for 8 camera clusters.',
        explanation: 'A single civil fiber cut could isolate 8 junction nodes temporarily.',
        recommendedHumanVerification: 'Request contractor to confirm dual-homed redundant fiber pathways for Outer Ring Road junctions.'
      }
    ],
    missingInformation: [],
    evidenceRepository: [
      {
        id: 'ev-001',
        sourceFile: 'Vigilance_Certificate_Of_Incorporation.pdf',
        pageOrSection: 'Page 1',
        evidenceText: 'Ministry of Corporate Affairs CIN U72200KA2016PTC089412',
        classification: 'Bidder-provided',
        verified: true
      },
      {
        id: 'ev-002',
        sourceFile: 'SBI_Solvency_Certificate_15Cr.pdf',
        pageOrSection: 'Certificate Header',
        evidenceText: 'SBI Commercial Branch confirms solvent balance up to ₹ 15,00,00,000.',
        classification: 'Third-party verification',
        verified: true
      }
    ],
    explainability: {
      whatAIFound: 'Vigilance Tech Solutions meets 100% of the mandatory eligibility gates and provides robust verifiable proof of past large-scale municipal CCTV projects.',
      whyItMatters: 'Ensures minimal execution risk and high likelihood of timely deployment without vendor default.',
      supportingEvidence: 'Audited financials, authenticated bank solvency letter, and verified completion certificates from Pune & Hyderabad municipal bodies.',
      evidenceOrigin: 'Cross-referenced against Ministry of Corporate Affairs records and bank issuance letter.',
      confidenceLevel: 'VERY HIGH (94%)',
      requiresHumanVerification: false,
      humanVerificationFocus: 'Verify on-site spare parts holding quota before final commercial award.'
    },
    humanReview: {
      officerStatus: 'REVIEWED_CONFIRMED',
      officerNotes: 'All mandatory documents verified against original filings. Bidder is strongly recommended for financial opening stage.',
      annotations: []
    }
  },
  'bid-002': {
    tenderId: 'tnd-2026-001',
    bidderId: 'bid-002',
    analyzedAt: '2026-09-04T12:00:00.000Z',
    aiModelUsed: 'gemini-3.8-flash (8-Stage Strict Multi-Vector Due-Diligence)',
    overallScore: 74,
    aiConfidence: 89,
    recommendation: 'PROMISING CANDIDATE',
    recommendationStatement: 'CyberNet Urban Systems Ltd presents a viable proposal with sound engineering and valid ISO certifications. However, its Bank Solvency Certificate is dated January 2026 (over 7 months old vs 6-month RFP requirement), and one past project is below the ₹15 Cr single contract threshold.',
    scoresByCategory: [
      {
        category: 'Eligibility & Statutory Compliance',
        maxPoints: 20,
        awardedPoints: 16,
        percentage: 80,
        confidence: 'HIGH',
        reason: 'Bank solvency certificate was issued 7.5 months prior to bid submission; tender clause requires issuance within 6 months.',
        evidenceReferences: [
          {
            sourceFile: 'HDFC_Bank_Solvency_Certificate.pdf',
            pageOrSection: 'Date Header',
            evidenceText: 'Issued on 15th January 2026.'
          }
        ]
      },
      {
        category: 'Technical Architecture & Feasibility',
        maxPoints: 30,
        awardedPoints: 25,
        percentage: 83,
        confidence: 'HIGH',
        reason: 'Competent hybrid cloud/edge architecture, but reliance on containerized edge requires careful thermal management in outdoor enclosures.',
        evidenceReferences: [
          {
            sourceFile: 'CyberNet_Technical_Specification_Compliance.pdf',
            pageOrSection: 'Section 2.1 Edge Compute',
            evidenceText: 'Outdoor edge compute boxes rated up to 45°C ambient.'
          }
        ]
      },
      {
        category: 'Past Performance & Proven Track Record',
        maxPoints: 25,
        awardedPoints: 17,
        percentage: 68,
        confidence: 'HIGH',
        reason: 'Nagpur project (₹17.2 Cr) qualifies, but second project in Thane (₹11.5 Cr) does not meet the ₹15 Cr threshold for past single-contract scale.',
        evidenceReferences: [
          {
            sourceFile: 'TMC_SmartLighting_CCTV_Acceptance.pdf',
            pageOrSection: 'Work Order Value',
            evidenceText: 'Total executed contract value ₹ 11,50,00,000.'
          }
        ]
      },
      {
        category: 'Financial Solvency & Health',
        maxPoints: 15,
        awardedPoints: 12,
        percentage: 80,
        confidence: 'HIGH',
        reason: 'Turnover meets ₹ 30 Cr minimum (3-yr average ₹ 34.8 Cr). Profit margins are positive.',
        evidenceReferences: [
          {
            sourceFile: 'CyberNet_Statutory_Auditor_Report_3Yrs.pdf',
            pageOrSection: 'Annexure B',
            evidenceText: 'FY 25-26 revenue ₹ 34.8 Cr with ₹ 2.41 Cr profit.'
          }
        ]
      },
      {
        category: 'Proposal Quality & Delivery Viability',
        maxPoints: 5,
        awardedPoints: 4,
        percentage: 80,
        confidence: 'HIGH',
        reason: '13-month timeline is acceptable though 2 months longer than lead candidate.',
        evidenceReferences: [
          {
            sourceFile: 'CyberNet_Technical_Specification_Compliance.pdf',
            pageOrSection: 'Gantt Chart Phase 5',
            evidenceText: 'Final commissioning scheduled for Month 13.'
          }
        ]
      }
    ],
    eligibilityChecks: [
      {
        requirement: 'Entity incorporated in India for >= 5 continuous years',
        status: 'PASS',
        evidence: 'Incorporated Feb 2018 (8 operational years)',
        source: 'CyberNet_Incorporation_MCA_Record.pdf',
        explanation: 'Compliant with incorporation tenure.'
      },
      {
        requirement: 'Average Annual Turnover >= ₹ 30.00 Cr in last 3 financial years',
        status: 'PASS',
        evidence: 'Average turnover ₹ 34.80 Cr',
        source: 'CyberNet_Statutory_Auditor_Report_3Yrs.pdf',
        explanation: 'Meets turnover criterion.'
      },
      {
        requirement: 'Accredited ISO 9001:2015 and ISO 27001:2013 certifications',
        status: 'PASS',
        evidence: 'BSI ISO 9001 and Intertek ISO 27001 certificates submitted and valid',
        source: 'CyberNet_ISO_Certifications.pdf',
        explanation: 'Both ISO certificates verified.'
      },
      {
        requirement: 'Bank Solvency Certificate >= ₹ 10.00 Cr issued within last 6 months',
        status: 'PARTIAL',
        evidence: 'Solvency certificate dated 15 Jan 2026 (7.5 months prior to tender)',
        source: 'HDFC_Bank_Solvency_Certificate.pdf',
        explanation: 'Exceeds the 6-month recency limit specified in RFP clause 4.2.'
      },
      {
        requirement: 'Minimum 2 past government CCTV projects >= ₹ 15 Cr',
        status: 'PARTIAL',
        evidence: 'Project 1 (Nagpur) is ₹17.2 Cr (Pass); Project 2 (Thane) is ₹11.5 Cr (Below ₹15 Cr)',
        source: 'TMC_SmartLighting_CCTV_Acceptance.pdf',
        explanation: 'Only 1 project satisfies the ₹15 Cr single contract value threshold.'
      }
    ],
    technicalEvaluation: {
      summary: 'Solid network architecture utilizing edge GPU accelerators and Kubernetes control plane.',
      strengths: [
        'Robust multi-agency dispatch dashboard.',
        'High-performance video clustering with automated load balancing.'
      ],
      weaknesses: [
        'Edge enclosure cooling might experience throttling during peak summer months.',
        '13-month rollout timeline exceeds best-in-class proposal.'
      ],
      feasibilityScore: 83,
      evidence: [
        {
          sourceFile: 'CyberNet_Technical_Specification_Compliance.pdf',
          pageOrSection: 'Section 2.1',
          evidenceText: 'Fanless edge units rated up to 45C.'
        }
      ]
    },
    pastPerformance: {
      summary: 'Proven delivery on 1 qualifying large smart city project (Nagpur) and 1 medium project (Thane).',
      verifiedProjectsCount: 2,
      similarityRating: 'MEDIUM',
      delayOrDisputeFlags: [],
      evidenceBreakdown: {
        verifiedEvidence: [
          'Nagpur Smart City completion certificate'
        ],
        selfDeclared: [],
        unverifiedClaims: [
          'Thane Municipal project claimed as equivalent CCTV scope despite significant lighting component'
        ],
        missingInfo: []
      }
    },
    financialEvaluation: {
      summary: 'Stable balance sheet with acceptable liquidity ratio of 1.72.',
      stabilityRating: 'MEDIUM',
      contractCapabilityFit: 'ACCEPTABLE',
      financialInconsistencies: [
        'Bank solvency certificate is 7.5 months old vs 6-month requirement'
      ],
      unknownMetrics: []
    },
    documentConsistency: {
      inconsistencies: [
        {
          title: 'Bank Solvency Certificate Date Discrepancy',
          severity: 'MEDIUM',
          evidence: 'Certificate dated 15-01-2026 vs RFP requirement of issuance after 15-02-2026.',
          explanation: 'Clause 4.2 requires bank solvency certificates to be issued within 6 months prior to tender notice.',
          fieldAffected: 'Bank Solvency Validity'
        }
      ]
    },
    riskAssessment: [
      {
        id: 'rsk-002',
        title: 'Sub-Threshold Project Value Qualification',
        category: 'Compliance Risk',
        severity: 'MEDIUM',
        evidence: 'Thane project is valued at ₹ 11.5 Cr instead of required ₹ 15 Cr.',
        explanation: 'Procurement evaluation committee must decide whether to grant a minor variance or seek supplementary project documentation.',
        recommendedHumanVerification: 'Clarify with bidder if an addendum project completion certificate is available.'
      }
    ],
    missingInformation: [
      {
        title: 'Updated Bank Solvency Certificate',
        description: 'Current certificate was issued > 6 months ago.',
        impact: 'Potential technical disqualification under strict RFP clause 4.2.',
        requiredAction: 'Issue clarification notice requesting fresh bank solvency certificate.',
        priority: 'HIGH'
      }
    ],
    evidenceRepository: [
      {
        id: 'ev-003',
        sourceFile: 'HDFC_Bank_Solvency_Certificate.pdf',
        pageOrSection: 'Date Stamp',
        evidenceText: 'HDFC Bank Solvency ₹ 12.00 Cr dated 15-Jan-2026',
        classification: 'Third-party verification',
        verified: true
      }
    ],
    explainability: {
      whatAIFound: 'CyberNet possesses genuine technical engineering capacity, but has two procedural non-compliances: an aged bank solvency letter and one undersized past reference project.',
      whyItMatters: 'Procurement rules require equitable standards across all competing vendors.',
      supportingEvidence: 'RFP Vol I Clause 4.2 (solvency recency) and Clause 3.1 (past project minimum value).',
      evidenceOrigin: 'Extracted directly from submitted HDFC certificate and Thane Municipal certificate.',
      confidenceLevel: 'HIGH (89%)',
      requiresHumanVerification: true,
      humanVerificationFocus: 'Evaluation committee decision on whether to request updated solvency document.'
    },
    humanReview: {
      officerStatus: 'PENDING_REVIEW',
      officerNotes: 'Clarification notice to be dispatched regarding bank solvency certificate recency.',
      annotations: []
    }
  },
  'bid-003': {
    tenderId: 'tnd-2026-001',
    bidderId: 'bid-003',
    analyzedAt: '2026-09-05T17:00:00.000Z',
    aiModelUsed: 'gemini-3.8-flash (8-Stage Strict Multi-Vector Due-Diligence)',
    overallScore: 46,
    aiConfidence: 96,
    recommendation: 'INELIGIBLE',
    recommendationStatement: 'Apex Global Infotech LLP fails to satisfy core mandatory RFP criteria: Average turnover is ₹21.8 Cr (below mandatory ₹30 Cr threshold), mandatory ISO 27001 information security certification is missing, and past project experience is limited to small residential complexes (₹48 Lakhs vs ₹15 Cr requirement).',
    scoresByCategory: [
      {
        category: 'Eligibility & Statutory Compliance',
        maxPoints: 20,
        awardedPoints: 6,
        percentage: 30,
        confidence: 'HIGH',
        reason: 'Failed mandatory turnover threshold (₹21.8 Cr vs ₹30 Cr minimum). Missing accredited ISO 27001 certification.',
        evidenceReferences: [
          {
            sourceFile: 'Apex_Provisional_Financial_Turnover.pdf',
            pageOrSection: 'Page 1',
            evidenceText: 'Total revenue FY26 reported as ₹ 21,80,00,000.'
          },
          {
            sourceFile: 'Apex_Self_Attestation_ISO_Declaration.pdf',
            pageOrSection: 'Declaration',
            evidenceText: 'Self-declaration letter only; no third-party accredited ISO 27001 certificate.'
          }
        ]
      },
      {
        category: 'Technical Architecture & Feasibility',
        maxPoints: 30,
        awardedPoints: 14,
        percentage: 46,
        confidence: 'HIGH',
        reason: 'Superficial architecture relying on unspecified outsourced third-party SaaS without tier-3 SAN storage guarantees.',
        evidenceReferences: [
          {
            sourceFile: 'Apex_Brief_Technical_Writeup.pdf',
            pageOrSection: 'Section 1.2',
            evidenceText: 'Commercial off-the-shelf camera deployment with outsourced analytics.'
          }
        ]
      },
      {
        category: 'Past Performance & Proven Track Record',
        maxPoints: 25,
        awardedPoints: 4,
        percentage: 16,
        confidence: 'HIGH',
        reason: 'Only submitted a residential colony CCTV setup of ₹ 48 Lakhs; completely lacks smart city or government-scale track record.',
        evidenceReferences: [
          {
            sourceFile: 'ApexMeadows_RWA_Letter.pdf',
            pageOrSection: 'Subject Line',
            evidenceText: 'Installation of 42 CCTV cameras in housing society valued at ₹ 48,00,000.'
          }
        ]
      },
      {
        category: 'Financial Solvency & Health',
        maxPoints: 15,
        awardedPoints: 5,
        percentage: 33,
        confidence: 'HIGH',
        reason: 'Financials are un-audited provisional drafts. Bank solvency certificate was not provided.',
        evidenceReferences: [
          {
            sourceFile: 'Apex_Provisional_Financial_Turnover.pdf',
            pageOrSection: 'Footer Note',
            evidenceText: 'Unaudited figures prepared by internal accounting staff.'
          }
        ]
      },
      {
        category: 'Proposal Quality & Delivery Viability',
        maxPoints: 5,
        awardedPoints: 2,
        percentage: 40,
        confidence: 'HIGH',
        reason: 'Unrealistic 8-month timeline without detailed work breakdown or risk mitigation plan.',
        evidenceReferences: [
          {
            sourceFile: 'Apex_Brief_Technical_Writeup.pdf',
            pageOrSection: 'Timeline Table',
            evidenceText: 'Total duration estimated at 8 calendar months.'
          }
        ]
      }
    ],
    eligibilityChecks: [
      {
        requirement: 'Entity incorporated in India for >= 5 continuous years',
        status: 'FAIL',
        evidence: 'LLP registered in August 2021 (approx. 5.1 years, borderline, but LLP converted from unregistered firm)',
        source: 'Apex_LLP_Agreement_and_Registration.pdf',
        explanation: 'Barely meets age requirement, but lacks required operating documentation.'
      },
      {
        requirement: 'Average Annual Turnover >= ₹ 30.00 Cr in last 3 financial years',
        status: 'FAIL',
        evidence: 'Unaudited turnover reported as ₹ 21.80 Cr (₹ 8.20 Cr deficit)',
        source: 'Apex_Provisional_Financial_Turnover.pdf',
        explanation: 'Critical failure: Deficient by over 27% below the statutory minimum.'
      },
      {
        requirement: 'Accredited ISO 9001:2015 and ISO 27001:2013 certifications',
        status: 'FAIL',
        evidence: 'Only self-declaration letter provided for ISO 27001; no accredited certificate',
        source: 'Apex_Self_Attestation_ISO_Declaration.pdf',
        explanation: 'Critical failure: Missing mandatory information security credential.'
      },
      {
        requirement: 'Bank Solvency Certificate >= ₹ 10.00 Cr issued within last 6 months',
        status: 'FAIL',
        evidence: 'No bank solvency certificate submitted in bid package',
        source: 'Bid Submission Dossier',
        explanation: 'Critical failure: Bank solvency guarantee missing.'
      },
      {
        requirement: 'Minimum 2 past government CCTV projects >= ₹ 15 Cr',
        status: 'FAIL',
        evidence: 'Submitted single private housing colony project of ₹ 48 Lakhs',
        source: 'ApexMeadows_RWA_Letter.pdf',
        explanation: 'Critical failure: Grossly insufficient scale (₹0.48 Cr vs ₹15 Cr requirement).'
      }
    ],
    technicalEvaluation: {
      summary: 'Deficient technical proposal that does not address tier-3 redundancy, failover SAN architecture, or SLA engineering requirements.',
      strengths: [
        'Competitively low headline price bid (₹ 23.90 Cr).'
      ],
      weaknesses: [
        'No proven edge AI analytics software stack.',
        'Core analytics outsourced to unspecified third-party without SLA back-to-back commitments.',
        'Inadequate engineering team (only 2 key personnel named).'
      ],
      feasibilityScore: 42,
      evidence: [
        {
          sourceFile: 'Apex_Brief_Technical_Writeup.pdf',
          pageOrSection: 'Section 2',
          evidenceText: 'Team consists of Managing Partner and Operations Head.'
        }
      ]
    },
    pastPerformance: {
      summary: 'Virtually no enterprise or government public surveillance experience.',
      verifiedProjectsCount: 0,
      similarityRating: 'VERY LOW',
      delayOrDisputeFlags: ['No certified public reference'],
      evidenceBreakdown: {
        verifiedEvidence: [],
        selfDeclared: ['Residential colony camera install'],
        unverifiedClaims: ['Claims capability to deploy 2,400 cameras in 8 months without documented equipment fleet'],
        missingInfo: ['Both required municipal reference completion certificates missing']
      }
    },
    financialEvaluation: {
      summary: 'Turnover falls far below mandatory threshold; un-audited books indicate substantial solvency risk for a ₹28.5 Cr project.',
      stabilityRating: 'LOW',
      contractCapabilityFit: 'HIGH RISK',
      financialInconsistencies: [
        'Provisional balance sheet lacks statutory auditor sign-off and UDIN number',
        'Turnover ₹21.8 Cr vs ₹30 Cr threshold'
      ],
      unknownMetrics: ['Audited net worth', 'Statutory tax clearance statement']
    },
    documentConsistency: {
      inconsistencies: [
        {
          title: 'Missing Mandatory ISO 27001 Certification',
          severity: 'CRITICAL',
          evidence: 'Bidder substituted self-declaration letter in lieu of third-party accredited certificate.',
          explanation: 'RFP Clause 2.4 specifies that self-declarations for ISO 27001 are strictly rejected.',
          fieldAffected: 'Information Security Certification'
        },
        {
          title: 'Turnover Deficit of ₹ 8.20 Crore',
          severity: 'CRITICAL',
          evidence: 'Reported turnover is ₹ 21.8 Cr vs mandatory threshold of ₹ 30.0 Cr.',
          explanation: 'Incurable defect under Rule 173 of General Financial Rules (GFR 2017).',
          fieldAffected: 'Financial Turnover'
        }
      ]
    },
    riskAssessment: [
      {
        id: 'rsk-003',
        title: 'High Vendor Default and Abandonment Risk',
        category: 'Financial Risk',
        severity: 'CRITICAL',
        evidence: 'Turnover is smaller than the single contract value (₹21.8 Cr vs ₹28.5 Cr tender budget).',
        explanation: 'Awarding a contract exceeding the entire annual turnover of an un-audited firm carries extreme risk of insolvency or abandoned milestones.',
        recommendedHumanVerification: 'Reject bid at preliminary technical qualification stage.'
      },
      {
        id: 'rsk-004',
        title: 'Information Security & Data Privacy Vulnerability',
        category: 'Compliance Risk',
        severity: 'CRITICAL',
        evidence: 'Lack of ISO 27001 accreditation and reliance on unvetted third-party cloud analytics.',
        explanation: 'Government surveillance camera video streams could be subject to unauthorized external egress or interception.',
        recommendedHumanVerification: 'Non-compliant with cybersecurity guidelines issued by MeitY.'
      }
    ],
    missingInformation: [
      {
        title: 'Statutory Audited Balance Sheets (3 Years)',
        description: 'Only un-audited internal sheets submitted.',
        impact: 'Fatal non-compliance.',
        requiredAction: 'Disqualify at preliminary stage.',
        priority: 'CRITICAL'
      },
      {
        title: 'Bank Solvency Guarantee (₹ 10 Cr)',
        description: 'Entirely omitted from submission.',
        impact: 'Fatal non-compliance.',
        requiredAction: 'Disqualify at preliminary stage.',
        priority: 'CRITICAL'
      }
    ],
    evidenceRepository: [
      {
        id: 'ev-004',
        sourceFile: 'Apex_Provisional_Financial_Turnover.pdf',
        pageOrSection: 'Page 1',
        evidenceText: 'Revenue FY26 ₹ 21.8 Cr (Below threshold)',
        classification: 'Bidder-provided',
        verified: true
      }
    ],
    explainability: {
      whatAIFound: 'Apex Global Infotech is non-responsive on multiple non-negotiable mandatory criteria: sub-threshold turnover, absent ISO 27001 certificate, missing bank solvency, and negligible past experience.',
      whyItMatters: 'General Financial Rules (GFR) mandate technical disqualification of non-compliant bids prior to financial opening.',
      supportingEvidence: 'Official bid submission package containing only provisional sheets, self-declarations, and an irrelevant residential project.',
      evidenceOrigin: 'Extracted directly from submitted bid package.',
      confidenceLevel: 'VERY HIGH (96%)',
      requiresHumanVerification: true,
      humanVerificationFocus: 'Formal endorsement of technical rejection by procurement committee.'
    },
    humanReview: {
      officerStatus: 'REJECTED_NON_COMPLIANT',
      officerNotes: 'Rejected at preliminary technical scrutiny stage due to turnover deficiency (₹21.8 Cr vs ₹30 Cr) and missing ISO 27001 certificate.',
      annotations: []
    }
  }
};

export const INITIAL_AUDIT_LOGS: AuditEvent[] = [
  {
    id: 'aud-001',
    tenderId: 'tnd-2026-001',
    bidderId: 'bid-003',
    timestamp: '2026-09-05T17:30:00.000Z',
    action: 'HUMAN_REVIEW_CONFIRMED',
    actor: 'Director of Procurement',
    actorRole: 'OFFICER',
    details: 'Formal review signed off: Apex Global Infotech marked REJECTED_NON_COMPLIANT due to turnover deficiency and missing ISO 27001.'
  },
  {
    id: 'aud-002',
    tenderId: 'tnd-2026-001',
    timestamp: '2026-09-05T17:05:00.000Z',
    action: 'AI_ANALYSIS_EXECUTED',
    actor: 'Authorized Procurement Officer',
    actorRole: 'OFFICER',
    details: 'Full 8-stage AI due-diligence executed across 3 submissions for Smart City CCTV Surveillance. Lead candidate: Vigilance Tech Solutions Pvt Ltd (88/100).'
  },
  {
    id: 'aud-003',
    tenderId: 'tnd-2026-001',
    bidderId: 'bid-003',
    timestamp: '2026-09-05T16:20:00.000Z',
    action: 'BID_SUBMISSION_RECEIVED',
    actor: 'Siddharth Malhotra',
    actorRole: 'BIDDER',
    details: 'Apex Global Infotech LLP submitted bid packet with 4 attached documents.'
  },
  {
    id: 'aud-004',
    tenderId: 'tnd-2026-001',
    bidderId: 'bid-002',
    timestamp: '2026-09-04T11:30:00.000Z',
    action: 'BID_SUBMISSION_RECEIVED',
    actor: 'Vikramaditya Shinde',
    actorRole: 'BIDDER',
    details: 'CyberNet Urban Systems Ltd submitted bid packet with 5 attached documents.'
  },
  {
    id: 'aud-005',
    tenderId: 'tnd-2026-001',
    bidderId: 'bid-001',
    timestamp: '2026-09-02T14:35:00.000Z',
    action: 'BID_SUBMISSION_RECEIVED',
    actor: 'Rajeshwari Ramanathan',
    actorRole: 'BIDDER',
    details: 'Vigilance Tech Solutions Pvt Ltd submitted bid packet with 6 attached documents.'
  },
  {
    id: 'aud-006',
    tenderId: 'tnd-2026-002',
    timestamp: '2026-08-01T10:30:00.000Z',
    action: 'TENDER_PUBLISHED',
    actor: 'Chief Procurement Officer, NHAI',
    actorRole: 'OFFICER',
    details: 'Tender MORTH/NHAI/2026/PKG-4 officially published: Automated Highway Toll Management & FASTag Modernization (Budget: ₹ 14.20 Cr).'
  },
  {
    id: 'aud-007',
    tenderId: 'tnd-2026-001',
    timestamp: '2026-08-15T09:30:00.000Z',
    action: 'TENDER_PUBLISHED',
    actor: 'Department of Urban Development & Municipal Affairs',
    actorRole: 'OFFICER',
    details: 'Tender GEM/2026/B/894102 published: Smart City CCTV Surveillance & AI Command Center (Budget: ₹ 28.50 Cr) with 6 mandatory criteria.'
  }
];
