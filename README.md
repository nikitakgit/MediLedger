<<<<<<< HEAD
# MediLedger : Blockchain-Based Secure Storage and Billing Management Application of Electronic Health Record


## Getting Started

To get started with our Application, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/nikitakgit/MediLedger.git
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Ethereum Wallet and Sepolia Network

 	•	Install and set up Metamask.
	•	Configure your Ethereum wallet and Sepolia network settings.
	
### 4. Update Solidity File

	•	Add your account_section addresses from Metamask wallet in the constructor of our solidity file.

### 5. Add Environment Variables

	•	Create a .env.local file with your RPC URL and Metamask private key.
 
```bash
NEXT_PUBLIC_RPC_URL=<your_infura_rpc_url>
NEXT_PUBLIC_PRIVATE_KEY=<your_metamask_private_key>
```

### 6. Compile and Deploy Contract

Compile and deploy the contract using Hardhat, and note the deployed address from terminal and add it to .env.local file.

```bash
npx hardhat compile
# or
npx hardhat scripts/deploy.js
```

### 7. Run the Development Server

```bash
npm run dev
```

### 8. View the Application

Open http://localhost:3000 with your browser to see the result.

### 9. Usage Instructions

	1.	First, add a patient using the given links in the navigation bar of the home page.
	2.	Then, checkout that patient through the “allPatients” link in the navigation bar of the home page.
	3.	Click on your added patient’s card and check its details, add bills, and reports through the doctor’s wallet ID or reimburse pending bills through the accounts wallet ID in Metamask.

### 10. Start Editing

You can start editing the page by modifying pages/index.js. The page auto-updates as you edit the file.

Note: Be careful with the constraints put. For more information, read MediLedger.sol program.
Update <your_rpc_url> and <your_metamask_private_key> with your actual RPC URL and Metamask private key respectively.
=======
# MediLedger
MediLedger is a blockchain-based hospital and bill management system that securely handles patient records, doctor prescriptions, and financial transactions with transparency and efficiency.
>>>>>>> 94ca27fe908ba64d617468f4667bff07197e0025
