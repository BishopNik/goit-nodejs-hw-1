/** @format */

const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	const data = await listContacts();
	const contactById = data.find(i => i.id === contactId);
	return contactById || null; // (if error find -> null)
}

async function removeContact(contactId) {
	const data = await listContacts();
	const idx = data.findIndex(i => i.id === contactId);
	if (idx === -1) {
		return null; // (if error remove -> null)
	}
	const [dataAfterDel] = data.splice(idx, 1);
	await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
	return dataAfterDel;
}

async function addContact(name, email, phone) {
	const data = await listContacts();
	const newContact = { id: nanoid(), name, email, phone };
	data.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
	return newContact || null; // (if error add -> null)
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
