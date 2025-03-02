import Joi from 'joi';
export const putSongSchema = Joi.object({
    title: Joi.string(),
    genre: Joi.string(),
    artist: Joi.string(),
    released_year: Joi.number().integer().max(new Date().getFullYear()),
    ratings: Joi.object({
      rym: Joi.number(),
      ranked: Joi.number().integer(),
    })
});

export const postSongSchema = Joi.object({
    title: Joi.string().required(),
    genre: Joi.string().required(),
    artist: Joi.string().required(),
    released_year: Joi.number().integer().max(new Date().getFullYear()).required(),
    ratings: Joi.object({
      rym: Joi.number().required(),
      ranked: Joi.number().integer().required(),
    }).required()
});