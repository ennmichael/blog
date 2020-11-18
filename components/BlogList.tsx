import { Blog } from "blogging"
import Link from "next/link"

export interface BlogListProps {
    blogs: Blog[]
}

export default function BlogList({ blogs }: BlogListProps) {
    return (
        <div>
            {blogs.map((blog) => (
                <Link key={blog.slug} href={`/${encodeURIComponent(blog.slug)}`} passHref>
                    <a>
                        {blog.title} - {blog.date}
                    </a>
                </Link>
            ))}
        </div>
    )
}
