/**
 * API Client for LMS Backend
 * Handles all HTTP requests with Laravel Sanctum authentication
 */

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Base origin used for non-API assets like `/storage/...`
export const BACKEND_ORIGIN = API_URL.replace(/\/api\/?$/, "");

interface FetchOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {},
  ): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "An error occurred",
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // GET request
  async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", token });
  }

  // POST request
  async post<T>(endpoint: string, data: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      token,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      token,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", token });
  }
}

export const apiClient = new ApiClient(API_URL);

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface MainCourse {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  sub_courses_count: number;
}

export interface MainCourseDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  categories?: string[];
  sub_courses: SubCourse[];
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  author_id: number;
  published_date: string;
  status: "draft" | "published";
  views: number;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    name: string;
    email: string;
    profile_picture?: string;
  };
  comments?: BlogComment[];
  comments_count?: number;
}

export interface BlogComment {
  id: number;
  blog_id: number;
  user_id: number;
  comment: string;
  rating: number | null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile_picture?: string;
  };
}

export interface BlogsResponse {
  data: Blog[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface MainCourseDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  sub_courses: SubCourse[];
}

export interface SubCourse {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description?: string;
  price: number;
  level: "beginner" | "intermediate" | "advanced";
  duration_hours: number;
  thumbnail: string | null;
  is_active: boolean;
  main_course_id: number;
  main_categories?: Array<{
    id: number;
    slug: string;
    title: string;
  }>;
  popular_courses?: Array<{
    id: number;
    slug: string;
    title: string;
  }>;
  is_bought?: boolean;
  created_at?: string;
  updated_at?: string;
  lessons_count?: number;
  students_count?: number;
  average_rating?: number;
  is_enrolled?: boolean;
  main_course?: {
    id: number;
    title: string;
    slug: string;
  };
  enrollment?: {
    status: string;
    progress_percentage: number;
    enrolled_at: string;
  };
}

export interface Lesson {
  id: number;
  sub_course_id: number;
  title: string;
  description?: string;
  short_description?: string;
  order: number;
  duration_minutes?: number;
  video_provider: string;
  video_id: string;
  is_preview: boolean;
  is_active: boolean;
  is_completed: boolean;
  is_locked: boolean;
}

export interface LessonWithVideo extends Lesson {
  sub_course_id: number;
  embed_url: string;
  can_access: boolean;
  progress?: {
    watch_percentage: number;
    last_watched_second: number;
    is_completed: boolean;
  };
}

export interface Enrollment {
  id: number;
  status: "active" | "completed";
  progress_percentage: number;
  enrolled_at: string;
  completed_at: string | null;
  sub_course: SubCourse;
  main_course: {
    id: number;
    title: string;
    slug: string;
  };
  last_accessed_lesson: {
    id: number;
    title: string;
    slug: string;
  } | null;
  certificate: {
    certificate_code: string;
    issued_at: string;
    verification_url: string;
  } | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  bio: string | null;
}

// API Methods
export const api = {
  // Authentication
  auth: {
    register: (data: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) =>
      apiClient.post<ApiResponse<{ user: User; token: string }>>(
        "/register",
        data,
      ),

    login: (data: { email: string; password: string }) =>
      apiClient.post<ApiResponse<{ user: User; token: string }>>(
        "/login",
        data,
      ),

    logout: (token: string) =>
      apiClient.post<ApiResponse<null>>("/logout", {}, token),

    me: (token: string) => apiClient.get<ApiResponse<User>>("/user", token),
  },

  // Courses
  courses: {
    getMainCourses: () =>
      apiClient.get<ApiResponse<MainCourse[]>>("/main-courses"),

    searchMainCourses: (search: string) =>
      apiClient.get<ApiResponse<MainCourse[]>>(
        `/main-courses?search=${encodeURIComponent(search)}`,
      ),

    getAllMainCourses: () =>
      apiClient.get<ApiResponse<MainCourse[]>>("/main-courses"),

    getMainCourse: (slug: string) =>
      apiClient.get<ApiResponse<MainCourseDetail>>(`/main-courses/${slug}`),

    getSubCourse: (id: string | number, token?: string) =>
      apiClient.get<ApiResponse<SubCourse>>(`/sub-courses/${id}`, token),
  },

  // Lessons
  lessons: {
    getLessons: (subCourseId: string | number, token?: string) =>
      apiClient.get<ApiResponse<{ lessons: Lesson[] }>>(
        `/sub-courses/${subCourseId}/lessons`,
        token,
      ),

    getLesson: (lessonId: number, token: string) =>
      apiClient.get<ApiResponse<LessonWithVideo>>(
        `/lessons/${lessonId}`,
        token,
      ),

    updateProgress: (
      lessonId: number,
      data: {
        watched_seconds: number;
        percentage: number;
      },
      token: string,
    ) =>
      apiClient.post<ApiResponse<any>>(
        `/lessons/${lessonId}/progress`,
        data,
        token,
      ),

    markComplete: (lessonId: number, token: string) =>
      apiClient.post<ApiResponse<any>>(
        `/lessons/${lessonId}/complete`,
        {},
        token,
      ),
  },

  // Enrollments
  enrollments: {
    getMyCourses: (token: string, status?: string) => {
      const query = status ? `?status=${status}` : "";
      return apiClient.get<ApiResponse<Enrollment[]>>(
        `/enrollments${query}`,
        token,
      );
    },

    createEnrollment: (subCourseId: number, token: string) =>
      apiClient.post<ApiResponse<Enrollment>>(
        "/enrollments",
        { sub_course_id: subCourseId },
        token,
      ),
  },

  // Payments
  payments: {
    createPayment: (
      data: {
        sub_course_id: number;
        amount: number;
        currency: string;
      },
      token: string,
    ) => apiClient.post<ApiResponse<any>>("/payments/create", data, token),

    verifyPayment: (data: {
      order_id: string;
      payment_id: string;
      merchant_id: string;
      status_code: string;
      md5sig: string;
    }) => apiClient.post<ApiResponse<any>>("/payments/verify", data),
  },

  // Blogs
  blogs: {
    getAll: (params?: {
      search?: string;
      per_page?: number;
      page?: number;
    }) => {
      const query = new URLSearchParams();
      if (params?.search) query.append("search", params.search);
      if (params?.per_page)
        query.append("per_page", params.per_page.toString());
      if (params?.page) query.append("page", params.page.toString());
      const queryString = query.toString();
      return apiClient.get<BlogsResponse>(
        `/blogs${queryString ? `?${queryString}` : ""}`,
      );
    },

    getLatest: (limit: number = 5) =>
      apiClient.get<Blog[]>(`/blogs/latest?limit=${limit}`),

    getPopularLatest: (limit: number = 10) =>
      apiClient.get<Blog[]>(`/blogs/latest?limit=${limit}&popular=1`),

    getBySlug: (slug: string) => apiClient.get<Blog>(`/blogs/${slug}`),

    addComment: (
      slug: string,
      data: { comment: string; rating?: number },
      token: string,
    ) =>
      apiClient.post<{ message: string; comment: BlogComment }>(
        `/blogs/${slug}/comments`,
        data,
        token,
      ),

    getComments: (slug: string, token?: string) =>
      apiClient.get<BlogComment[]>(`/blogs/${slug}/comments`, token),
  },

  // Contact Form
  contact: {
    submit: (data: {
      name: string;
      email: string;
      phone: string;
      description: string;
      website?: string; // Honeypot field
    }) =>
      apiClient.post<{
        success: boolean;
        message: string;
        data?: {
          id: number;
          submitted_at: string;
        };
        errors?: Record<string, string[]>;
      }>("/contact", data),
  },

  // Newsletter
  newsletter: {
    subscribe: (email: string) =>
      apiClient.post<{ success: boolean; message: string }>(
        "/newsletter/subscribe",
        { email },
      ),
  },
};
