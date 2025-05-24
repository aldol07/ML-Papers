import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import ChatBot from "../../../components/ChatBot";

export default function ChatbotPage({ 
  params 
}: { 
  params: { personaId: string; sectorId: string } 
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link
            href={`/options/${params.personaId}/${params.sectorId}`}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <FaChevronLeft />
            <span>Back to Options</span>
          </Link>
          <div className="font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            FinMultiverse
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Sector-Specific Chatbot</h1>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <ChatBot persona={params.personaId} />
          </div>
        </div>
      </main>
    </div>
  );
} 