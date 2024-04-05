"use server";

import { prisma } from "@/lib/db"; 
import getUser from "@/lib/user"; 
import { User,DefaultValues } from "@prisma/client"; 

export async function saveDefaultValues(
    values: DefaultValues
){
    const user = await getUser(); 
    console.log(user); 
    const {
        FROM_lbl,
        INVOICE_lbl,
        BILL_TO_lbl,
        SHIPPED_TO_lbl,
        PAYMENT_TERMS_lbl,
        DATE_PREPARED_lbl,
        DUE_DATE_lbl,
        TABLE_ITEM_lbl,
        TABLE_QTY_lbl,
        TABLE_RATE_lbl,
        TABLE_AMOUNT_lbl,
        PO_lbl,
        NOTE_lbl,
        TERMS_lbl,
        LINK_lbl,
        QR_lbl,
        SUB_TOTAL_lbl,
        DISCOUNT_lbl,
        SHIPPING_lbl,
        TAX_RATE_lbl,
        TOTAL_lbl,
        AMOUNT_PAID_lbl,
        BALANCE_DUE_lbl,
        SIGNATURE_lbl,
    } = values; 

    const updatedData= {
        FROM_lbl,
        INVOICE_lbl,
        BILL_TO_lbl,
        SHIPPED_TO_lbl,
        PAYMENT_TERMS_lbl,
        DATE_PREPARED_lbl,
        DUE_DATE_lbl,
        TABLE_ITEM_lbl,
        TABLE_QTY_lbl,
        TABLE_RATE_lbl,
        TABLE_AMOUNT_lbl,
        PO_lbl,
        NOTE_lbl,
        TERMS_lbl,
        LINK_lbl,
        QR_lbl,
        SUB_TOTAL_lbl,
        DISCOUNT_lbl,
        SHIPPING_lbl,
        TAX_RATE_lbl,
        TOTAL_lbl,
        AMOUNT_PAID_lbl,
        BALANCE_DUE_lbl,
        SIGNATURE_lbl,
    }

    const updatedValues = await prisma.defaultValues.update({
        where: {
            id : user.DefaultValues[0].id 
        },
        data:updatedData, 
    }); 
    return updatedData; 
}












