import React from 'react'

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '')

export const loadDocs = () => {
  const files = import.meta.glob('./docs/**/*.{js,jsx}')

  const sections = {}

  const SECTION_ORDER = ['General', 'GettingStarted', 'React', 'Data', 'Load']

  Object.entries(files).forEach(([path, importer]) => {
    const parts = path.split('/')

    const file = parts.pop()
    let folder = parts.pop()

    if (!file) {
      return
    }

    if (folder === 'docs') {
      folder = 'General'
    }

    const fileName = file.replace(/\.(js|jsx)$/, '')

    const sectionName = folder.charAt(0).toUpperCase() + folder.slice(1)

    const slug = `/docs/${sectionName.toLowerCase()}/${slugify(fileName)}`

    if (!sections[sectionName]) {
      sections[sectionName] = []
    }

    sections[sectionName].push({
      id: slug, // ✅ IMPORTANT FIX
      title: fileName.charAt(0).toUpperCase() + fileName.slice(1),

      slug, // ✅ ADD THIS FOR ROUTING

      component: React.lazy(() =>
        importer().then((mod) => ({
          default: mod.default || Object.values(mod)[0],
        })),
      ),

      searchText: fileName.toLowerCase(),
    })
  })

  const sorted = Object.keys(sections).sort((a, b) => {
    const iA = SECTION_ORDER.indexOf(a)
    const iB = SECTION_ORDER.indexOf(b)

    if (iA === -1) {
      return 1
    }
    if (iB === -1) {
      return -1
    }

    return iA - iB
  })

  return sorted.map((section) => ({
    title: section,
    items: sections[section],
  }))
}

// import React from "react"

// const slugify = (str) =>
//   str.toLowerCase().replace(/\s+/g, "")

// export const loadDocs = () => {
//   const files = import.meta.glob("./docs/**/*.{js,jsx}")

//   const sections = {}

//   Object.entries(files).forEach(([path, importer]) => {
//     const parts = path.split("/")

//     const file = parts.pop()
//     let folder = parts.pop()

//     if (!file) {return}
//     if (folder === "docs") {folder = "General"}

//     const fileName = file.replace(".jsx", "")

//     const sectionName =
//       folder.charAt(0).toUpperCase() + folder.slice(1)

//     const slug = `/docs/${sectionName.toLowerCase()}/${slugify(fileName)}`

//     if (!sections[sectionName]) {sections[sectionName] = []}

//     sections[sectionName].push({
//       id: slug,
//       title: fileName.charAt(0).toUpperCase() + fileName.slice(1),
//       slug,
//       component: React.lazy(() =>
//         importer().then((mod) => ({
//           default: mod.default || Object.values(mod)[0],
//         }))
//       ),
//     })
//   })

//   return Object.entries(sections).map(([title, items]) => ({
//     title,
//     items,
//   }))
// }
