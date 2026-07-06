import React from 'react';

export default function ShareButtons({ title, url }) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Share this article:</span>
            <div className="flex gap-2">
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors" title="Share on X (Twitter)">
                    𝕏
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-700 transition-colors" title="Share on LinkedIn">
                    in
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors" title="Share on Facebook">
                    f
                </a>
                <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-green-50 hover:bg-green-100 flex items-center justify-center text-green-600 transition-colors" title="Share on WhatsApp">
                    💬
                </a>
            </div>
        </div>
    );
}
