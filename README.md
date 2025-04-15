# Project Management System (Mini Version)

Мини-версия системы управления проектами – это веб-приложение, позволяющее просматривать и редактировать задачи, проекты (доски) и создавать новые тикеты. Проект выполнен в рамках тестового задания и демонстрирует базовые возможности современной системы управления проектами.

---

## Описание

Проект представляет собой мини-версию системы управления проектами (Project Management System).

Функциональные возможности:

- **Просмотр всех задач:** Отображение списка всех созданных задач.
- **Фильтрация всех задач:** Возможность отфильтровать задачи по статусу, доске, исполнителю и поиску по названию на странице всех задач.
- **Просмотр досок:** Отображение всех досок (проектов).
- **Просмотр доски:** Детальный просмотр задач на доске с краткой информацией.
- **Детальный просмотр задачи:** Модальное окно с возможностью просмотра/редактирования детальной информации о задаче.
- **Создание задачи:** Возможность создания тикета с прикреплением к нужной доске.
- **Редактирование задачи:** Возможность редактирования детальной информации о задаче как на странице всех задач, так и на доске проекта.
- **Маршрутизация:** Возможность перехода между страницами при помощи header:
  - `/boards` – cтраница, на которой отображены все доски (проекты),
  - `/board/:id` – cтраница отдельного проекта с просмотром задач, разделённых по статусам,
  - `/issues` – страница всех задач всех проектов.

---

## Используемые технологии

- **Frontend:** React, TypeScript, react-router-dom, Graviti UI - библиотека
- **State Management:** Redux 
- **HTTP-запросы:** RTK Query
- **Сборка:** Vite 
- **Качество кода:** ESLint, Prettier, Husky
- **Контейнеризация:** Docker и Docker Compose
- Использование готового API (из папки `server`)

---

## Стэк
  ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=plastic)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=plastic)
  ![React Router](https://img.shields.io/badge/react--router--dom-CA4245?logo=react-router&logoColor=fff&style=plastic)
  ![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff&style=plastic)
  ![RTK Query](https://img.shields.io/badge/RTK_Query-764ABC?logo=redux&logoColor=fff&style=plastic)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?logo=vite&logoColor=FFD62E&style=plastic)
  ![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=fff&style=plastic)
  ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=000&style=plastic)
  ![Husky](https://img.shields.io/badge/Husky-000?logo=husky&logoColor=fff&style=plastic)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=plastic)
  ![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?logo=docker&logoColor=fff&style=plastic)

## Запуск через Docker Compose

1. Убедитесь, что Docker и Docker Compose установлены.
2. В корне проекта выполните:

 ```bash
docker-compose up --build

Frontend исполняется на порту :3000
Backend исполняется на порту :8080


