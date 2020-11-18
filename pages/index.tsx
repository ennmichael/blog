import React from "react"
import Link from "next/link"
import { Blog, loadBlogs } from "blogging"
import { GetStaticPropsResult } from "next"
import BlogList from "@components/BlogList"

export interface HomeProps {
    blogs: Blog[]
}

export default function Home({ blogs }: HomeProps) {
    return (
        <div>
            <BlogList blogs={blogs} />
        </div>
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
    return {
        props: {
            blogs: await loadBlogs(),
        },
    }
}
