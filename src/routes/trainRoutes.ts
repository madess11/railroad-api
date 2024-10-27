import { Router } from 'express'
import { getTrains, createTrain, updateTrain, deleteTrain, getTrain } from '../controllers/trainController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { roleMiddleware } from '../middlewares/roleMiddleware'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Trains
 *   description: Gestion des trains
 */

/**
 * @swagger
 * /trains:
 *   get:
 *     summary: Récupérer tous les trains
 *     tags: [Trains]
 *     parameters:
 *       - in: query
 *         name: start_station
 *         required: false
 *         schema:
 *           type: string
 *           example: '649f5f5005b01c1e1d3c9f64'
 *         description: ID de la gare de départ
 *       - in: query
 *         name: end_station
 *         required: false
 *         schema:
 *           type: string
 *           example: '649f5f5005b01c1e1d3c9f50'
 *         description: ID de la gare d'arrivée
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 5
 *         description: Nombre de trains à retourner
 *       - in: query
 *         name: sort_by
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name, time_of_departure]
 *           example: time_of_departure
 *         description: Champ par lequel trier les résultats
 *       - in: query
 *         name: sort_order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: asc
 *         description: Ordre de tri des résultats
 *     responses:
 *       200:
 *         description: Liste des trains récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: ObjectId
 *                   name:
 *                     type: string
 *                   start_station:
 *                     type: string
 *                     format: ObjectId
 *                   end_station:
 *                     type: string
 *                     format: ObjectId
 *                   time_of_departure:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', getTrains)

/**
 * @swagger
 * /trains/{id}:
 *   get:
 *     summary: Récupérer un train par ID
 *     tags: [Trains]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du train
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train récupéré avec succès
 *       404:
 *         description: Train non trouvé
 */
router.get('/:id', getTrain)

/**
 * @swagger
 * /trains:
 *   post:
 *     summary: Créer un nouveau train (Admin seulement)
 *     tags: [Trains]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               departure_time:
 *                 type: string
 *               arrival_time:
 *                 type: string
 *               train_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: Train créé avec succès
 *       400:
 *         description: Erreur de validation des données
 */
router.post('/', [authMiddleware, roleMiddleware('admin')], createTrain)

/**
 * @swagger
 * /trains/{id}:
 *   put:
 *     summary: Mettre à jour un train par ID (Admin seulement)
 *     tags: [Trains]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du train
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               departure_time:
 *                 type: string
 *               arrival_time:
 *                 type: string
 *               train_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Train mis à jour avec succès
 *       404:
 *         description: Train non trouvé
 */
router.put('/:id', [authMiddleware, roleMiddleware('admin')], updateTrain)

/**
 * @swagger
 * /trains/{id}:
 *   delete:
 *     summary: Supprimer un train par ID (Admin seulement)
 *     tags: [Trains]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du train
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Train supprimé avec succès
 *       404:
 *         description: Train non trouvé
 */
router.delete('/:id', [authMiddleware, roleMiddleware('admin')], deleteTrain)

export default router
