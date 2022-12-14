USE [BMVB]
GO
/****** Object:  StoredProcedure [dbo].[sp_BieumauVanbanPhanTrang]    Script Date: 5/13/2021 4:58:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Alter PROCEDURE [dbo].[sp_BieumauVanbanPhanTrang]
@orgUniqueCode nvarchar(40),
@keyword nvarchar(50),
@templateGroupID uniqueidentifier,
@fieldID uniqueidentifier,
@fromDate Datetime,
@toDate Datetime,
@PageIndex int,
@PageSize int


as
begin
DECLARE @StarIndex INT = (@PageIndex-1)*@PageSize
declare @Tongso int =( select COUNT(DISTINCT hueportal_tpl_Templates.ID) from hueportal_tpl_Templates where hueportal_tpl_Templates.OwnerCode =@orgUniqueCode)
SELECT ( convert(varchar(40),[dbo].[hueportal_tpl_Templates].[ID])),
       [hueportal_tpl_TemplateTypes].[Name] as 'LoaiBieumau',
	   hueportal_tpl_Templates.AbstractText as'Trichyeu', 
       [dbo].[hueportal_tpl_Templates].TemplateOfOrg as 'ThamquyenBH',
	   --CONCAT(hueportal_tpl_JobTitles.Name,' ',TCHC.dbo.hueportal_Department.DepartmentName)as 'ThamquyenBH',
	   --[hueportal_tpl_TemplateFiles].FileDataID as 'FileID'
	   (SELECT 
				convert(varchar(40),[hueportal_tpl_TemplateFiles].FileDataID)+'|'
	 FROM hueportal_tpl_TemplateFiles 
	 WHERE [hueportal_tpl_TemplateFiles].TemplateID = hueportal_tpl_Templates.ID
	 FOR XML PATH ('')) as 'FileID'

	   ,@Tongso as 'Tongso'

from( [hueportal_tpl_Templates] 
		JOIN [hueportal_tpl_TemplateTypes] on hueportal_tpl_Templates.TemplateTypeID =[hueportal_tpl_TemplateTypes].ID)
		--JOIN [hueportal_tpl_TemplateFiles] on hueportal_tpl_Templates.ID =[hueportal_tpl_TemplateFiles].TemplateID
		--left JOIN hueportal_tpl_JobTitles on hueportal_tpl_Templates.OwnerCode = hueportal_tpl_JobTitles.OwnerCode
		--left JOIN TCHC.dbo.hueportal_Department On hueportal_tpl_Templates.OwnerCode = hueportal_Department.OwnerCode

WHERE (@orgUniqueCode IS NULL OR hueportal_tpl_Templates.TemplateOfOrg = @orgUniqueCode)
AND (@keyword IS NULL OR hueportal_tpl_Templates.Code = @keyword)
AND (@templateGroupID IS NULL OR hueportal_tpl_Templates.TemplateGroupID= @templateGroupID)
AND (@fieldID IS NULL OR hueportal_tpl_Templates.FieldID = @fieldID)
AND (@fromDate IS NULL OR hueportal_tpl_Templates.CreatedOnDate>= @fromDate)
AND (@toDate IS NULL OR hueportal_tpl_Templates.CreatedOnDate<= @toDate)
Order by hueportal_tpl_Templates.ID
OFFSET @StarIndex ROWS
FETCH NEXT @PageSize ROWS ONLY;
-- exec sp_BieumauVanbanPhanTrang '00.59.H57',null,null,null,null,null,1,100
end

GO
/****** Object:  StoredProcedure [dbo].[sp_GetBieumauVanbanByID]    Script Date: 5/13/2021 4:58:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Alter PROCEDURE [dbo].[sp_GetBieumauVanbanByID] 
	@Id varchar(40)
AS
BEGIN

SELECT  convert(varchar(40),hueportal_tpl_Templates.ID),
		hueportal_tpl_Templates.Code as 'MaBieumau',
		hueportal_tpl_Templates.AbstractText as 'Trichyeu',
		[hueportal_tpl_TemplateTypes].[Name]as'LoaiBieumau',
		hueportal_tpl_TemplateFields.[Name] as 'Linhvuc',
		 (SELECT 
				convert(varchar(40),[hueportal_tpl_TemplateFiles].FileDataID)+'|'
	 FROM hueportal_tpl_TemplateFiles 
	 WHERE [hueportal_tpl_TemplateFiles].TemplateID = hueportal_tpl_Templates.ID
	 FOR XML PATH ('')) as 'FileDataId',
		--[hueportal_tpl_TemplateFiles].FileDataID as 'FileDataId',
		ApprovalEmployee.FullName as 'NguoipheduyetvaBanhanh',
		VerificationEmployee.FullName as 'NguoithamdinhvaPheduyet',
		CreatedEmployee.FullName as 'Nguoisoanthao'
	FROM hueportal_tpl_Templates 
		 left JOIN [hueportal_tpl_TemplateTypes] ON hueportal_tpl_Templates.TemplateTypeID = hueportal_tpl_TemplateTypes.ID
		left JOIN hueportal_tpl_TemplateFields ON hueportal_tpl_Templates.FieldID = hueportal_tpl_TemplateFields.ID
		--left JOIN hueportal_tpl_TemplateFiles ON hueportal_tpl_Templates.ID = hueportal_tpl_TemplateFiles.TemplateID
		left JOIN TCHC.dbo.hueportal_Employee as ApprovalEmployee ON hueportal_tpl_Templates.ApprovalUserID = ApprovalEmployee.UserId
		left JOIN TCHC.dbo.hueportal_Employee as VerificationEmployee ON hueportal_tpl_Templates.VerificationUserID = VerificationEmployee.UserId
		left JOIN TCHC.dbo.hueportal_Employee as CreatedEmployee ON hueportal_tpl_Templates.CreatedByUserId = CreatedEmployee.UserId
		
		--or hueportal_tpl_Templates.VerificationUserID = hueportal_Employee.UserId
		--or hueportal_tpl_Templates.CreatedByUserId = hueportal_Employee.UserId
	WHERE-- hueportal_tpl_Templates.ID = @Id 
	--tpl_Templates.ID =  @Id --DF47C9DB-9EF9-E711-80C1-801844E34909

	hueportal_tpl_Templates.ID =convert(uniqueidentifier, @Id) 
		


END
--exec sp_GetBieumauVanbanByID '3F0FF08D-D586-E711-AA26-C81F66F8AF70'
GO
