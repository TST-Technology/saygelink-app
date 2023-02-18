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
import { Alert, Input, InputGroup, InputGroupText } from "reactstrap";
import SearchIcon from "@mui/icons-material/Search";

const AllEventList = () => {
  const [eventDetail, setEventDetail] = useState({});
  const [participantsData, setParticipantsData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const { groupId } = useParams();
  const api = useHttp();
  const nav = useNavigate();
  const [search, setSearch] = useState(null);
  let Total_Page;
  const handleGroupDetailResponse = (resp) => {
    if (resp && resp?.groupInfo) {
      console.log(resp);
      setEventDetail(resp?.groupInfo);
      setParticipantsData((privies) => [
        ...privies,
        ...resp?.groupInfo?.participantsInfo,
      ]);
      Total_Page = resp?.groupInfo?.participants.length;
      console.log(pageNo * 10, Total_Page);
      if ((pageNo + 1) * 10 < Total_Page) {
        setPageNo((previous) => previous + 1);
      }
    }
  };
  let payload;
  useEffect(() => {
    payload = {
      id: groupId,
      offset: pageNo * 10,
      numParticipants: 10,
    };
    api.sendRequest(
      CONSTANT.API.getGroupDetailsPost,
      handleGroupDetailResponse,
      payload
    );
  }, [pageNo]);

  const redirectToMember = (memberId) => {
    if (memberId) {
      nav(ROUTES.MEMBER.replace(":memberId", memberId));
    }
  };

  let filterData = [];
  filterData = participantsData
    ? participantsData.flat().filter((data) => {
        if (search != null && search.length > 0) {
          return data?.name.toLowerCase().includes(search.toLowerCase());
        } else {
          return data;
        }
      })
    : [];

  return (
    <>
      <Header />
      <EventAllContainer>
        <div className="row">
          <div className="col-4 d-block">
            <InputGroup>
              <InputGroupText>
                <SearchIcon />
              </InputGroupText>
              <Input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </div>
        <div className="row">
          {filterData.map((conn) => {
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
        {filterData.length === 0 && !api.isLoading && (
          <Alert color="danger text-center mt-5">Data Not Found!</Alert>
        )}
      </EventAllContainer>
      {api.isLoading && (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      )}
    </>
  );
};

export default AllEventList;
