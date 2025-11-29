import React from "react";
import EventPricesTable from "./EventPricesTable";
import { useNavigate } from "react-router-dom";

import ArrowButton from "../ArrowButton";
import useEvent from "../../services/Event/EventContext";
import { useAuth } from "../../services/auth/AuthContext";
import { EVENT_INFORMATION_TEXTS } from "../payment/texts";

import {
  MapPinIcon,
  UserIcon,
  UserGroupIcon,
  Bars4Icon,
} from "@heroicons/react/24/solid";

export default function EventInfoCard({ setModal = { setModal } }) {
  const homeRoute = "/";
  const loginRoute = "/login";
  const { event } = useEvent();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBuyButtonClick = () => {
    if (!isAuthenticated) {
      navigate(loginRoute);
      return;
    }
    setModal("dates");
  };

  return (
    <div className="flex w-full lg:auto xl:w-1/2 justify-center items-center ">
      <div className="flex flex-col items-start md:p-3 p-5 xl:pr-5 xl:pl-5 xl:py-5 justify-start gap-4 w-[95vw] xl:w-[60vw] rounded-4xl md:rounded-3xl xl:rounded-none xl:rounded-r-4xl bg-white">
        <div className="flex flex-row justify-start items-center lg gap-2">
          <ArrowButton
            className="p-2"
            onClick={() => navigate(homeRoute)}
          ></ArrowButton>
          {/* Título */}
          <div className="inline-flex text-start flex-wrap flex-row">
            <h1 className="inline-block font-bold text-2xl xl:text-3xl">
              {event?.title}
            </h1>
          </div>
        </div>
        {/* Categorías */}
        <div className="flex flex-wrap gap-2 pl-5 xl:pl-15">
          {event?.categories?.map((category, index) => (
            <div
              key={index}
              className="flex rounded-4xl bg-purple-700 text-white items-center justify-center p-1 px-2.5 shadow-xl"
            >
              {category.category.description}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 pl-5 xl:pl-10 xl:pt-2.5">
          {/* Detalles del evento */}
          <div className="inline-flex flex-row justify-start items-center text-center gap-4">
            <UserIcon className="flex-shrink-0 size-5" />
            <p className="inline-flex text-start max-w-prose">
              {"Organizado por " + event?.organizer?.companyName}
            </p>
          </div>
          <div className="inline-flex flex-row justify-start items-start xl:items-center text-center gap-4">
            <Bars4Icon className="flex-shrink-0 size-5 items-end"></Bars4Icon>
            <p className="inline-block text-start max-w-prose">
              {event?.accessPolicyDescription}
            </p>
          </div>
          <div className="flex flex-1 flex-row justify-start items-center text-center gap-4">
            <UserGroupIcon className="flex size-5" />
            <p className="inline-block text-start">
              {event &&
                EVENT_INFORMATION_TEXTS.access_policy[event?.accessPolicy]}
            </p>
          </div>

          <div className="flex flex-1 flex-row justify-start items-center text-center gap-4">
            <MapPinIcon className="inline-block size-5" />
            {event?.inPerson ? (
              <span className="flex text-start">{event?.venue?.address}</span>
            ) : (
              <span>Modalidad Virtual</span>
            )}
          </div>
        </div>
        {/* ZONAS */}
        <EventPricesTable />

        {/* Botón de compras */}
        <div className="flex flex-row w-full justify-center xl:justify-end px-5 items-center p-2.5 ">
          <button
            onClick={handleBuyButtonClick}
            className="self-start inline-flex w-full xl:w-auto items-center cursor-pointer justify-center rounded-lg bg-purple-600 text-white px-4 py-1.5 hover:scale-105 hover:bg-yellow-500 transition-all duration-200 shadow-2xl"
          >
            Comprar entradas
          </button>
        </div>
      </div>
    </div>
  );
}
