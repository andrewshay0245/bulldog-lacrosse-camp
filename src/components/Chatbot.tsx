'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const FAQ_DATA = {
  camps: {
    keywords: ['camp', 'summer', 'day camp', 'program', 'what camps'],
    answer: `We offer several programs:\n\n• **Summer Camp** ($350) - 4-day camp for ages 7-17, 9AM-1PM\n• **Bulldog 120** ($125) - Intensive clinic for high school players\n• **Bulldog Experience** ($135) - Immersive training for HS players\n• **Bulldog Clash** ($350) - Elite prospect showcase for 2028/2029 grads`
  },
  location: {
    keywords: ['where', 'location', 'address', 'stadium', 'directions'],
    answer: `All camps are held at **Reese Stadium** at Yale University:\n\n📍 75 Central Ave, New Haven, CT 06515\n\nEnter via Chapel Street and Yale Avenue. You'll be directed to Lots E, F, or H.`
  },
  parking: {
    keywords: ['parking', 'park', 'car', 'lot'],
    answer: `**Parking: $10 per car** (Yale University policy)\n\nEnter at Chapel Street & Yale Avenue. Follow signs to Lots E, F, and H. Please respect NO PARKING signs - violators will be towed.`
  },
  refund: {
    keywords: ['refund', 'cancel', 'money back', 'cancellation'],
    answer: `**Refund Policy:**\n\n• $50 non-refundable processing fee on all refunds\n• Must contact us BY EMAIL at least 14 days prior\n• Contact within 14 days = NO refund\n• Doctor's note required for injury refunds\n• No refunds for same-day weather cancellation\n\nEmail: blclacrossecamps@gmail.com`
  },
  ages: {
    keywords: ['age', 'old', 'grade', 'years old', 'eligibility'],
    answer: `**Age Requirements:**\n\n• **Summer Camp**: Ages 7-17\n• **Bulldog 120**: High School students\n• **Bulldog Experience**: High School students\n• **Bulldog Clash**: Classes of 2028 & 2029`
  },
  contact: {
    keywords: ['contact', 'email', 'phone', 'reach', 'question'],
    answer: `**Contact Us:**\n\n📧 blclacrossecamps@gmail.com\n\nFor Bulldog Bash tournaments: eric.kluge@nxtsports.com`
  },
  price: {
    keywords: ['price', 'cost', 'how much', 'fee', 'payment'],
    answer: `**Pricing:**\n\n• Summer Camp: **$350**\n• Bulldog 120: **$125**\n• Bulldog Experience: **$135**\n• Bulldog Clash: **$350**\n\nWe only charge Stripe's standard processing fee (2.9% + $0.30) - no additional service fees!`
  },
  bring: {
    keywords: ['bring', 'need', 'equipment', 'gear', 'what to'],
    answer: `**What to Bring:**\n\n• Lacrosse stick\n• Helmet with face mask\n• Gloves\n• Arm pads\n• Shoulder pads\n• Cleats\n• Mouthguard\n• Water bottle\n• Sunscreen`
  },
  register: {
    keywords: ['register', 'sign up', 'enroll', 'book'],
    answer: `Ready to register? Click the **Register** button in the menu or visit our registration page!\n\nYou'll select your camp, enter player info, and pay securely through Stripe.`
  },
  coaches: {
    keywords: ['coach', 'staff', 'who teaches', 'instructors'],
    answer: `Our camps feature:\n\n• **Yale Men's Lacrosse coaches** including Head Coach Andy Shay\n• Regional high school and college coaches\n• Current Yale players\n\nBulldog Clash features coaches from Yale, Notre Dame, Harvard, Duke, UNC, Navy, Army, Maryland, and Fairfield!`
  }
};

function findAnswer(question: string): string {
  const lowerQuestion = question.toLowerCase();

  for (const [, data] of Object.entries(FAQ_DATA)) {
    if (data.keywords.some(keyword => lowerQuestion.includes(keyword))) {
      return data.answer;
    }
  }

  return `I'm not sure about that specific question. Here's how you can get help:\n\n📧 Email us at **blclacrossecamps@gmail.com**\n\nOr check out our [FAQ page](/faq) for more information!\n\nI can help with questions about:\n• Camps & programs\n• Pricing\n• Location & parking\n• Refund policy\n• What to bring\n• Registration`;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! 👋 I\'m here to help with questions about Bulldog Lacrosse Camps. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    const answer = findAnswer(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'What camps do you offer?',
    'How much does it cost?',
    'Where is the camp?',
    'What should I bring?'
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00356b] text-white rounded-full shadow-lg hover:bg-[#286dc0] transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-[#00356b] text-white p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Camp Assistant</h3>
                <p className="text-xs text-gray-200">Ask me anything!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 min-h-64 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-[#00356b] text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br />')
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="underline">$1</a>')
                  }} />
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00356b] focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 bg-[#00356b] text-white rounded-full flex items-center justify-center hover:bg-[#286dc0] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
