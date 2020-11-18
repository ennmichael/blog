import * as fs from "fs"

export default function MyApp({ Component, pageProps }: any) {
    return (
        <div>
            <Component {...pageProps} />
        </div>
    )
}
