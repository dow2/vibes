import { Router } from 'express';
import prisma from '../database/db';

const notificationsRouter = Router();

notificationsRouter.get('/', async (req, res) => {
  const {userId} = req.query;
  await prisma.notifications.findMany({
    where: {
      userId,
    },
    orderBy: {
      created_at: 'desc',
    }
  })
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });

});

notificationsRouter.post('/', async (req, res) => {
  const {commentId, ownerId} = req.body;
  await prisma.notifications.create({
    data: {
      userId: ownerId,
      commentId, 
      type: 'comment',
    }
  }).then((data) => {
    // console.log(data);
    res.status(200).send(data);
  }).catch(() => res.sendStatus(500));
});

notificationsRouter.put('/', async (req, res) => {
  const {userId} = req.body;

  console.log(userId);
  await prisma.notifications.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
    }
  })
    .then((data) => {
      console.log(data);
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    })
})

notificationsRouter.delete('/', async (req, res) => {
  const {userId} = req.body;

  await prisma.notifications.deleteMany({
    where: {
      userId,
    }
  })
    .then((data) => {
      console.log(data);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
})

export default notificationsRouter;
