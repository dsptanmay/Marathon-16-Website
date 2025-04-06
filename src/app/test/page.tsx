import React from 'react'
import { db } from '@/db'
import { masterTable } from '@/db/schema'

async function page() {
    const data = await db.select().from(masterTable)
    console.log(data)
    return (
        <div>

        </div>
    )
}

export default page
