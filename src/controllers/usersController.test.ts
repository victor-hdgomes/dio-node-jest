import { Request } from "express";
import { UsersController } from "./usersController"
import { makeMockResponse } from "../mocks/mockResponse";

describe('Users Controller', () => {
    const usersController = new UsersController();

    const mockRequest = {} as Request
    const mockResponse = makeMockResponse()
    it('Deve listar todos os usuarios', () => {
        usersController.listarUsuarios(mockRequest, mockResponse)
        
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toHaveLength(2)
    })

    it('Deve criar um novo usuario', () => {
        mockRequest.body = {
            name: 'Novo usuario'
        }

        usersController.criarUsuario(mockRequest, mockResponse)
        
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ mensagem: `Usuario Novo usuario criado` })
    })

    it('Não deve criar um novo usuario se o nome estiver em branco', () => {
        mockRequest.body = {
            name: ''
        }

        usersController.criarUsuario(mockRequest, mockResponse)
        
        expect(mockResponse.state.status).toBe(403)
        expect(mockResponse.state.json).toMatchObject({ mensagem: 'Não é possivel criar usuario sem nome' })
    })
})