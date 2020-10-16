import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; // o type orm utiliza um pattern chamado repository,
// que significa que basicamente toda a ação que você quiser fazer no seu banco de dados passa por um repositório
// o repositório é quem detém a regra de como um dado pode ser criado, como pode ser deletado ou algo assim.
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';


export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanageView.render(orphanage));
    },

    async create(request: Request, response: Response) {
        console.log(request.files);

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[]; //hackzin para upload de multiplos arquivos

        const images = requestImages.map(image => {
            return { path: image.filename }
        })
        
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                }))
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage); // await vai aguardar essa linha executar para então partir para a próxima
        // porém sempre que você quer utilizar o await, você precisa transformar essa função em uma assincrona
    
        return response.status(201).json(orphanage); //  não trabalho mais com texto diretamente, sempre com objetos ou arrays.
        // 201 é usado para quando você cria algo. é um código http que significa que a criação deu certo.
    }
};