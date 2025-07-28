// Simple test for the unified oracle API
const testUnifiedOracle = async () => {
  const testQuestion = "How can I find balance in my life?";
  
  try {
    const response = await fetch('/api/unified-oracle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: testQuestion }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reading = await response.json();
    
    console.log('✅ Unified Oracle API Test Successful');
    console.log('📖 General Outlook:', reading.generalOutlook);
    console.log('🃏 Current Path:', reading.currentPath);
    console.log('🔮 Path of Resolution:', reading.pathOfResolution);
    console.log('✨ Synthesis:', reading.synthesis);
    
    return reading;
  } catch (error) {
    console.error('❌ Unified Oracle API Test Failed:', error);
    throw error;
  }
};

// Export for use in browser console or testing
if (typeof window !== 'undefined') {
  (window as any).testUnifiedOracle = testUnifiedOracle;
}

export default testUnifiedOracle;
