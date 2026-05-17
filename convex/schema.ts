import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    //Burası tablo yaratılan yer
    yapilacaklar : defineTable({
        //tablonun sütun adları
        text : v.string(),
        isCompleted : v.boolean(),
    }),
});
