export const SERVICES = [
  {
    slug: "server-computing",
    icon: "Server",
    num: "01",
    title: "Server & Computing",
    tag: "COMPUTE / VIRTUALIZATION / STORAGE",
    blurb:
      "Right-sized compute environments — from single virtualization hosts to clustered, redundant server platforms with backup and recovery built in.",
    deliverables: [
      "Virtualization design and host deployment",
      "Compute and storage refresh projects",
      "Backup, replication, and recovery configuration",
      "Capacity planning and lifecycle roadmaps",
    ],
    engagements: ["Server consolidation", "Virtualization environment build-out", "Storage & backup modernization"],
  },
  {
    slug: "network-connectivity",
    icon: "Network",
    num: "02",
    title: "Network & Connectivity",
    tag: "SWITCHING / ROUTING / WAN",
    blurb:
      "Structured network upgrades and multi-site connectivity — switching, routing, wireless, and WAN links designed for uptime and documented for handover.",
    deliverables: [
      "LAN / WLAN design and refresh",
      "Multi-site WAN and SD-WAN deployments",
      "Structured cabling coordination",
      "Network documentation and topology maps",
    ],
    engagements: ["Multi-site network upgrades", "Office build-outs and relocations", "Wireless surveys and remediation"],
  },
  {
    slug: "data-center",
    icon: "HardDrive",
    num: "03",
    title: "Data Center & Physical Infrastructure",
    tag: "RACK / POWER / COOLING",
    blurb:
      "The physical layer done properly — racking, power distribution, cooling coordination, and cabling standards that make everything above it manageable.",
    deliverables: [
      "Rack and stack design and execution",
      "Power and UPS planning",
      "Cooling and airflow coordination",
      "Structured cabling standards and labeling",
    ],
    engagements: ["Server room build-outs", "Data center refresh and consolidation", "Cabling remediation"],
  },
  {
    slug: "security-resilience",
    icon: "ShieldCheck",
    num: "04",
    title: "Security & Resilience",
    tag: "FIREWALL / VPN / SEGMENTATION",
    blurb:
      "Practical perimeter and internal security — firewalls, VPN, segmentation, and hardening aligned to how your organization actually operates.",
    deliverables: [
      "Firewall deployment and policy design",
      "Site-to-site and remote-access VPN",
      "Network segmentation projects",
      "Recovery planning and resilience reviews",
    ],
    engagements: ["Firewall replacement programs", "Segmentation for compliance scope reduction", "Remote-access modernization"],
  },
  {
    slug: "managed-infrastructure",
    icon: "Activity",
    num: "05",
    title: "Managed Infrastructure",
    tag: "MONITOR / PATCH / MAINTAIN",
    blurb:
      "Ongoing stewardship of the environments we build — monitoring, patching, documentation, and lifecycle management under a defined scope of work.",
    deliverables: [
      "Infrastructure monitoring and alerting",
      "Patch and firmware management",
      "Living documentation and asset registers",
      "Quarterly environment reviews",
    ],
    engagements: ["Managed server and network environments", "Co-managed infrastructure alongside internal IT", "Lifecycle and renewal management"],
  },
];

export const SOLUTIONS = [
  {
    code: "SB",
    title: "Small Business",
    range: "1 site / up to ~50 users",
    blurb:
      "Foundational infrastructure done right the first time — a server room that isn't a closet of surprises, and a network that doesn't need rebooting.",
    points: [
      "Right-sized server and network setups",
      "Secure remote access from day one",
      "Documentation your next provider will thank you for",
    ],
  },
  {
    code: "SME",
    title: "Business & SME",
    range: "1–5 sites / 50–250 users",
    blurb:
      "Growing organizations that have outgrown ad-hoc IT. We bring structure: standardized builds, segmented networks, and managed environments.",
    points: [
      "Standardized multi-site architectures",
      "Firewall, VPN, and segmentation projects",
      "Managed infrastructure with defined scope",
    ],
  },
  {
    code: "ENT",
    title: "Enterprise & Multi-Site",
    range: "5+ sites / 250+ users",
    blurb:
      "Distributed operations that need engineering rigor — lifecycle planning, resilient WAN design, and delivery processes that survive audits.",
    points: [
      "Multi-site deployment programs",
      "Data center and compute lifecycle projects",
      "Co-managed delivery alongside internal teams",
    ],
  },
];

