import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/general/header";
import ImageRole from "../../components/general/image-role";
import useHttp from "../../hooks/use-http";
import { EventAllContainer } from "../../style-component/network/event-all";
import { StyleConnectButton } from "../../style-component/network/network";
import CONSTANT, { DashboardHeaderHeight, ROUTES } from "../../utils/constants";
import Loader from "../../components/general/loader";

const AllEventList = () => {
  const [eventDetail, setEventDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { groupId } = useParams();
  const api = useHttp();
  const nav = useNavigate();
  const [search, setSearch] = useState(null);

  const handleGroupDetailResponse = (resp) => {
    if (resp && resp?.groupInfo) {
      setEventDetail(resp.groupInfo);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const url = {
      ...CONSTANT.API.getGroupDetails,
      endpoint: CONSTANT.API.getGroupDetails.endpoint.replace(
        ":groupId",
        groupId
      ),
    };
    api.sendRequest(url, handleGroupDetailResponse);
    setIsLoading(false);
  }, []);

  const redirectToMember = (memberId) => {
    if (memberId) {
      nav(ROUTES.MEMBER.replace(":memberId", memberId));
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      ) : (
        <EventAllContainer>
          <div className="row">
            <div className="col-4 d-block">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search"
                onChange={(e) => {
                  console.log(e.target.value);
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            {eventDetail?.participantsInfo
              .filter((data) =>
                search != null && search.length > 0
                  ? data?.name.toLowerCase().includes(search.toLowerCase())
                  : data
              )
              .map((conn) => {
                return (
                  <div className="connectionCard col-12 col-sm-6 col-md-4 p-3">
                    <div className="connectionHeader d-flex justify-content-between bg-white p-3">
                      <div className="connectionLeft d-flex">
                        <ImageRole
                          src={conn?.profile_image}
                          role={conn?.qualification}
                          className="connectionImage"
                          height="50px"
                          width="50px"
                          radius="25px"
                        />

                        <div className="nameContainer ps-3">
                          <h5>{conn?.name}</h5>
                          <span>{conn?.qualification}</span>
                        </div>
                      </div>

                      <div>
                        <StyleConnectButton
                          onClick={() => {
                            redirectToMember(conn?.id);
                          }}
                        >
                          Connect
                        </StyleConnectButton>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </EventAllContainer>
      )}
    </>
  );
};

export default AllEventList;
