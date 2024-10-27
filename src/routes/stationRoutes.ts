import { Router } from 'express'
import { getStations, createStation, updateStation, deleteStation, getStationById } from '../controllers/stationController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { roleMiddleware } from '../middlewares/roleMiddleware'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: Gestion des stations de train
 */

/**
 * @swagger
 * /stations:
 *   get:
 *     summary: Récupérer toutes les stations
 *     tags: [Stations]
 *     responses:
 *       200:
 *         description: Liste de toutes les stations
 */
router.get('/', getStations)

/**
 * @swagger
 * /stations/{id}:
 *   get:
 *     summary: Récupérer une station par ID
 *     tags: [Stations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la station
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Station trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 open_hour:
 *                   type: string
 *                 close_hour:
 *                   type: string
 *                 image:
 *                   type: string
 *       404:
 *         description: Station non trouvée
 */
router.get('/:id', getStationById)

/**
 * @swagger
 * /stations:
 *   post:
 *     summary: Créer une nouvelle station (Admin seulement)
 *     tags: [Stations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de la station
 *               open_hour:
 *                 type: string
 *                 description: Heure d'ouverture au format HH:mm
 *               close_hour:
 *                 type: string
 *                 description: Heure de fermeture au format HH:mm
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Fichier image de la station
 *     responses:
 *       201:
 *         description: Station créée avec succès
 *       400:
 *         description: Erreur de validation des données
 */
router.post('/', [authMiddleware, roleMiddleware('admin')], createStation)

/**
 * @swagger
 * /stations/{id}:
 *   put:
 *     summary: Mettre à jour une station par ID (Admin seulement)
 *     tags: [Stations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la station
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
 *               open_hour:
 *                 type: string
 *               close_hour:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Station mise à jour avec succès
 *       404:
 *         description: Station non trouvée
 */
router.put('/:id', [authMiddleware, roleMiddleware('admin')], updateStation)

/**
 * @swagger
 * /stations/{id}:
 *   delete:
 *     summary: Supprimer une station par ID (Admin seulement)
 *     tags: [Stations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la station
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Station supprimée avec succès
 *       404:
 *         description: Station non trouvée
 */
router.delete('/:id', [authMiddleware, roleMiddleware('admin')], deleteStation)

export default router
