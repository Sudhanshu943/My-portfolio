export interface SecurityLab {
  name: string;
  tool: string;
  discovery: string;
}

export const securityLabs: SecurityLab[] = [
  {
    name: "Network Port Scanning",
    tool: "Nmap",
    discovery: "Identified open ports 22, 80, 443; detected SSH service running OpenSSH 7.6 with potential vulnerabilities"
  },
  {
    name: "Packet Capture Analysis",
    tool: "Wireshark",
    discovery: "Captured HTTP traffic revealing unencrypted login credentials; identified potential man-in-the-middle attack vector"
  },
  {
    name: "Web Vulnerability Scan",
    tool: "OWASP ZAP",
    discovery: "Found SQL injection vulnerability in login form; discovered XSS in comment section; identified missing security headers"
  }
];