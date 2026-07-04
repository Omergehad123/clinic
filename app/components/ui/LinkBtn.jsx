import Link from "next/link"
import React from "react"

function LinkBtn({ link, text, bgColor, textColor = "text-color" }) {
    return (
        <button className={`bg-(--${bgColor}) text-(--${textColor}) border border-(--second-color) hover:bg-(--second-color) transition-all duration-300 rounded-full px-5 cursor-pointer`}>
            <Link className="tracking-[0.5]" href={link}>{text}</Link>
        </button>
    )
}

export default LinkBtn