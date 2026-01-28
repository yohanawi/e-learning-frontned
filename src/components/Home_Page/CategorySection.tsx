"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type MainCourse = {
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail: string | null;
    sub_courses_count: number;
};

interface CategorySectionProps {
    mainCourses: MainCourse[];
}

export default function CategorySection({ mainCourses }: CategorySectionProps) {

    const coursesToShow = mainCourses || [];

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

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 80,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring" as "spring",
                stiffness: 80,
                damping: 15,
                duration: 0.8,
            }
        }
    };

    return (

        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="relative z-10 px-8 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
                <motion.div className="mb-8 md:mb-10"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}>
                    <motion.div className="flex items-center gap-2 mb-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}>
                        <h2 className="md:text-sm font-semibold text-[#4783F3]">
                            Categories
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#2F2F32]">
                            Trending Collection
                        </h3>
                    </motion.div>
                </motion.div>

                {/* Category Cards Grid */}
                <motion.div className="grid grid-cols-1 gap-6 lg:grid-cols-2 sm:gap-8 lg:gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}>
                    {coursesToShow.map((course, index) => (
                        <motion.div
                            key={course.id}
                            variants={cardVariants}
                            className="relative overflow-hidden transition-all duration-500 shadow-xl group rounded-2xl sm:rounded-3xl hover:shadow-2xl"
                            whileHover={{
                                scale: 1.03,
                            }}
                            style={{ perspective: 1000 }}>

                            <Link href={`/courses/${course.slug}`} className="block">
                                <motion.div className="relative h-64 sm:h-80 md:h-96 lg:h-[420px] overflow-hidden"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6 }}>
                                    <Image
                                        src={course.thumbnail || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"}
                                        alt={course.title}
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 pointer-events-none h-2/3 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                                        <div className="relative inline-block">
                                            <motion.h3 className="mb-2 text-xl font-bold text-center text-white lg:text-2xl"
                                                initial={{ y: 30, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    delay: index * 0.2 + 0.3,
                                                    duration: 0.6
                                                }}>
                                                {course.title}
                                            </motion.h3>
                                            <p className="text-center text-white/80 text-sm">
                                                {course.sub_courses_count} courses
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}