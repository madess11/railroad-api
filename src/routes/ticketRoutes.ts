import { Router } from 'express'
import { bookTicket, getTickets, validateUserTicket } from '../controllers/ticketController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { roleMiddleware } from '../middlewares/roleMiddleware'
import { employeeMiddleware } from '../middlewares/employeeMiddleware'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Gestion des billets de train
 */

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Réserver un billet
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID de l'utilisateur
 *               train:
 *                 type: string
 *                 description: ID du train
 *     responses:
 *       201:
 *         description: Billet réservé avec succès
 *       400:
 *         description: Erreur de validation des données
 */
router.post('/', authMiddleware, bookTicket)

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Récupérer les billets de l'utilisateur
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des billets de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   train:
 *                     type: string
 *                   valid:
 *                     type: boolean
 *                   booked_at:
 *                     type: string
 *                     format: date-time
 */
router.get('/', authMiddleware, getTickets)

/**
 * @swagger
 * /tickets/{id}/validate:
 *   put:
 *     summary: Valider un billet par ID (Employé seulement)
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du billet
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Billet validé avec succès
 *       404:
 *         description: Billet non trouvé
 */
router.put('/:id/validate', [authMiddleware, employeeMiddleware], validateUserTicket)

export default router
