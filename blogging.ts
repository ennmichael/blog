import glob from "fast-glob"
import { readJSON, readFile } from "fs-extra"
import * as path from "path"
import _ from "lodash"

export interface Blog {
    title: string
    date: string
    slug: string
    content: string
}

export async function loadBlogs(): Promise<Blog[]> {
    const blogFiles = await getBlogFiles()
    const blogs = await Promise.all(
        blogFiles.map(async ({ contentFilePath, metaFilePath }) => {
            const metadata = await readJSON(metaFilePath)
            const content = await readFile(contentFilePath, {
                encoding: "utf-8",
            })

            return {
                title: metadata.title,
                date: metadata.date,
                slug: metadata.slug,
                content,
            }
        })
    )

    return sortBlogs(blogs)
}

export async function loadBlog(slug: string): Promise<Blog> {
    return _.find(await loadBlogs(), (blog) => blog.slug === slug)
}

interface BlogFiles {
    contentFilePath: string
    metaFilePath: string
}

async function getBlogFiles(): Promise<BlogFiles[]> {
    const contentFiles = await glob(path.join("blogs", "*.md"))
    return contentFiles.map((contentFilePath) => ({
        contentFilePath,
        metaFilePath: contentFilePath + ".json",
    }))
}

function sortBlogs(blogs: Blog[]): Blog[] {
    return _.sortBy(blogs, (blog) => blog.date).reverse()
}
