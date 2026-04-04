export interface CTFWriteup {
  title: string;
  summary: string;
  tools: string[];
  steps: string;
  result: string;
}

export const ctfWriteups: CTFWriteup[] = [
  {
    title: "Web Exploitation Challenge",
    summary: "SQL injection vulnerability in login form",
    tools: ["Burp Suite", "SQLMap"],
    steps: "Intercepted login request with Burp, identified injectable parameter, used SQLMap to extract database contents",
    result: "Extracted admin credentials and gained database access"
  },
  {
    title: "Forensics Investigation",
    summary: "Hidden data in image file",
    tools: ["Steghide", "ExifTool"],
    steps: "Checked image metadata with ExifTool, detected embedded data with steghide, extracted using passphrase from challenge hint",
    result: "Recovered hidden flag from steganographic image"
  },
  {
    title: "Cryptography Puzzle",
    summary: "Encrypted message with unknown cipher",
    tools: ["CyberChef", "Python"],
    steps: "Analyzed ciphertext patterns, tried common ciphers in CyberChef, wrote Python script to brute-force Vigenère key",
    result: "Decrypted message revealing next challenge location"
  }
];