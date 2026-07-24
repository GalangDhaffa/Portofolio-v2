"use client"
import { useEffect, useRef } from "react"

export default function WidgetRenderer({ htmlString }: { htmlString: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Bersihkan isi sebelumnya
    containerRef.current.innerHTML = ""

    // Buat elemen sementara untuk mem-parsing HTML
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = htmlString

    // Ambil semua tag script
    const scripts = Array.from(tempDiv.querySelectorAll("script"))
    
    // Masukkan elemen HTML selain script terlebih dahulu
    Array.from(tempDiv.childNodes).forEach(node => {
      if (node.nodeName.toLowerCase() !== "script") {
        containerRef.current?.appendChild(node.cloneNode(true))
      }
    })

    // Eksekusi script dengan menambahkannya kembali ke DOM
    scripts.forEach(script => {
      const newScript = document.createElement("script")
      Array.from(script.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value)
      })
      newScript.innerHTML = script.innerHTML
      containerRef.current?.appendChild(newScript)
    })
  }, [htmlString])

  return <div ref={containerRef} className="w-full flex justify-center my-12"></div>
}
