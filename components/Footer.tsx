export default function Footer() {
    return (
        <footer className="bg-[#2C2C2C] text-[#FDFBF7] py-8 relative overflow-hidden">
            {/* Subtle paint splatter decoration for the footer */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#D4A574]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E8E4DF]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Social & Copyright */}
                <div className="pt-6 border-t border-[#FDFBF7]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex space-x-6">
                        <a href="https://www.instagram.com/spilledpalettestudio" target="_blank" rel="noopener noreferrer" className="text-[#B0B0B0] hover:text-[#D4A574] text-sm focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:outline-none rounded-sm px-1 -mx-1 transition-colors">Instagram</a>
                        <a href="mailto:hello@spilledpalettestudio.com" className="text-[#B0B0B0] hover:text-[#D4A574] text-sm focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:outline-none rounded-sm px-1 -mx-1 transition-colors">Email</a>
                    </div>
                    <p className="text-[#808080] text-sm">© 2026 Spilled Palette Studio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
