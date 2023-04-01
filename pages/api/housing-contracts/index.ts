import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

import { default as PDFDocument } from "pdfkit";
const writtenNumber = require('written-number')

writtenNumber.defaults.lang = 'fr'

const PAGE_1 = 'PAGE_1'
const PAGE_2 = 'PAGE_2'
const PAGE_3 = 'PAGE_3'
const PAGE_4 = 'PAGE_4'

const HOUSES = {
    EP: 'EugenePottier',
    JJ: 'JeanJacques'
} as const;

const getHouse = (req: NextApiRequest) => {
    const { house } = req.body
    if (!house) {
        throw new Error('Missing house')
    }
    return HOUSES[house as keyof typeof HOUSES]
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Check if the request method is GET
    if (req.method === 'POST') {
        try {
            const house = getHouse(req)

            const page2Key = 'Contrat 2.jpeg'
            const page3Key = 'Contrat 3.jpeg'
            const page4Key = 'Contrat 4.jpeg'
            const page1Key = `${house}/Contrat 1.jpeg`

            const img1Buffer = fs.readFileSync(path.join(process.cwd(), `public/pdfs/${page1Key}`))
            const image1 = {
                Body: img1Buffer,
                pageName: PAGE_1,
                width: 3408,
                height: 2333
            }

            const img2Buffer = fs.readFileSync(path.join(process.cwd(), `public/pdfs/${page2Key}`))
            const image2 = {
                Body: img2Buffer,
                pageName: PAGE_2,
                width: 3419,
                height: 2411
            }

            const img3Buffer = fs.readFileSync(path.join(process.cwd(), `public/pdfs/${page3Key}`))
            const image3 = {
                Body: img3Buffer,
                pageName: PAGE_3,
                width: 2940,
                height: 2346
            }


            const img4Buffer = fs.readFileSync(path.join(process.cwd(), `public/pdfs/${page4Key}`))
            const image4 = {
                Body: img4Buffer,
                pageName: PAGE_4,
                width: 3083,
                height: 2333
            }

            const pdfBuffer = await Promise.all([image1, image2, image3, image4])
                .then(values => {
                    return createPdf(values, req.body)
                }).catch(err => console.error(err))

            // Set the response headers
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=yourfile.pdf');
            res.setHeader('Content-Length', (pdfBuffer as Buffer).length);

            // Send the PDF data as the response
            res.send(pdfBuffer);
        } catch (error) {
            // Handle any errors
            console.error('Error reading PDF file:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        // If the request method is not GET, return a 405 Method Not Allowed error
        res.status(405).send('Method Not Allowed');
    }
};

function computeTotalPrice({ monthlyRent, charges }: { monthlyRent: number, charges: number }) {
    return charges && charges > 0 ?
        monthlyRent + charges :
        monthlyRent
}

function completePage1(document: PDFKit.PDFDocument, info: any) {
    for (let i = 0; i < info.people.length; i++) {
        const person = info.people[i]
        const title = person.isMale ? 'M' : 'MME'
        const fullname = `${person.lastname} ${person.firstname}`
        document.text(`${title} ${fullname}`, 150 + (600 * i), 950)

        if (!!person.birthday) {
            const bornText = person.isMale ? 'né le' : 'née le'
            document.text(`${bornText} ${person.birthday}`, 150 + (600 * i), 1010)
        }

        if (!!person.birthPlace) {
            document.text(`à ${person.birthPlace}`, 150 + (600 * i), 1070)
        }

    }

    const monthlyRentWords = writtenNumber(info.monthlyRent)
    document.text(`${monthlyRentWords} euros`, 440, 1705)
    document.text(`${info.monthlyRent} €`, 1850, 1705)

    if (info.charges && info.charges > 0) {
        const chargesWords = writtenNumber(info.charges)
        document.text(`${chargesWords} euros`, 440, 1855)
        document.text(`${info.charges} €`, 1850, 1855)
    }

    const totalPrice = computeTotalPrice(info)
    const totalPriceWords = writtenNumber(totalPrice)
    document.text(`${totalPriceWords} euros`, 440, 1903)
    document.text(`${totalPrice} €`, 1850, 1903)

    document.text(info.revisionDate, 654, 2250, { height: 50, width: 200 })
}

function completePage2(document: PDFKit.PDFDocument, info: any) {
    document.text(info.beginningDate, 530, 600)

    document.text(info.endingDate, 370, 650)

    const totalPrice = computeTotalPrice(info)
    const totalPriceWords = writtenNumber(totalPrice)
    document.text(`${totalPriceWords} euros`, 226, 833)
    document.text(`${totalPrice} €`, 1650, 833)

    document.text(info.keysAmount, 1180, 1165)
}

async function createPdf(images: { Body: Buffer, width: number, height: number, pageName: string }[], info: any) {
    return await new Promise(resolve => {
        let doc = new PDFDocument({
            autoFirstPage: false,
            margin: 0,
        })
        doc.fontSize(48)
        doc.font('Helvetica')

        images.forEach(({ Body, width, height, pageName }) => {
            doc.addPage({
                layout: 'portrait',
                size: [width, height]
            })
            doc.image(Body, 0, 0, { width: width, height })
            if (pageName === PAGE_1) {
                completePage1(doc, info)
            } else if (pageName === PAGE_2) {
                completePage2(doc, info)
            }
        })

        doc.end()

        const buffers: any = []
        doc.on("data", buffers.push.bind(buffers))
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers)
            resolve(pdfData)
        })
    })
}

export default handler;