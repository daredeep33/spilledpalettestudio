export default function Footer() {
    return (
        <footer className="bg-[#2C2C2C] text-[#FDFBF7] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Social & Copyright */}
                <div className="pt-6 border-t border-[#FDFBF7]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex space-x-6">
                        <a href="https://www.instagram.com/spilledpalettestudio" target="_blank" rel="noopener noreferrer" className="text-[#B0B0B0] hover:text-[#E8C9A0] text-sm">Instagram</a>
                        <a href="mailto:hello@spilledpalettestudio.com" className="text-[#B0B0B0] hover:text-[#E8C9A0] text-sm">Email</a>
                    </div>
                    <p className="text-[#808080] text-sm">© 2026 Spilled Palette Studio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
