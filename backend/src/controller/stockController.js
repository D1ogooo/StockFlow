const fs = require('fs');
const path = require('path');
const Note = require('../model/NotesModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class StockContrller {
  async create(req, res) {
    try {
      const { titulo, link, conteudo } = req.body;

      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const secret = process.env.SECRET_KEY;

      if (!token) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      // await newNote.save();
      // res.status(201).json(newNote);
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const secret = process.env.SECRET_KEY;

      if (!token) {
        return res.status(401).json({ message: 'Não autorizado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const secret = process.env.SECRET_KEY;

      if (!token) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      // res.status(200).json({ message: 'Nota deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir nota:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const secret = process.env.SECRET_KEY;

      if (!token) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      // res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {

      // res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new StockContrller();