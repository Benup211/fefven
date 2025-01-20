import {prisma} from "../model";

type Events = {
    title: string
    description: string
    category: string
    tags: string
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    venueName: string
    venueAddress: string
    city: string
    organizerName: string
    organizerContact:string
    organizerWebsite?: string
  }

export class EventsRepository{

    static async allEvents(){
        try{
            return await prisma.events.findMany();
        }catch (e){
            throw new Error("Error while fetching Events items from database");
        }
    }

    static async getEvents(id: number){
        try{
            return await prisma.events.findUnique({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while fetching Events item from database");
        }
    }

    static async createEvents(events: Events){
        try{
            return await prisma.events.create({
                data: {
                    title: events.title,
                    description: events.description,
                    category: events.category,
                    tags: events.tags,
                    startDate: events.startDate,
                    startTime: events.startTime,
                    endDate: events.endDate,
                    endTime: events.endTime,
                    venueName: events.venueName,
                    venueAddress: events.venueAddress,
                    city: events.city,
                    organizerName: events.organizerName,
                    organizerContact: events.organizerContact,
                    organizerWebsite: events?.organizerWebsite
                }
            });
        }catch (e){
            throw new Error("Error while creating Events item in database");
        }
    }

    static async deleteEvents(id: number){
        try{
            return await prisma.events.delete({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while deleting Events item from database");
        }
    }

    static async lengthOfEvents(){
        try{
            return await prisma.events.count();
        }catch (e){
            throw new Error("Error while fetching length of Events items from database");
        }
    }

}