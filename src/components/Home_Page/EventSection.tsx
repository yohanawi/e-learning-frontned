import Image from "next/image";

const leftCards = [
    { id: 1, type: "Event", title: "Upcoming Webinar", desc: "Join our live session on React." },
    { id: 2, type: "News", title: "New Course Released", desc: "Advanced TypeScript now available." },
    { id: 3, type: "Update", title: "Platform Update", desc: "UI improvements and bug fixes." },
    { id: 4, type: "Event", title: "Workshop", desc: "Hands-on Next.js workshop." },
    { id: 5, type: "Announcement", title: "Scholarships Open", desc: "Apply for 2026 scholarships." },
];

const videos = [
    { id: 1, src: "/assets/videos/sample1.mp4", title: "Main Event Video" },
    { id: 2, src: "/assets/videos/sample2.mp4", title: "Highlight 1" },
    { id: 3, src: "/assets/videos/sample3.mp4", title: "Highlight 2" },
];

export default function EventSection() {
    return (
        <section className="w-full py-10 bg-gray-500 lg:py-20">
            <div className="grid max-w-6xl grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-2">
                {/* Left Side */}
                <div className="flex flex-col h-full">
                    <span className="mb-1 text-sm font-semibold text-blue-500">Events & News</span>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Stay Updated</h2>
                    <div className="flex-1 pr-2 overflow-y-auto scrollbar-hide" style={{ maxHeight: 420 }}>
                        <div className="flex flex-col gap-4">
                            {leftCards.map(card => (
                                <div key={card.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm min-h-[80px] flex flex-col gap-1">
                                    <span className="text-xs font-medium text-blue-400">{card.type}</span>
                                    <span className="font-semibold text-gray-800">{card.title}</span>
                                    <span className="text-sm text-gray-500">{card.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col h-full">
                    <span className="mb-1 text-sm font-semibold text-blue-500">Featured Videos</span>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Watch & Learn</h2>
                    <div className="flex flex-col flex-1 gap-4">
                        {/* Main big video */}
                        <div className="w-full h-[15rem] mb-2 overflow-hidden shadow-lg aspect-video rounded-xl">
                            <video src={videos[0].src} controls className="object-cover w-full h-full" poster="/assets/images/banners/video-poster.jpg" />
                        </div>
                        {/* Two small videos below */}
                        <div className="flex gap-4">
                            {videos.slice(1).map(video => (
                                <div key={video.id} className="flex-1 overflow-hidden shadow-md aspect-video rounded-xl">
                                    <video src={video.src} controls className="object-cover w-full h-full" poster="/assets/images/banners/video-poster.jpg" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}