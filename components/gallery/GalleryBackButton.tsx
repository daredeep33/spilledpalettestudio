'use client'

import { useRouter } from 'next/navigation'

export default function GalleryBackButton() {
    const router = useRouter()

    return (
        <button
            onClick={() => {
                if (window.history.length > 2) {
                    router.back()
                } else {
                    router.push('/gallery')
                }
            }}
            className="text-sm text-[#D4A574] hover:text-[#2C2C2C] hover:underline mb-8 inline-block transition-colors font-medium flex items-center gap-2"
        >
            <span>←</span> Back
        </button>
    )
}
