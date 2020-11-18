import * as blogging from "blogging"
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next"
import { ParsedUrlQuery } from "querystring"

export interface BlogParams extends ParsedUrlQuery {
    slug: string
}

export interface BlogProps {
    blog: blogging.Blog
}

export default function Blog({ blog }: BlogProps) {
    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    )
}

export async function getStaticProps({
    params,
}: GetStaticPropsContext<BlogParams>): Promise<GetStaticPropsResult<BlogProps>> {
    return {
        props: {
            blog: await blogging.loadBlog(params.slug),
        },
    }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<BlogParams>> {
    return {
        paths: (await blogging.loadBlogs()).map((blog) => ({
            params: { slug: blog.slug },
        })),
        fallback: false,
    }
}
