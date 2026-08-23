import { PrismaClient, Role, PostType, AttendanceStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
const db = new PrismaClient();
async function main(){
 const passwordHash = await bcrypt.hash('demo12345',12);
 const admin=await db.user.upsert({where:{email:'admin@narayon.local'},update:{},create:{email:'admin@narayon.local',passwordHash,name:'Администратор',birthDate:new Date('1985-01-01'),place:'Гальнево',role:Role.ADMIN,verified:true,bio:'Официальный администратор района'}});
 const user=await db.user.upsert({where:{email:'demo@narayon.local'},update:{},create:{email:'demo@narayon.local',passwordHash,name:'Макс',birthDate:new Date('1991-04-12'),place:'Гальнево',profession:'Предприниматель',interests:JSON.stringify(['авто','рыбалка','гриль']),skills:JSON.stringify(['организация','ремонт']),verified:true}});
 await db.post.create({data:{title:'Нужен электрик на завтра',body:'Нужно установить несколько розеток. Оплата по договорённости.',category:'Ремонт',type:PostType.HELP,authorId:user.id,expiresAt:new Date(Date.now()+86400000)}});
 const event=await db.event.create({data:{title:'Футбол на поле',description:'Играем 5×5, присоединяйтесь.',startsAt:new Date(Date.now()+2*86400000),endsAt:new Date(Date.now()+2*86400000+2*3600000),lat:56.3,lng:38.15,placeName:'Спортивная площадка',organizerId:user.id}});
 await db.attendance.create({data:{userId:user.id,eventId:event.id,status:AttendanceStatus.GOING}});
 await db.notification.create({data:{userId:user.id,type:'WELCOME',title:'Добро пожаловать',body:'Это демо-окружение «На Районе».'}});
 console.log({admin:'admin@narayon.local / demo12345',user:'demo@narayon.local / demo12345',event:event.id});
}
main().finally(()=>db.$disconnect());