export const INDUSTRIES = [
  { name: "Healthcare & Clinics", note: "Segmented clinical networks, reliable compute for line-of-care systems." },
  { name: "Financial Services", note: "Documented, auditable infrastructure with disciplined change control." },
  { name: "Manufacturing & Logistics", note: "Plant-floor connectivity and warehouse networks built for harsh realities." },
  { name: "Retail & Multi-Site", note: "Repeatable site builds and centralized management across locations." },
  { name: "Professional Services", note: "Secure, quiet infrastructure that keeps billable work moving." },
  { name: "SaaS & Technology", note: "Hybrid environments and lab infrastructure for engineering teams." },
  { name: "Education", note: "High-density wireless and segmented student / staff networks." },
  { name: "Hospitality", note: "Property-wide networks and back-of-house systems that just work." },
];

export const STAGES = [
  { num: "01", name: "Assess", desc: "We start with what exists, not what we want to sell you.", deliverables: ["Environment audit and inventory", "Risk and gap register", "Stakeholder requirements capture"] },
  { num: "02", name: "Design", desc: "Architecture before hardware. Every design states its assumptions.", deliverables: ["Target architecture diagrams", "Bill of materials with options", "Migration and rollback plan"] },
  { num: "03", name: "Deploy", desc: "Structured implementation with change windows that respect operations.", deliverables: ["Staged implementation plan", "Configuration as documented code", "Acceptance testing per site"] },
  { num: "04", name: "Secure", desc: "Security applied as a layer of the build, not an afterthought.", deliverables: ["Hardening baselines", "Firewall and segmentation policy", "Access model documentation"] },
  { num: "05", name: "Document", desc: "If it isn't documented, it isn't delivered.", deliverables: ["As-built diagrams", "Configuration runbooks", "Asset and warranty register"] },
  { num: "06", name: "Manage", desc: "Monitoring, patching, and lifecycle care under a defined scope.", deliverables: ["Monitoring and alert thresholds", "Patch cadence and reporting", "Quarterly environment reviews"] },
  { num: "07", name: "Optimize", desc: "Environments drift. We measure, tune, and plan the next cycle.", deliverables: ["Performance and capacity analysis", "Lifecycle and refresh roadmap", "Cost and consolidation review"] },
];

export const TECH_AREAS = [
  { category: "Compute & Virtualization", items: ["VMware vSphere", "Microsoft Hyper-V", "Proxmox VE", "Dell PowerEdge", "HPE ProLiant", "Veeam Backup"] },
  { category: "Networking", items: ["Cisco", "Juniper", "Aruba / HPE", "Ubiquiti UniFi", "MikroTik", "SD-WAN architectures"] },
  { category: "Security", items: ["Palo Alto", "Fortinet FortiGate", "pfSense / OPNsense", "WireGuard & IPsec VPN", "VLAN segmentation", "Zero Trust Network Access"] },
  { category: "Cloud & Hybrid", items: ["Microsoft Azure", "AWS", "Microsoft 365", "Hybrid connectivity", "Azure Site Recovery", "AWS Direct Connect"] },
  { category: "Data Center Physical", items: ["Rack & power design", "UPS systems (APC / Eaton)", "Structured cabling (Cat6A / fiber)", "Environmental monitoring", "KVM & out-of-band", "Hot/cold aisle practices"] },
  { category: "Operations & Tooling", items: ["Zabbix / Prometheus", "Grafana dashboards", "Ansible automation", "NetBox documentation", "PowerShell / Bash", "Git-managed configs"] },
];

export const OPEN_ROLES = [
  { title: "Infrastructure Engineer", type: "Full-time / Hybrid", note: "Server, virtualization, and storage delivery across client environments." },
  { title: "Network Engineer", type: "Full-time / Hybrid", note: "Multi-site switching, routing, firewall, and WAN projects." },
  { title: "Systems Administrator", type: "Full-time / Remote-first", note: "Managed infrastructure operations: monitoring, patching, documentation." },
];
