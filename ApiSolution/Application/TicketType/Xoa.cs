using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Persistence;
using FluentValidation;
using Application.Core;
using Domain.RequestEntity;

namespace Application.TicketType
{
    public class Xoa
    {
        public class Command : IRequest<Result<int>>
        {
            public int id { get; set; }
            public string username { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                throw new NotImplementedException();
            }
        }
    }
}
