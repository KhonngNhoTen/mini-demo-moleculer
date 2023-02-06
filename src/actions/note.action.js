const { ErrorBuilder, TypeErrors } = require("../libs/Errors");
const models = require("../models");
const { Note } = models;

const NoteAction = {};
/**
 * @param {import ("moleculer").Service} service
 * @param {import("moleculer").Context} ctx
 */
NoteAction.create = async (service, ctx) => {
  const note = await Note.create(ctx.params);
  return note;
};

/**
 * @param {import ("moleculer").Service} service
 * @param {import("moleculer").Context} ctx
 */
NoteAction.update = async (service, ctx) => {
  const note = await Note.findByPk(ctx.params.idNote);
  await note.update(ctx.params);
  return note;
};

/**
 * @param {import ("moleculer").Service} service
 * @param {import("moleculer").Context} ctx
 */
NoteAction.remove = async (service, ctx) => {
  const note = await Note.destroy({ where: { id: ctx.params.idNote } });
  return { msg: "ok" };
};

/**
 * @param {import ("moleculer").Service} service
 * @param {import("moleculer").Context} ctx
 */
NoteAction.list = async (service, ctx) => {
  console.log("meta.user", ctx.meta.user);
  const notes = await Note.findAll();
  return notes;
};

/**
 * @param {import ("moleculer").Service} service
 * @param {import("moleculer").Context} ctx
 */
NoteAction.detail = async (service, ctx) => {
  const note = await Note.findByPk(ctx.params.idNote);
  return note;
};

module.exports = NoteAction;
