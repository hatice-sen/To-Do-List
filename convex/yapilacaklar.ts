import {mutation, query} from "./_generated/server";
import {ConvexError, v} from "convex/values";
//Her şeyi okuma işlemi
export const getYapilacaklar = query({
    handler : async(ctx) => {
        const yapilacaklar = await ctx.db.query("yapilacaklar")
            .order("desc").collect();
        return yapilacaklar;
    }
})
// Ekleme İşlemi
export const yapilacakEkle = mutation({
    args : {text : v.string()},
    handler : async(ctx,args) => {
        const yapilacakId = await ctx.db.insert("yapilacaklar",{
            text: args.text,
            isCompleted: false,
        });
        return yapilacakId;
    },
});
// Tamamlanma Durumu
export const toggleYapilacak = mutation({
    args : {id : v.id("yapilacaklar")},
    handler : async(ctx,args) => {
        const yapilacak = await ctx.db.get(args.id);
        if(!yapilacak) throw new ConvexError("Yapılacak bulunamadı!");
        await ctx.db.patch(args.id,{
            isCompleted: !yapilacak.isCompleted
        });
    },
});
//Silme işlemi
export const yapilacakSil = mutation({
    args : {id : v.id("yapilacaklar")},
    handler : async(ctx,args) => {
        await ctx.db.delete(args.id);
    },
});
//Güncelleme
export const yapilacakUpdate = mutation({
    args : {
        id : v.id("yapilacaklar"),
        text: v.string(),
    },
    handler : async(ctx,args) => {
        await ctx.db.patch(args.id,{text: args.text});
    },
});
export const yapilacakTemizle = mutation({
    handler : async(ctx) => {
        const yapilacaklar = await ctx.db.query("yapilacaklar").collect();
        for (const yapilacak of yapilacaklar) {
            await ctx.db.delete(yapilacak._id);
        }
        return {deleteCount : yapilacaklar.length};
    },
});
