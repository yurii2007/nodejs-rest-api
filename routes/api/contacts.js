const express = require("express");

const { contactsSchema, updateStatusSchema } = require("../../models/contact");
const validate  = require("../../middlewares/validate");
const isValidId  = require("../../middlewares/isValidId");
const controller = require("../../controllers/contacts");
const authentication = require("../../middlewares/authentication");

const router = express.Router();

router.get("/", authentication, controller.listContacts);

router.get("/:contactId", authentication, isValidId, controller.getContactById);

router.post("/", authentication, validate(contactsSchema), controller.addContact);

router.delete("/:contactId", authentication, isValidId, controller.removeContact);

router.put("/:contactId", authentication , isValidId, validate(contactsSchema), controller.updateContact);

router.patch("/:contactId/favorite", authentication , isValidId, validate(updateStatusSchema) ,  controller.updateStatusContact)

module.exports = router;