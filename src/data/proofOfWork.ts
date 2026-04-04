export interface ProofOfWork {
  challenge: string;
  tools: string[];
  approach: string;
  result: string;
}

export const proofOfWork: ProofOfWork[] = [
  {
    challenge: "Hidden Data Extraction",
    tools: ["binwalk", "strings"],
    approach: "Analyzed binary file for embedded data, used binwalk to detect compressed sections, extracted with strings command to reveal hidden flag",
    result: "Successfully recovered hidden flag from compromised binary"
  },
  {
    challenge: "Network Vulnerability Assessment",
    tools: ["Nmap", "Metasploit"],
    approach: "Scanned target network for open ports using Nmap, identified vulnerable services, exploited with Metasploit framework",
    result: "Discovered and patched 3 critical vulnerabilities in client infrastructure"
  },
  {
    challenge: "Malware Analysis",
    tools: ["IDA Pro", "Wireshark"],
    approach: "Reverse engineered malicious executable, analyzed network traffic for C2 communications, identified persistence mechanisms",
    result: "Mapped complete malware behavior and provided mitigation strategies"
  }
];