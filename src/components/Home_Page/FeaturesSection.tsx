"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Lightbulb } from "lucide-react";

export default function FeaturesSection() {

    const features = [
        {
            icon: BookOpen,
            title: "Online Learn Courses Management",
            description: "Analyzing negative materials about your brand and addressing them with sentiment analysis and press.",
            color: "#4783F3",
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100",
        },
        {
            icon: GraduationCap,
            title: "Learn from the masters of the field online",
            description: "Analyzing negative materials about your brand and addressing them with sentiment analysis and press.",
            color: "#F9A134",
            gradient: "from-orange-400 to-orange-500",
            bgGradient: "from-orange-50 to-orange-100",
        },
        {
            icon: Lightbulb,
            title: "An Introduction-Skills For Learners",
            description: "Analyzing negative materials about your brand and addressing them with sentiment analysis and press.",
            color: "#8B5CF6",
            gradient: "from-purple-500 to-purple-600",
            bgGradient: "from-purple-50 to-purple-100",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            }
        }
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
            <div className="relative z-10 px-8 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
                <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}>
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                className="relative group"
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}>

                                <div className={`relative p-2 transition-all duration-500 overflow-hidden h-full`}>
                                    <motion.div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1, opacity: 0.1 }}
                                    />
                                    <div className="relative z-10 flex flex-col items-center gap-4 md:items-start sm:flex-row sm:gap-5">
                                        {/* Icon Container */}
                                        <motion.div
                                            className="relative flex-shrink-0"
                                            initial="initial"
                                            whileHover="hover">
                                            <motion.div className={`relative w-16 h-16 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                                                style={{
                                                    borderWidth: '3px',
                                                    borderColor: feature.color,
                                                    borderStyle: 'solid'
                                                }}
                                                whileHover={{
                                                    borderColor: '#ffffff',
                                                    transition: { duration: 0.3 }
                                                }}>
                                                <motion.div className="relative z-10"
                                                    animate={{
                                                        y: [0, -5, 0],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}>
                                                    <IconComponent className="w-8 h-8 text-white md:w-8 md:h-8" strokeWidth={2.5} />
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <motion.h3 className="text-lg sm:text-lg md:text-xl font-bold text-[#2F2F32] mb-2 sm:mb-3 leading-tight text-center md:text-left"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}>
                                                {feature.title}
                                            </motion.h3>

                                            <motion.p className="md:text-sm text-[#7D7E7F] leading-relaxed text-center md:text-left"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}>
                                                {feature.description}
                                            </motion.p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}