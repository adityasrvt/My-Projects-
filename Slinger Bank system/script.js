
let currentAccount = null;

if (!localStorage.getItem('bankCode')) {
    localStorage.setItem('bankCode', '101');
}


function generateCardNumber() {
    let cardNum = '4532';
    for (let i = 0; i < 12; i++) {
        cardNum += Math.floor(Math.random() * 10);
    }
    return cardNum;
}

function generateExpiryDate() {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 3);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${year}`;
}

function formatCardNumber(cardNumber, showFull = false) {
    if (!cardNumber) return '**** **** **** ****';
    if (showFull) {
        return cardNumber.match(/.{1,4}/g).join(' ');
    }
    return `**** **** **** ${cardNumber.slice(-4)}`;
}


function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show';
    if (isError) {
        notification.classList.add('error');
    }
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}


document.getElementById('createAccountForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const aadhaar = document.getElementById('aadhaar').value;
    const password = document.getElementById('password').value;
    
   
    let bankCode = parseInt(localStorage.getItem('bankCode'));
    const accountNumber = 'SOI' + bankCode;
    localStorage.setItem('bankCode', (bankCode + 1).toString());
    
    
    const account = {
        accountHolderName: fullName,
        accountNumber: accountNumber,
        accountPassword: password,
        addharNumber: aadhaar,
        email: email,
        phoneNumber: phone,
        balance: 500.00,
        transactionHistory: [{
            type: 'Deposit',
            amount: 500.00,
            date: new Date().toISOString(),
            description: 'Initial Deposit'
        }],
        debitCard: {
            number: generateCardNumber(),
            pin: '1234',
            expiry: generateExpiryDate(),
            cvv: Math.floor(100 + Math.random() * 900).toString()
        },
        creditCard: {
            number: generateCardNumber(),
            pin: '1234',
            expiry: generateExpiryDate(),
            limit: 50000,
            used: 0
        },
        createdDate: new Date().toISOString()
    };
    
    localStorage.setItem(accountNumber, JSON.stringify(account));
    
    showNotification(`Account Created Successfully! Account Number: ${accountNumber}`);
    
    document.getElementById('createAccountForm').reset();
});


document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const accountNumber = document.getElementById('loginAccountNumber').value;
    const password = document.getElementById('loginPassword').value;
    
    const accountData = localStorage.getItem(accountNumber);
    
    if (!accountData) {
        showNotification('Account not found!', true);
        return;
    }
    
    const account = JSON.parse(accountData);
    
    if (account.accountPassword !== password) {
        showNotification('Invalid Password!', true);
        return;
    }
    

    currentAccount = account;
    showNotification('Login Successful!');
    

    document.querySelector('.cards-wrapper').style.display = 'none';
    document.querySelector('.subtitle').style.display = 'none';
    document.querySelector('h1').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    
    
    updateDashboard();
    
    
    document.getElementById('loginForm').reset();
});


document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
       
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});


function updateDashboard() {
    document.getElementById('accountHolderName').textContent = currentAccount.accountHolderName;
    document.getElementById('currentBalance').textContent = currentAccount.balance.toFixed(2);
    document.getElementById('accountNumberDisplay').textContent = currentAccount.accountNumber;
    
    
    updateCardDisplay();
    
   
    document.getElementById('detailsName').textContent = currentAccount.accountHolderName;
    document.getElementById('detailsNumber').textContent = currentAccount.accountNumber;
    document.getElementById('detailsEmail').textContent = currentAccount.email;
    document.getElementById('detailsPhone').textContent = currentAccount.phoneNumber;
    document.getElementById('detailsAadhaar').textContent = currentAccount.addharNumber;
    document.getElementById('accountCreated').textContent = new Date(currentAccount.createdDate).toLocaleDateString();
    
 
    displayTransactionHistory();
    
   
    updateQuickStats();
}


function updateCardDisplay() {
    
    document.getElementById('debitCardNumber').textContent = formatCardNumber(currentAccount.debitCard.number);
    document.getElementById('debitCardHolder').textContent = currentAccount.accountHolderName.toUpperCase();
    document.getElementById('debitCardExpiry').textContent = currentAccount.debitCard.expiry;
  
    document.getElementById('creditCardNumber').textContent = formatCardNumber(currentAccount.creditCard.number);
    document.getElementById('creditCardHolder').textContent = currentAccount.accountHolderName.toUpperCase();
    document.getElementById('creditCardExpiry').textContent = currentAccount.creditCard.expiry;
    
   
    const usedPercent = (currentAccount.creditCard.used / currentAccount.creditCard.limit) * 100;
    document.getElementById('creditUsageFill').style.width = usedPercent + '%';
    document.getElementById('creditAvailable').textContent = (currentAccount.creditCard.limit - currentAccount.creditCard.used).toFixed(2);
}

// Show Full Card Number
document.getElementById('showCardForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('cardPassword').value;
    
    if (password === currentAccount.accountPassword) {
        document.getElementById('debitCardNumber').textContent = formatCardNumber(currentAccount.debitCard.number, true);
        document.getElementById('creditCardNumber').textContent = formatCardNumber(currentAccount.creditCard.number, true);
        showNotification('Card details revealed. They will be hidden again on refresh.');
        document.getElementById('cardPassword').value = '';
    } else {
        showNotification('Incorrect password!', true);
    }
});

// Change PIN
document.getElementById('changePinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const currentPin = document.getElementById('currentPin').value;
    const newPin = document.getElementById('newPin').value;
    const confirmPin = document.getElementById('confirmPin').value;
    
    if (currentPin !== currentAccount.debitCard.pin) {
        showNotification('Current PIN is incorrect!', true);
        return;
    }
    
    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
        showNotification('PIN must be 4 digits!', true);
        return;
    }
    
    if (newPin !== confirmPin) {
        showNotification('PINs do not match!', true);
        return;
    }
    
    currentAccount.debitCard.pin = newPin;
    currentAccount.creditCard.pin = newPin;
    localStorage.setItem(currentAccount.accountNumber, JSON.stringify(currentAccount));
    
    showNotification('PIN changed successfully!');
    document.getElementById('changePinForm').reset();
});

// Update Quick Stats
function updateQuickStats() {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    
    currentAccount.transactionHistory.forEach(txn => {
        if (txn.type === 'Deposit' || txn.type === 'Transfer In') {
            totalDeposits += txn.amount;
        } else if (txn.type === 'Withdraw' || txn.type === 'Transfer Out') {
            totalWithdrawals += txn.amount;
        }
    });
    
    document.getElementById('totalDeposits').textContent = '₹' + totalDeposits.toFixed(2);
    document.getElementById('totalWithdrawals').textContent = '₹' + totalWithdrawals.toFixed(2);
    document.getElementById('totalTransactions').textContent = currentAccount.transactionHistory.length;
}

// Display Transaction History
function displayTransactionHistory(filter = 'all', period = 'all') {
    const historyDiv = document.getElementById('transactionHistory');
    
    if (!currentAccount.transactionHistory || currentAccount.transactionHistory.length === 0) {
        historyDiv.innerHTML = '<p class="no-transactions">No transactions yet</p>';
        return;
    }
    
    let transactions = [...currentAccount.transactionHistory];
    
    // Filter by type
    if (filter !== 'all') {
        transactions = transactions.filter(t => t.type.toLowerCase().includes(filter));
    }
    
    // Filter by period
    const now = new Date();
    if (period === 'today') {
        transactions = transactions.filter(t => {
            const txnDate = new Date(t.date);
            return txnDate.toDateString() === now.toDateString();
        });
    } else if (period === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        transactions = transactions.filter(t => new Date(t.date) >= weekAgo);
    } else if (period === 'month') {
        transactions = transactions.filter(t => {
            const txnDate = new Date(t.date);
            return txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
        });
    }
    
    if (transactions.length === 0) {
        historyDiv.innerHTML = '<p class="no-transactions">No transactions found for selected filters</p>';
        return;
    }
    
    historyDiv.innerHTML = '';
    
    transactions.reverse().forEach(transaction => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        
        const isPositive = transaction.type === 'Deposit' || transaction.type === 'Transfer In';
        const date = new Date(transaction.date).toLocaleString();
        
        item.innerHTML = `
            <div>
                <div style="font-weight: 600;">${transaction.type}</div>
                <div style="font-size: 0.85em; color: #718096;">${transaction.description || ''}</div>
                <div style="font-size: 0.8em; color: #a0aec0;">${date}</div>
            </div>
            <span class="${isPositive ? 'transaction-deposit' : 'transaction-withdraw'}">
                ${isPositive ? '+' : '-'} ₹${transaction.amount.toFixed(2)}
            </span>
        `;
        
        historyDiv.appendChild(item);
    });
}

// Transaction Filters
document.getElementById('filterType').addEventListener('change', function() {
    const type = this.value;
    const period = document.getElementById('filterPeriod').value;
    displayTransactionHistory(type, period);
});

document.getElementById('filterPeriod').addEventListener('change', function() {
    const type = document.getElementById('filterType').value;
    const period = this.value;
    displayTransactionHistory(type, period);
});

// Deposit Money
document.getElementById('depositForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('depositAmount').value);
    
    if (amount <= 0) {
        showNotification('Invalid Amount!', true);
        return;
    }
    
    currentAccount.balance += amount;
    currentAccount.transactionHistory.push({
        type: 'Deposit',
        amount: amount,
        date: new Date().toISOString(),
        description: 'Cash Deposit'
    });
    
    localStorage.setItem(currentAccount.accountNumber, JSON.stringify(currentAccount));
    
    showNotification(`Deposit Successful! New Balance: ₹${currentAccount.balance.toFixed(2)}`);
    updateDashboard();
    
    document.getElementById('depositForm').reset();
});

// Withdraw Money
document.getElementById('withdrawForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    
    if (amount <= 0) {
        showNotification('Invalid Amount!', true);
        return;
    }
    
    if (amount > currentAccount.balance) {
        showNotification('Insufficient Balance!', true);
        return;
    }
    
    currentAccount.balance -= amount;
    currentAccount.transactionHistory.push({
        type: 'Withdraw',
        amount: amount,
        date: new Date().toISOString(),
        description: 'Cash Withdrawal'
    });
    
    localStorage.setItem(currentAccount.accountNumber, JSON.stringify(currentAccount));
    
    showNotification(`Withdraw Successful! New Balance: ₹${currentAccount.balance.toFixed(2)}`);
    updateDashboard();
    
    document.getElementById('withdrawForm').reset();
});

// Transfer Money
document.getElementById('transferForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const recipientAccount = document.getElementById('transferAccount').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);
    
    if (amount <= 0) {
        showNotification('Invalid Amount!', true);
        return;
    }
    
    if (amount > currentAccount.balance) {
        showNotification('Insufficient Balance!', true);
        return;
    }
    
    if (recipientAccount === currentAccount.accountNumber) {
        showNotification('Cannot transfer to same account!', true);
        return;
    }
    
    // Check if recipient exists
    const recipientData = localStorage.getItem(recipientAccount);
    if (!recipientData) {
        showNotification('Recipient account not found!', true);
        return;
    }
    
    const recipient = JSON.parse(recipientData);
    
    // Deduct from sender
    currentAccount.balance -= amount;
    currentAccount.transactionHistory.push({
        type: 'Transfer Out',
        amount: amount,
        date: new Date().toISOString(),
        description: `Transfer to ${recipientAccount}`
    });
    
    // Add to recipient
    recipient.balance += amount;
    recipient.transactionHistory.push({
        type: 'Transfer In',
        amount: amount,
        date: new Date().toISOString(),
        description: `Transfer from ${currentAccount.accountNumber}`
    });
    
    // Save both accounts
    localStorage.setItem(currentAccount.accountNumber, JSON.stringify(currentAccount));
    localStorage.setItem(recipientAccount, JSON.stringify(recipient));
    
    showNotification(`Transfer Successful! ₹${amount.toFixed(2)} sent to ${recipientAccount}`);
    updateDashboard();
    
    document.getElementById('transferForm').reset();
});

// Change Password
document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (currentPassword !== currentAccount.accountPassword) {
        showNotification('Current password is incorrect!', true);
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('Password must be at least 6 characters!', true);
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match!', true);
        return;
    }
    
    currentAccount.accountPassword = newPassword;
    localStorage.setItem(currentAccount.accountNumber, JSON.stringify(currentAccount));
    
    showNotification('Password changed successfully!');
    document.getElementById('changePasswordForm').reset();
});

// Update Email
document.getElementById('updateEmailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newEmail = document.getElementById('newEmail').value;
    const password = document.getElementById('emailPassword').value;
    
    if (password !== currentAccount.accountPassword) {
        showNotification('Incorrect password!', true);
        return;
    }
    
    currentAccount.email = newEmail;
    localStorage.setItem(currentAccount.accountNumber, JSON.stringify(currentAccount));
    
    showNotification('Email updated successfully!');
    updateDashboard();
    document.getElementById('updateEmailForm').reset();
});

// Update Phone
document.getElementById('updatePhoneForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newPhone = document.getElementById('newPhone').value;
    const password = document.getElementById('phonePassword').value;
    
    if (password !== currentAccount.accountPassword) {
        showNotification('Incorrect password!', true);
        return;
    }
    
    currentAccount.phoneNumber = newPhone;
    localStorage.setItem(currentAccount.accountNumber, JSON.stringify(currentAccount));
    
    showNotification('Phone number updated successfully!');
    updateDashboard();
    document.getElementById('updatePhoneForm').reset();
});

// Download Statement
document.getElementById('downloadStatement').addEventListener('click', function() {
    let statement = `TASIN CODER BANK OF INDIA\n`;
    statement += `Account Statement\n\n`;
    statement += `Account Holder: ${currentAccount.accountHolderName}\n`;
    statement += `Account Number: ${currentAccount.accountNumber}\n`;
    statement += `Date: ${new Date().toLocaleDateString()}\n`;
    statement += `Current Balance: ₹${currentAccount.balance.toFixed(2)}\n\n`;
    statement += `TRANSACTION HISTORY\n`;
    statement += `${'='.repeat(80)}\n\n`;
    
    currentAccount.transactionHistory.forEach(txn => {
        const date = new Date(txn.date).toLocaleString();
        const sign = (txn.type === 'Deposit' || txn.type === 'Transfer In') ? '+' : '-';
        statement += `${date}\n`;
        statement += `${txn.type}: ${sign}₹${txn.amount.toFixed(2)}\n`;
        statement += `${txn.description || ''}\n\n`;
    });
    
    const blob = new Blob([statement], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statement_${currentAccount.accountNumber}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    
    showNotification('Statement downloaded successfully!');
});

// Card Request Buttons
document.getElementById('requestDebitCard').addEventListener('click', function() {
    showNotification('Debit card replacement request submitted! New card will arrive in 7-10 business days.');
});

document.getElementById('requestCreditCard').addEventListener('click', function() {
    showNotification('Credit card upgrade request submitted! You will be contacted within 48 hours.');
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    currentAccount = null;
    
    // Hide dashboard
    document.getElementById('dashboard').style.display = 'none';
    
    // Show login/create forms
    document.querySelector('.cards-wrapper').style.display = 'grid';
    document.querySelector('.subtitle').style.display = 'block';
    document.querySelector('h1').style.display = 'block';
    
    // Reset to overview tab
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="overview"]').classList.add('active');
    document.getElementById('overview').classList.add('active');
    
    showNotification('Logged out successfully!');
});
