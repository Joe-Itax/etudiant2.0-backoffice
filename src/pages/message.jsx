import { useContext, useEffect, useState } from "react";
import messageContext from "../components/contexts/message.context";
import { getAllMessages } from "../components/get-datas/get-data";
import MessageCard from "../components/message-card/message-card";
import axiosInstance from "../utils/axios-instance";
import CustomizedSnackbars from "../components/feedback/notif";
import { Button } from "@mui/material";
import { Replay } from "@mui/icons-material";

export default function Message() {
  const { message, setMessage } = useContext(messageContext);
  const [numMessage, setNumMessage] = useState(0);
  useEffect(() => {
    if (!message.length > 0) {
      getAllMessages().then((res) => {
        setMessage(res.allMessages);
        setNumMessage(res.allMessages.length);
      });
    }
  }, [message]);

  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const deleteMessage = async (idMessage) => {
    try {
      const res = await axiosInstance.delete(
        `/api/admin/messages/${idMessage}`
      );
      console.log(res);
      setMessage(res.data.allMessages);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
    } catch (error) {
      console.log("error lors de la suppression du message: ", error);
      if (error?.response?.data?.allMessages) {
        setMessage(error.response.data.allMessages);
      }
      if (error?.response) {
        setMessageNotif(error.response.data.message);
      } else if (error?.message) {
        setMessageNotif(error?.message);
      } else {
        setMessageNotif(
          "Une erreur s'est produite. Veuillez reessayer plutard."
        );
      }
      setSeverityNotif("error");
    } finally {
      handleSubmitOpenNotif();
    }
  };

  const [updateDataLoading, setUpdateDataLoading] = useState(false);

  const handleClickUpdateData = async () => {
    setUpdateDataLoading(true);
    try {
      const resourcesUpdated = await getAllMessages();

      setMessage(resourcesUpdated.allMessages);
      setNumMessage(resourcesUpdated.allMessages.length);
      setMessage(resourcesUpdated.allMessages);
      setMessageNotif(resourcesUpdated.message);
      setSeverityNotif("success");
    } catch (error) {
      console.log("error: ", error);
      if (error?.response?.data?.allMessages) {
        setMessage(error.response.data.allMessages);
      }
      if (error?.response) {
        setMessageNotif(error.response.data.message);
      } else if (error?.message) {
        setMessageNotif(error?.message);
      } else {
        setMessageNotif(
          "Une erreur s'est produite. Veuillez reessayer plutard."
        );
      }
      setSeverityNotif("error");
    } finally {
      setUpdateDataLoading(false);
      handleSubmitOpenNotif();
    }
  };

  return (
    <div className="w-full flex flex-col flex-wrap justify-center items-center gap-5">
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      <div className="flex flex-wrap justify-center items-center gap-4 text-white">
        <div className="flex justify-center items-center gap-12 bg-blue-800 p-4 rounded-md">
          <div className="flex flex-col justify-center  gap-5">
            <div>
              <span className="font-extrabold text-4xl">{numMessage}</span>
            </div>
            <div>
              <span>Messages</span>
            </div>
          </div>
          <Button
            className="flex self-end"
            variant="contained"
            onClick={handleClickUpdateData}
            color="primary"
            startIcon={
              <Replay className={updateDataLoading ? "rotate-icon" : ""} />
            }
          >
            Actualiser
          </Button>
        </div>
      </div>
      {message.length > 0 ? (
        <div className="w-full flex flex-wrap justify-center gap-5">
          {message
            .map((message) => (
              <div key={message.id}>
                {" "}
                <MessageCard
                  message={message}
                  deleteMessage={() => deleteMessage(message.id)}
                />
              </div>
            ))
            .reverse()}
        </div>
      ) : (
        <p className="text-center">Aucun message</p>
      )}
    </div>
  );
}
